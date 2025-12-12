"use client";

const brands = [
  { name: "Specialized", logo: "/brands/specialized.jpg" },
  { name: "Trek", logo: "/brands/trek.jpg" },
  { name: "Shimano", logo: "/brands/shimano.jpg" },
  { name: "Scott", logo: "/brands/scott.webp" },
  { name: "Oakley", logo: "/brands/oakley.jpg" },
  { name: "Cannondale", logo: "/brands/cannondale.jpg" },
  { name: "Canyon", logo: "/brands/canyon.jpg" },
  { name: "Cube", logo: "/brands/cube.jpg" },
  { name: "Cervelo", logo: "/brands/cervelo.jpg" },
  { name: "Rose", logo: "/brands/rose.jpg" },
  { name: "Giant", logo: "/brands/gyant.webp" },
  { name: "SLP", logo: "/brands/slp.webp" },
  { name: "Velodrom", logo: "/brands/velodrom.avif" },
];

export default function BrandMarquee() {
  return (
    <section id="brands" className="w-full bg-surface border-y border-neutral-200 py-8 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 mb-4 text-center">
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
              className="flex items-center justify-center mx-8 md:mx-14 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 md:h-18 w-auto max-w-[120px] object-contain select-none"
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
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
