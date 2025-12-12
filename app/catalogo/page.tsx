import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/routes";

export const metadata = {
  title: "Catálogo Completo | Apex Bikes",
  description: "Explorá todas nuestras categorías de ciclismo.",
};

export default function CatalogoIndexPage() {
  return (
    <div className="w-full min-h-screen bg-background py-20">
      <div className="max-w-[1440px] mx-auto px-4">
        
        <h1 className="font-epilogue font-bold text-5xl mb-12 uppercase italic tracking-tighter">
          Nuestro <span className="text-blood">Catálogo</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Gigante Bicicletas */}
          <Link href={routes.catalog.category("bicicletas")} className="group relative h-[400px] overflow-hidden rounded-sm block">
            <img 
              src="https://images.unsplash.com/photo-1534150536767-17cb244c4f94?q=80&w=2070&auto=format&fit=crop" 
              alt="Bicicletas"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="font-epilogue text-4xl font-bold uppercase mb-2 flex items-center gap-4">
                Bicicletas <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </h2>
              <p className="text-gray-200 font-manrope">Ruta, Montaña, Urbanas y más.</p>
            </div>
          </Link>

          {/* Card Gigante Equipamiento */}
          <Link href={routes.catalog.category("equipamiento")} className="group relative h-[400px] overflow-hidden rounded-sm block">
            <img 
              src="https://images.unsplash.com/photo-1559056961-1f4dbbf9d36a?q=80&w=1000&auto=format&fit=crop" 
              alt="Equipamiento"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="font-epilogue text-4xl font-bold uppercase mb-2 flex items-center gap-4">
                Equipamiento <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </h2>
              <p className="text-gray-200 font-manrope">Cascos, Indumentaria y Accesorios.</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}