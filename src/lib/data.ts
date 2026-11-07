export const PRODUCT_IDS = [
  "metaloplastic",
  "aluminium",
  "sliding",
  "screens",
  "glass",
  "blinds",
] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

/** ფოტოები: ჩააგდეთ ფაილები public/images/products/ საქაღალდეში ამავე სახელებით. */
export const productImages: Record<ProductId, string> = {
  metaloplastic: "/images/products/metaloplastic.jpg",
  aluminium: "/images/products/aluminium.jpg",
  sliding: "/images/products/sliding.jpg",
  screens: "/images/products/screens.jpg",
  glass: "/images/products/glass.jpg",
  blinds: "/images/products/blinds.jpg",
};

export const CATEGORY_IDS = ["windows", "aluminium", "sliding", "glass", "balcony", "other"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface PortfolioItem {
  id: number;
  category: CategoryId;
  image: string;
  /** ვიზუალური პროპორცია masonry-სთვის */
  ratio: "tall" | "wide" | "square";
}

/**
 * პორტფოლიოს ელემენტები. რეალური პროექტების ფოტოები ჩააგდეთ public/images/portfolio/
 * საქაღალდეში (01.jpg … 09.jpg) და საჭიროების შემთხვევაში შეცვალეთ კატეგორია აქ.
 */
export const portfolio: PortfolioItem[] = [
  { id: 1, category: "windows", image: "/images/portfolio/01.jpg", ratio: "tall" },
  { id: 2, category: "aluminium", image: "/images/portfolio/02.jpg", ratio: "wide" },
  { id: 3, category: "sliding", image: "/images/portfolio/03.jpg", ratio: "square" },
  { id: 4, category: "balcony", image: "/images/portfolio/04.jpg", ratio: "tall" },
  { id: 5, category: "glass", image: "/images/portfolio/05.jpg", ratio: "square" },
  { id: 6, category: "windows", image: "/images/portfolio/06.jpg", ratio: "wide" },
  { id: 7, category: "aluminium", image: "/images/portfolio/07.jpg", ratio: "tall" },
  { id: 8, category: "balcony", image: "/images/portfolio/08.jpg", ratio: "wide" },
  { id: 9, category: "other", image: "/images/portfolio/09.jpg", ratio: "square" },
];

export const HERO_IMAGE = "/images/hero.jpg";
