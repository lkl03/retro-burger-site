// Marca de la mascota FINO: la señora de rulos con anteojos redondos,
// simplificada a trazo continuo para usar como sello en la web.
// Hereda color via currentColor.
export function Mascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* rulos */}
      <circle cx="38" cy="30" r="13" />
      <circle cx="62" cy="20" r="14" />
      <circle cx="86" cy="30" r="12" />
      <circle cx="24" cy="52" r="11" />
      <circle cx="98" cy="54" r="10" />
      <circle cx="30" cy="76" r="10" />
      <circle cx="94" cy="78" r="9" />
      {/* cara */}
      <path d="M38 46 Q60 34 84 46 Q92 66 84 86 Q60 100 40 88 Q32 66 38 46 Z" fill="var(--mascot-face, #f3ead8)" />
      {/* rasgos siempre en vino para contrastar con la cara crema */}
      <g fill="var(--color-vino, #641423)" stroke="var(--color-vino, #641423)">
        {/* anteojos redondos */}
        <circle cx="50" cy="60" r="10" stroke="none" />
        <circle cx="74" cy="60" r="10" stroke="none" />
        <path d="M60 60 h4" fill="none" />
        {/* sonrisa canchera */}
        <path d="M56 82 Q66 88 76 80" fill="none" />
        {/* aro */}
        <circle cx="90" cy="86" r="3" stroke="none" />
      </g>
    </svg>
  );
}
