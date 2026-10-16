import { perks } from "@/data/site";

const words = perks;

export function Marquee() {
  return (
    <div className="overflow-hidden border-y-2 border-vino bg-vino py-3 text-crema" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {words.map((w) => (
              <span key={`${copy}-${w}`} className="display mx-6 whitespace-nowrap text-xl">
                {w} <span className="mx-4 opacity-50">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
