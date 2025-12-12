import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { routes } from "@/routes";

export default function PromoBanner() {
  return (
    <section className="w-full bg-foreground text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:h-[600px]">
        {/* Columna de Imagen (Ordenada última en mobile, primera en desktop) */}
        <div className="relative h-[400px] lg:h-full w-full order-last lg:order-first">
          <img
            src="/categories/ebike.jpg"
            alt="E-Bike Performance"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay linear para integrar la imagen con el fondo negro */}
          <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-foreground via-transparent to-transparent opacity-90 lg:opacity-100" />
        </div>

        {/* Columna de Contenido */}
        <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10">
          <div className="inline-flex items-center gap-2 text-blood font-bold uppercase tracking-widest text-xs mb-6 animate-pulse">
            <Zap className="w-4 h-4" />
            <span>Tecnología E-Bike</span>
          </div>

          <h2 className="font-epilogue font-bold text-4xl md:text-5xl lg:text-6xl italic tracking-tighter leading-[0.9] mb-6">
            MÁS POTENCIA. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-neutral-500">
              MENOS ESFUERZO.
            </span>
          </h2>

          <p className="font-manrope text-paragraph text-lg leading-relaxed mb-8 max-w-md">
            Llegó la nueva serie <strong>Turbo Levo SL</strong>. Un cuadro de
            carbono tan ligero que olvidarás que es eléctrica, hasta que sientas
            el empuje.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={routes.catalog.subcategory("bicicletas", "e-mtb")}
              className="px-8 py-4 bg-blood hover:bg-red-700 text-background font-epilogue font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 group"
            >
              Ver E-Bikes
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>



            <div className="flex items-center justify-center sm:justify-start gap-4 px-4">
              <div className="text-center">
                <span className="block font-bold text-2xl font-epilogue">
                  120<span className="text-xs align-top">km</span>
                </span>
                <span className="text-xs text-paragraph uppercase tracking-widest">
                  Autonomía
                </span>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <span className="block font-bold text-2xl font-epilogue">
                  17.3<span className="text-xs align-top">kg</span>
                </span>
                <span className="text-xs text-paragraph uppercase tracking-widest">
                  Peso Total
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
