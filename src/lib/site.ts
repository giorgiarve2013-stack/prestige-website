/**
 * ცენტრალიზებული საკონტაქტო მონაცემები.
 * ყველა მნიშვნელობა მოდის .env.local-იდან. ცარიელი = საიტი აჩვენებს „შესავსებია“.
 * (NEXT_PUBLIC_* ცვლადები უნდა იყოს პირდაპირ მითითებული, რომ Next.js-მა ჩაანაცვლოს build-ისას.)
 */
export const site = {
  name: "PRESTIGE",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
  hours: process.env.NEXT_PUBLIC_WORKING_HOURS || "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, ""),
  mapEmbedUrl: process.env.NEXT_PUBLIC_MAP_EMBED_URL || "",
  /** თქვენი კომპანიის Google Maps ჩანაწერის ბმული (Share -> Copy link) */
  mapUrl: process.env.NEXT_PUBLIC_MAP_URL || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
