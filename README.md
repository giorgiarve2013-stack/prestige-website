# PRESTIGE — ვებსაიტი (Next.js 14 + TypeScript + Tailwind)

## გაშვება
```bash
npm install
cp .env.example .env.local   # შეავსეთ რეალური მონაცემები
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## რას ავსებთ
- `.env.local` — ტელეფონი, ელფოსტა, მისამართი, WhatsApp, რუკა, სოც. ქსელები. ცარიელი ველი საიტზე ჩანს როგორც „შესავსებია“.
- **რუკა:** `NEXT_PUBLIC_MAP_EMBED_URL` (Google Maps → თქვენი კომპანიის ჩანაწერი → Share → Embed a map → iframe-ის `src`) და `NEXT_PUBLIC_MAP_URL` (Share → Copy link) ღილაკისთვის „რუკაზე ნახვა“.
- `CONTACT_WEBHOOK_URL` — სად გაიგზავნოს ფორმები (Zapier/Make/Formspree). ცარიელზე ჩაიწერება სერვერის ლოგში.
- ფოტოები: `public/images/` (იხ. იქ README.txt). ფოტომდე ჩანს placeholder.
- ტექსტები (KA/EN): `src/lib/dictionary.ts`. პროდუქტები/პორტფოლიო: `src/lib/data.ts`.

## სტრუქტურა
`src/app` (გვერდი, API, SEO: sitemap/robots/JSON-LD) · `src/components` (სექციები) · `src/lib` (კონფიგი, ვალიდაცია, ენები)
