import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { dictionaries } from "@/lib/dictionary";
import { site } from "@/lib/site";

const font = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const ka = dictionaries.ka;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: ka.meta.title, template: "%s | PRESTIGE" },
  description: ka.meta.description,
  keywords: [
    "ალუმინის ფანჯრები",
    "მეტალოპლასტმასის ფანჯრები",
    "სლაიდური კარები",
    "მინის კონსტრუქციები",
    "აივნის შემინვა",
    "ჟალუზები",
    "დამცავი ბადეები",
    "პრესტიჟი",
    "PRESTIGE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    alternateLocale: ["en_US"],
    siteName: "PRESTIGE",
    title: ka.meta.title,
    description: ka.meta.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: ka.meta.title, description: ka.meta.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // სტრუქტურირებული მონაცემები — მხოლოდ რეალურად შევსებული ველებით
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "სამშენებლო კომპანია პრესტიჟი",
    alternateName: "PRESTIGE",
    url: site.url,
    description: ka.meta.description,
    areaServed: "GE",
    ...(site.phone && { telephone: site.phone }),
    ...(site.email && { email: site.email }),
    ...(site.address && {
      address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "GE" },
    }),
    ...((site.facebook || site.instagram) && {
      sameAs: [site.facebook, site.instagram].filter(Boolean),
    }),
  };

  return (
    <html lang="ka" className={font.variable}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
