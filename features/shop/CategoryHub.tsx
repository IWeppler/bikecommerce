import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORY_DATA = {
  bicicletas: {
    title: "Bicicletas",
    description:
      "Ingeniería de precisión para cada terreno. Encontrá tu compañera perfecta.",
    items: [
      {
        name: "Montaña (MTB)",
        slug: "mtb",
        image:
          "https://images.unsplash.com/photo-1576435728678-68d01dbd1e29?q=80&w=2070&auto=format&fit=crop",
        count: 42,
      },
      {
        name: "Ruta y Pista",
        slug: "ruta",
        image:
          "https://images.unsplash.com/photo-1534150536767-17cb244c4f94?q=80&w=2070&auto=format&fit=crop",
        count: 28,
      },
      {
        name: "E-Bikes",
        slug: "e-bike",
        image:
          "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=2070&auto=format&fit=crop",
        count: 12,
      },
      {
        name: "Gravel",
        slug: "gravel",
        image:
          "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop",
        count: 8,
      },
      {
        name: "Urbanas",
        slug: "urbana",
        image:
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2070&auto=format&fit=crop",
        count: 15,
      },
      {
        name: "Niños",
        slug: "kids",
        image:
          "https://images.unsplash.com/photo-1595188610118-8c0147980d46?q=80&w=2070&auto=format&fit=crop",
        count: 10,
      },
    ],
  },
  equipamiento: {
    title: "Equipamiento",
    description: "Todo lo necesario para rodar seguro y con estilo.",
    items: [
      {
        name: "Cascos",
        slug: "cascos",
        image:
          "https://images.unsplash.com/photo-1559056961-1f4dbbf9d36a?q=80&w=1000&auto=format&fit=crop",
        count: 35,
      },
      {
        name: "Zapatillas",
        slug: "zapatillas",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
        count: 18,
      },
      {
        name: "Indumentaria",
        slug: "indumentaria",
        image:
          "https://images.unsplash.com/photo-1559056961-1f4dbbf9d36a?q=80&w=1000&auto=format&fit=crop",
        count: 120,
      },
    ],
  },
};

interface CategoryHubProps {
  categorySlug: string;
}

export default function CategoryHub({ categorySlug }: CategoryHubProps) {
  const data = CATEGORY_DATA[categorySlug as keyof typeof CATEGORY_DATA];

  if (!data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Categoría no encontrada</h2>
        <Link href="/catalogo" className="text-swiss-blood hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen pb-20">
      {/* Header de Categoría (Breadcrumb style) */}
      <div className="bg-surface py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-swiss-blood transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/catalogo"
              className="hover:text-swiss-blood transition-colors"
            >
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-foreground font-bold">{data.title}</span>
          </div>

          <h1 className="font-epilogue font-bold text-4xl md:text-6xl text-foreground uppercase tracking-tighter mb-4">
            {data.title}
            <span className="text-xl align-top text-gray-400 ml-2 font-manrope font-normal normal-case">
              ({data.items.reduce((acc, item) => acc + item.count, 0)})
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg font-manrope">
            {data.description}
          </p>
        </div>
      </div>

      {/* Grid de Subcategorías (Specialized Style) */}
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((sub) => (
            <Link
              key={sub.slug}
              href={`/catalogo/${categorySlug}/${sub.slug}`}
              className="group relative flex flex-col bg-white rounded-sm border border-gray-100 hover:border-swiss-blood/30 hover:shadow-xl transition-all duration-300 overflow-hidden aspect-4/3"
            >
              {/* Imagen que llena la tarjeta */}
              <div className="absolute inset-0 z-0 bg-gray-100">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Contenido flotante abajo a la izquierda (Estilo Specialized) */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex justify-between items-end">
                <div>
                  <h3 className="font-epilogue font-bold text-2xl text-white uppercase tracking-tight mb-1 group-hover:translate-x-1 transition-transform">
                    {sub.name}
                  </h3>
                  <p className="text-gray-300 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Explorar {sub.count} productos
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-swiss-blood transition-colors">
                  <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
