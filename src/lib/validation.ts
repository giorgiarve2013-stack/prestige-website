export type FormKind = "contact" | "order";

export interface FormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
  product: string;
  size: string;
  city: string;
  /** honeypot – უნდა დარჩეს ცარიელი */
  website: string;
}

export type ErrorCode = "required" | "tooShort" | "phone" | "email" | "tooLong";
export type Errors = Partial<Record<keyof FormValues, ErrorCode>>;

export const emptyValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
  product: "",
  size: "",
  city: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{7,15}$/;

export const normalizePhone = (p: string) => p.replace(/[\s\-().]/g, "");

export function validate(kind: FormKind, v: FormValues): Errors {
  const e: Errors = {};
  const name = v.name.trim();
  if (!name) e.name = "required";
  else if (name.length < 2) e.name = "tooShort";
  else if (name.length > 80) e.name = "tooLong";

  const phone = normalizePhone(v.phone.trim());
  if (!phone) e.phone = "required";
  else if (!PHONE_RE.test(phone)) e.phone = "phone";

  const email = v.email.trim();
  if (email && !EMAIL_RE.test(email)) e.email = "email";
  else if (email.length > 120) e.email = "tooLong";

  const message = v.message.trim();
  if (kind === "contact") {
    if (!message) e.message = "required";
    else if (message.length < 10) e.message = "tooShort";
  }
  if (message.length > 2000) e.message = "tooLong";

  if (kind === "order" && !v.product.trim()) e.product = "required";
  if (v.size.length > 120) e.size = "tooLong";
  if (v.city.length > 80) e.city = "tooLong";
  return e;
}
