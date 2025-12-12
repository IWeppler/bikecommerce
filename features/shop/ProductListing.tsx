"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  ChevronDown,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { routes } from "@/routes";
import { Product } from "@/lib/db";

// --- Definición de Filtros por Subcategoría ---
const SUB_CATEGORY_FILTERS: {
  [key: string]: { label: string; links: string[] };
} = {
  mtb: {
    label: "Tipo de MTB",
    links: ["Cross Country", "Trail", "Descenso", "E-MTB", "Fat Bikes"],
  },
  ruta: {
    label: "Tipo de Ruta",
    links: ["Racing", "Performance", "Endurance", "Ciclocross"],
  },
  // Añadir más si tienes otras subcategorías
  // accesorios: { label: 'Material', links: ["Aluminio", "Carbono", "Plástico"] }
};

interface ProductListingPageProps {
  category: string;
  subcategory: string;
  initialProducts: Product[];
}

export default function ProductListingPage({
  category,
  subcategory,
  initialProducts,
}: ProductListingPageProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<
    "price-asc" | "price-desc" | "newest"
  >("newest");

  const currentCategoryFilters = SUB_CATEGORY_FILTERS[subcategory] || null;

  const categoryProducts = initialProducts;

  const availableBrands = useMemo(() => {
    return Array.from(new Set(categoryProducts.map((p) => p.brand)));
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedStyles.length > 0) {
      const normalizedStyles = selectedStyles.map((s) =>
        s.toLowerCase().replace(/\s+/g, "-")
      );

      result = result.filter((p) => {
        return p.style ? normalizedStyles.includes(p.style) : false;
      });
    }

    // Ordenamiento
    if (sortOrder === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [categoryProducts, selectedBrands, sortOrder]);

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="w-full min-h-screen bg-background pb-20">
      {/* Header Simple con Breadcrumb */}
      <div className="bg-surface py-8 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-2">
            <Link href={routes.catalog.root} className="hover:text-blood">
              Catálogo
            </Link>
            <span>/</span>
            <Link
              href={routes.catalog.category(category)}
              className="hover:text-blood capitalize"
            >
              {category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-bold capitalize">
              {subcategory}
            </span>
          </div>
          <h1 className="font-epilogue font-bold text-3xl md:text-4xl text-foreground uppercase tracking-tight">
            {subcategory === "mtb"
              ? "Mountain Bikes"
              : subcategory.replace("-", " ")}
            <span className="text-lg text-gray-400 font-manrope font-normal ml-3 lowercase">
              {filteredProducts.length} productos
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* SIDEBAR FILTROS (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1 space-y-8">
          {/* Bloque de Sub-Filtros (Estilos) - NUEVO BLOQUE */}
          {currentCategoryFilters && (
            <div>
              <h3 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-4 flex justify-between items-center">
                {currentCategoryFilters.label}{" "}
                <ChevronDown className="w-4 h-4" />
              </h3>
              <div className="space-y-2">
                {currentCategoryFilters.links.map((style) => (
                  <label
                    key={style}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                        selectedStyles.includes(style)
                          ? "bg-blood border-blood"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {selectedStyles.includes(style) && (
                        <div className="w-2 h-2 bg-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedStyles.includes(style)}
                      onChange={() => toggleStyle(style)}
                    />
                    <span className="text-sm text-gray-600 group-hover:text-foreground transition-colors">
                      {style}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Bloque Marcas  */}
          <div
            className={
              currentCategoryFilters ? "pt-6 border-t border-gray-100" : ""
            }
          >
            <h3 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-4 flex justify-between items-center">
              Marcas <ChevronDown className="w-4 h-4" />
            </h3>
            <div className="space-y-2">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      selectedBrands.includes(brand)
                        ? "bg-blood border-blood"
                        : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {selectedBrands.includes(brand) && (
                      <div className="w-2 h-2 bg-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-foreground transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-4 flex justify-between items-center">
              Precio <ChevronDown className="w-4 h-4" />
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <input
                type="number"
                placeholder="Min"
                className="w-full bg-surface border border-transparent focus:border-blood px-3 py-2 rounded-sm outline-hidden"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full bg-surface border border-transparent focus:border-blood px-3 py-2 rounded-sm outline-hidden"
              />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3">
          {/* Toolbar Mobile & Sort */}
          <div className="flex justify-between items-center mb-6">
            <button className="lg:hidden flex items-center gap-2 text-sm font-bold uppercase tracking-wider border border-gray-200 px-4 py-2 rounded-sm">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>

            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-gray-500 uppercase tracking-widest hidden sm:block">
                Ordenar por:
              </span>
              <select
                className="bg-transparent text-sm font-medium focus:outline-hidden cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="newest">Más Nuevos</option>
                <option value="price-asc">Menor Precio</option>
                <option value="price-desc">Mayor Precio</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  href={routes.product.details(product.id)}
                  key={product.id}
                  className="group flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 bg-surface rounded-sm overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        Sin Stock
                      </div>
                    )}
                    {/* Quick Actions (Hover) */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="p-2 bg-white text-blood rounded-full shadow-lg hover:bg-blood hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 block">
                      {product.brand}
                    </span>
                    <h3 className="font-epilogue font-bold text-lg leading-tight mb-2 group-hover:text-blood transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-manrope font-bold text-gray-900">
                        ${product.price.toLocaleString("es-AR")}
                      </span>
                      {/* Botón fantasma solo visual */}
                      <span className="text-xs font-bold uppercase tracking-wider text-blood opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        Ver Detalle
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-surface rounded-sm">
              <p className="text-gray-500 mb-4">
                No encontramos productos con esos filtros.
              </p>
              <button
                onClick={() => setSelectedBrands([])}
                className="text-blood font-bold uppercase text-xs hover:underline"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
