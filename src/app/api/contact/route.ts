import { NextResponse } from "next/server";
import {
  emptyValues,
  normalizePhone,
  validate,
  type FormKind,
  type FormValues,
} from "@/lib/validation";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let body: {
    kind?: string;
    lang?: string;
    values?: Partial<FormValues>;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "bad_json" },
      { status: 400 }
    );
  }

  const kind: FormKind =
    body.kind === "order" ? "order" : "contact";

  const values: FormValues = { ...emptyValues };

  for (const k of Object.keys(emptyValues) as (keyof FormValues)[]) {
    const v = body.values?.[k];
    values[k] = typeof v === "string" ? v : "";
  }

  if (values.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const errors = validate(kind, values);

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, errors },
      { status: 422 }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) {
    console.error("[contact] Supabase environment variables are missing");
    return NextResponse.json(
      { ok: false, error: "server_not_configured" },
      { status: 500 }
    );
  }

  const row = {
    kind,
    name: values.name.trim(),
    phone: normalizePhone(values.phone),
    email: values.email.trim() || null,
    product: values.product.trim() || null,
    size: values.size.trim() || null,
    city: values.city.trim() || null,
    message: values.message.trim() || null,
  };

  try {
    const response = await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/orders`,
      {
        method: "POST",
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[contact] Supabase insert failed:", response.status, errorText);
      return NextResponse.json(
        { ok: false, error: "database_error" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Supabase request failed:", error);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 }
    );
  }
}
