import React from "react";
import Link from "next/link";
import { getOfferProducts } from "@/lib/db";
import { routes } from "@/routes";
import { ShoppingCart } from "lucide-react";

export default function OffersPage() {
  const offers = getOfferProducts();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Banner Ofertas */}
      <div className="bg-blood text-white py-16 px-4 text-center mb-12">
        <h1 className="font-epilogue font-bold text-4xl md:text-6xl uppercase tracking-tighter mb-4">
          Ofertas Exclusivas
        </h1>
        <p className="font-manrope text-white/80 max-w-2xl mx-auto">
          Aprovechá descuentos por tiempo limitado en bicicletas y equipamiento
          seleccionado.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto px-4">
        {offers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {offers.map((product) => (
              <Link
                key={product.id}
                href={routes.product.details(product.slug)}
                className="group flex flex-col"
              >
                {/* Imagen con Badge de Descuento */}
                <div className="relative aspect-4/3 bg-surface rounded-sm overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.discountPrice && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white font-bold text-xs px-2 py-1 rounded-sm shadow-sm">
                      -
                      {product.discountPrice
                        ? Math.round(
                            ((product.price - product.discountPrice) /
                              product.price) *
                              100
                          )
                        : 0}
                      %
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 block">
                    {product.brand}
                  </span>
                  <h3 className="font-epilogue font-bold text-lg leading-tight mb-2 group-hover:text-blood transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2">
                    {/* Precio con Descuento (EL QUE PAGA EL CLIENTE) */}
                    <span className="font-manrope font-bold text-blood text-xl">
                      ${product.discountPrice?.toLocaleString("es-AR")}
                    </span>

                    {/* Precio Original (TACHADO) */}
                    <span className="text-sm text-gray-400 line-through decoration-gray-400">
                      ${product.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-epilogue font-bold text-gray-400">
              No hay ofertas disponibles en este momento.
            </p>
            <Link
              href={routes.catalog.root}
              className="text-blood hover:underline mt-4 block"
            >
              Ver todo el catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
