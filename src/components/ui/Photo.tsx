"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ფოტო მოულოდნელი ფაილის გარეშე: თუ სურათი public/images-ში ჯერ არ არის,
 * ნაჩვენებია ელეგანტური არქიტექტურული placeholder (და არა გატეხილი ხატულა).
 */
export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  label,
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  // თუ შეცდომა ჰიდრატაციამდე მოხდა, onError ვეღარ დაიჭერს — ვამოწმებთ ხელით
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`frame-pattern flex items-end justify-start ${className}`}
      >
        {label && (
          <span className="m-4 text-[10px] font-medium uppercase tracking-[0.2em] text-silver-500">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
