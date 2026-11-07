const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = (p: { className?: string }) => (
  <svg {...base} className={p.className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUp = (p: { className?: string }) => (
  <svg {...base} className={p.className}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const Chevron = (p: { dir: "left" | "right"; className?: string }) => (
  <svg {...base} className={p.className}>
    <path d={p.dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);
export const Close = (p: { className?: string }) => (
  <svg {...base} className={p.className}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Expand = (p: { className?: string }) => (
  <svg {...base} className={p.className}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
export const Phone = (p: { className?: string }) => (
  <svg {...base} className={p.className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);
export const Mail = (p: { className?: string }) => (
  <svg {...base} className={p.className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Pin = (p: { className?: string }) => (
  <svg {...base} className={p.className}><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Clock = (p: { className?: string }) => (
  <svg {...base} className={p.className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Check = (p: { className?: string }) => (
  <svg {...base} className={p.className}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const WhatsApp = (p: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 00-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 11-4.2 15l-.3-.18-3.1.88.9-3-.2-.32A8.1 8.1 0 0112.04 3.8zM8.6 7.5c-.2 0-.5.07-.75.35-.25.27-.98.96-.98 2.34s1 2.7 1.14 2.9c.14.18 1.96 3.1 4.84 4.22 2.4.94 2.88.75 3.4.7.52-.05 1.68-.69 1.92-1.35.23-.66.23-1.23.16-1.35-.07-.12-.25-.18-.53-.32-.27-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.27-.71.9-.87 1.08-.16.18-.32.2-.6.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.9-.16-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.14-.16.18-.27.27-.46.1-.18.05-.34-.02-.48-.07-.14-.6-1.5-.85-2.05-.2-.5-.42-.5-.6-.5h-.45z" />
  </svg>
);
