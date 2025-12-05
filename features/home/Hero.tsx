import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/ridevideo.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 w-full pt-10">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full mb-6">
            <span className="text-background text-xs font-bold uppercase tracking-widest">
              Multimarca Premium
            </span>
          </div>

          <h1
            className="font-epilogue font-bold text-5xl md:text-7xl lg:text-8xl 
               text-background leading-[1.05] tracking-tight italic 
               overflow-visible mb-6"
          >
            DOMINA <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-background to-neutral-400 inline-block pr-4">
              EL TERRENO
            </span>
          </h1>

          <p className="font-manrope text-gray-200 text-lg md:text-xl max-w-lg mb-8 font-light leading-relaxed">
            El stock más completo de la región. Distribuidores oficiales de{" "}
            <strong className="text-background">
              Specialized, Trek, Venzo y más.
            </strong>{" "}
            Encontrá la bici perfecta para tu estilo de rodar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/categoria/bicicletas"
              className="px-8 py-4 bg-swiss-blood hover:bg-red-700 text-background font-epilogue font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 group"
            >
              Ver Bicicletas
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/marcas"
              className="px-8 py-4 bg-transparent border border-background text-background hover:bg-background hover:text-foreground font-epilogue font-bold uppercase tracking-wider text-sm transition-all text-center"
            >
              Nuestras Marcas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
