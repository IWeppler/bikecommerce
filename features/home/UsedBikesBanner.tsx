import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Recycle,
  Wrench,
} from "lucide-react";

export default function UsedBikesBanner() {
  return (
    <section className="w-full bg-background py-20 border-t border-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-swiss-blood to-transparent opacity-50" />

      <div className="max-w-[1440px] mx-auto px-4 relative z-10">
        {/* Header Centrado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-surface px-4 py-1.5 rounded-full shadow-sm border border-assets">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
              Apex Garage
            </span>
          </div>

          <h2 className="font-epilogue font-bold text-4xl md:text-5xl text-foreground uppercase tracking-tight mb-6">
            No es solo una{" "}
            <span className="text-neutral-400 italic">usada.</span>
            <br />
            Es una <span className="text-blood">verificada.</span>
          </h2>

          <p className="font-manrope text-paragraph text-lg leading-relaxed">
            Olvidate de los riesgos de comprar a particulares. En Apex Garage,
            cada bicicleta pasa por un riguroso proceso de certificación de 3
            puntos antes de salir a la venta.
          </p>
        </div>

        {/* Grid de Valor (Process Points) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Punto 1 */}
          <div className="bg-surface p-8 rounded-sm border border-assets hover:border-blood/80 transition-colors group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-epilogue font-bold text-lg uppercase mb-3">
              Inspección Mecánica
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Nuestros técnicos revisan transmisión, frenos, cuadro y
              suspensión. Si algo no está al 100%, se repara o reemplaza.
            </p>
          </div>

          {/* Punto 2 */}
          <div className="bg-surface p-8 rounded-sm border border-assets hover:border-blood/80 transition-colors group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-epilogue font-bold text-lg uppercase mb-3">
              Papeles al Día
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Garantizamos la procedencia legal. Cada bicicleta se entrega con
              factura de compra y verificación de número de serie.
            </p>
          </div>

          {/* Punto 3 */}
          <div className="bg-surface p-8 rounded-sm border border-assets hover:border-blood/80 transition-colors group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-epilogue font-bold text-lg uppercase mb-3">
              Garantía Real
            </h3>
            <p className="text-sm text-paragr leading-relaxed">
              Te damos 3 meses de garantía mecánica. Comprá con la misma
              confianza que si fuera una 0km.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/usados"
            className="px-8 py-4 bg-foreground hover:bg-blood text-background font-epilogue font-bold uppercase tracking-wider text-sm transition-all rounded-sm shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Ver Stock Disponible
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/vender"
            className="px-8 py-4 bg-background border border-gray-300 hover:border-foreground text-foreground font-epilogue font-bold uppercase tracking-wider text-sm transition-all rounded-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Recycle className="w-4 h-4" />
            Canjeá tu Bici
          </Link>
        </div>
      </div>
    </section>
  );
}
