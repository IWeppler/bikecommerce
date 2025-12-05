'use client';

const brands = [
  { name: "Specialized", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Specialized_Bicycle_Components_Logo.svg" },
  { name: "Trek", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Trek_Bicycle_Corporation_logo.svg" },
  { name: "Shimano", logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Shimano_logo.svg" },
  { name: "SRAM", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/SRAM_logo.svg" },
  { name: "Scott", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Scott_Sports_logo.svg" },
  { name: "Fox", logo: "https://upload.wikimedia.org/wikipedia/commons/6/63/Fox_Racing_Shox_logo.svg" },
  { name: "Oakley", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Oakley_logo.svg" },
  { name: "Cannondale", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Cannondale_bicycle_corporation_logo.svg" },
];

export default function BrandMarquee() {
  return (
    <section className="w-full bg-surface border-y border-neutral-200 py-16 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 mb-10 text-center">
        <p className="font-epilogue font-bold text-xs uppercase tracking-widest text-blood">
          Distribuidores Oficiales
        </p>
      </div>

      {/* Contenedor con degradados laterales para suavizar la entrada/salida */}
      <div className="relative w-full group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee items-center">
          {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex items-center justify-center mx-8 md:mx-14 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 md:h-10 w-auto max-w-[120px] object-contain select-none"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: scroll 70s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}