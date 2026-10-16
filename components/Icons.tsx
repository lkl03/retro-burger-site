type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Icon = {
  Pin: ({ className = "h-5 w-5" }: P) => (
    <svg {...base} className={className}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  Clock: ({ className = "h-5 w-5" }: P) => (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Instagram: ({ className = "h-5 w-5" }: P) => (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  Play: ({ className = "h-4 w-4" }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  ),
  Arrow: ({ className = "h-4 w-4" }: P) => (
    <svg {...base} className={className}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  Wheat: ({ className = "h-5 w-5" }: P) => (
    <svg {...base} className={className}>
      <path d="M12 21V9M12 13c-3 0-4-2-4-4 2 0 4 1 4 4Zm0 0c3 0 4-2 4-4-2 0-4 1-4 4Zm0-4c-2.5 0-3.5-1.7-3.5-3.5C10.3 5.5 12 6.5 12 9Zm0 0c2.5 0 3.5-1.7 3.5-3.5C13.7 5.5 12 6.5 12 9Z" />
    </svg>
  ),
  Google: ({ className = "h-5 w-5" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" opacity=".9" />
      <path fill="currentColor" d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" opacity=".75" />
      <path fill="currentColor" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" opacity=".6" />
      <path fill="currentColor" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6Z" opacity=".45" />
    </svg>
  ),
};
