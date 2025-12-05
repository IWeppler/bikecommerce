import Link from "next/link";
import { ArrowRight, Disc, Layers, Cog, Zap } from "lucide-react";

export default function FeaturedProductSpec() {
  return (
    <section className="w-full bg-[#121313] py-20 lg:py-32 overflow-hidden border-t border-white/10 relative">
      {/* Background Grid sutil para efecto técnico */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1440px] mx-auto px-4 relative z-10">
        
        {/* Header de Sección */}
        <div className="text-center mb-16 lg:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-swiss-blood font-bold uppercase tracking-widest text-xs mb-3 block">
            Ingeniería de Precisión
          </span>
          <h2 className="font-epilogue font-bold text-4xl md:text-5xl text-white italic tracking-tighter uppercase">
            Apex <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-600">X-Caliber 9</span>
          </h2>
        </div>

        {/* Layout Principal: 3 Columnas (Specs Izq - Bici - Specs Der) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          
          {/* Columna Izquierda: Specs 1 y 2 */}
          <div className="lg:col-span-3 space-y-12 order-2 lg:order-1 px-4 lg:px-0">
            {/* Spec Item: Cuadro */}
            <div className="group relative text-left lg:text-right">
              <div className="flex items-center lg:justify-end gap-3 mb-2">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Cuadro</span>
                <Layers className="w-5 h-5 text-swiss-blood" />
              </div>
              <h3 className="text-xl md:text-2xl font-epilogue font-bold text-white mb-2">Alpha Gold Aluminium</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tubo de dirección cónico y guiado interno de cables para una estética limpia y aerodinámica.
              </p>
              {/* Línea conectora (Visible solo desktop) */}
              <div className="hidden lg:block absolute top-1/2 right-[-20%] w-[20%] h-px bg-linear-to-r from-transparent to-swiss-blood/50"></div>
              <div className="hidden lg:block absolute top-1/2 right-[-20%] w-2 h-2 rounded-full bg-swiss-blood shadow-[0_0_10px_rgba(206,12,47,0.5)]"></div>
            </div>

            {/* Spec Item: Suspensión */}
            <div className="group relative text-left lg:text-right">
               <div className="flex items-center lg:justify-end gap-3 mb-2">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Suspensión</span>
                <Zap className="w-5 h-5 text-swiss-blood" />
              </div>
              <h3 className="text-xl md:text-2xl font-epilogue font-bold text-white mb-2">RockShox Judy SL</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Bloqueo TurnKey, muelle Solo Air y 100 mm de recorrido para absorber cualquier impacto.
              </p>
               {/* Línea conectora */}
              <div className="hidden lg:block absolute top-1/2 right-[-40%] w-[40%] h-px bg-linear-to-r from-transparent to-swiss-blood/50 rotate-12 origin-left"></div>
            </div>
          </div>

          {/* Columna Central: IMAGEN DEL PRODUCTO */}
          <div className="lg:col-span-6 relative order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
             {/* Círculo decorativo de fondo */}
             <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-white/5 bg-white/2 animate-pulse"></div>
             <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-white/5 border-dashed spin-slow"></div>

             {/* Imagen Bici (Flotando) */}
             <img 
               src="https://images.unsplash.com/photo-1576435728678-68d01dbd1e29?q=80&w=2070&auto=format&fit=crop" 
               alt="Trek Marlin Featured"
               className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
               style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
             />

             {/* Botón CTA Central (Flotante) */}
             <div className="absolute -bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-20">
                <Link
                  href="/producto/trek-marlin-7"
                  className="flex items-center gap-2 px-8 py-3 bg-white text-foreground hover:bg-swiss-blood hover:text-white font-epilogue font-bold uppercase tracking-wider text-xs transition-all rounded-full shadow-lg"
                >
                  Ver Especificaciones
                  <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </div>

          {/* Columna Derecha: Specs 3 y 4 */}
          <div className="lg:col-span-3 space-y-12 order-3 px-4 lg:px-0">
             {/* Spec Item: Transmisión */}
             <div className="group relative">
              <div className="flex items-center gap-3 mb-2">
                <Cog className="w-5 h-5 text-swiss-blood" />
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Transmisión</span>
              </div>
              <h3 className="text-xl md:text-2xl font-epilogue font-bold text-white mb-2">Shimano Deore 1x12</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                El rango de desarrollos que necesitás para las subidas más empinadas sin el peso extra.
              </p>
              {/* Línea conectora */}
              <div className="hidden lg:block absolute top-1/2 left-[-20%] w-[20%] h-px bg-linear-to-l from-transparent to-swiss-blood/50"></div>
              <div className="hidden lg:block absolute top-1/2 left-[-20%] w-2 h-2 rounded-full bg-swiss-blood shadow-[0_0_10px_rgba(206,12,47,0.5)]"></div>
            </div>

            {/* Spec Item: Frenos */}
            <div className="group relative">
              <div className="flex items-center gap-3 mb-2">
                <Disc className="w-5 h-5 text-swiss-blood" />
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Frenado</span>
              </div>
              <h3 className="text-xl md:text-2xl font-epilogue font-bold text-white mb-2">Discos Hidráulicos</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Potencia de frenado Shimano MT200 fiable en cualquier condición climática.
              </p>
               {/* Línea conectora */}
               <div className="hidden lg:block absolute top-1/2 left-[-40%] w-[40%] h-px bg-linear-to-l from-transparent to-swiss-blood/50 -rotate-12 origin-right"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}