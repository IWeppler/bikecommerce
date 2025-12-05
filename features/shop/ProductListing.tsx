"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, Heart, ShoppingCart } from "lucide-react";

// Simulamos una base de datos de productos más completa
const ALL_PRODUCTS = [
  {
    id: "trek-marlin-7",
    name: "Trek Marlin 7 Gen 3",
    brand: "Trek",
    price: 1450000,
    category: "bicicletas",
    subcategory: "mtb",
    image: "https://images.unsplash.com/photo-1576435728678-68d01dbd1e29?q=80&w=2070&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "specialized-rockhopper",
    name: "Specialized Rockhopper Elite",
    brand: "Specialized",
    price: 1850000,
    category: "bicicletas",
    subcategory: "mtb",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2072&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "venzo-loki",
    name: "Venzo Loki Evo",
    brand: "Venzo",
    price: 650000,
    category: "bicicletas",
    subcategory: "mtb",
    image: "/images/venzo-loki.jpg", // Fallback local image
    inStock: true,
  },
  {
    id: "cannondale-trail-5",
    name: "Cannondale Trail 5",
    brand: "Cannondale",
    price: 1200000,
    category: "bicicletas",
    subcategory: "mtb",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop",
    inStock: false,
  },
   {
    id: "specialized-allez",
    name: "Specialized Allez Sport",
    brand: "Specialized",
    price: 2100000,
    category: "bicicletas",
    subcategory: "ruta",
    image: "https://images.unsplash.com/photo-1534150536767-17cb244c4f94?q=80&w=2070&auto=format&fit=crop",
    inStock: true,
  },
];

interface ProductListingPageProps {
  categorySlug: string;
  subcategorySlug: string;
}

export default function ProductListingPage({ categorySlug, subcategorySlug }: ProductListingPageProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc" | "newest">("newest");

  // 1. Filtrar productos por la subcategoría actual (ej: solo mostrar 'mtb')
  const categoryProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => p.subcategory === subcategorySlug);
  }, [subcategorySlug]);

  // 2. Obtener marcas disponibles dinámicamente según los productos filtrados
  const availableBrands = useMemo(() => {
    return Array.from(new Set(categoryProducts.map(p => p.brand)));
  }, [categoryProducts]);

  // 3. Aplicar filtros de usuario (Sidebar) y Ordenamiento
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Filtro Marca
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Ordenamiento
    if (sortOrder === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [categoryProducts, selectedBrands, sortOrder]);

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background pb-20">
      
      {/* Header Simple con Breadcrumb */}
      <div className="bg-surface py-8 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-2">
            <Link href="/catalogo" className="hover:text-swiss-blood">Catálogo</Link>
            <span>/</span>
            <Link href={`/catalogo/${categorySlug}`} className="hover:text-swiss-blood capitalize">{categorySlug}</Link>
            <span>/</span>
            <span className="text-foreground font-bold capitalize">{subcategorySlug}</span>
          </div>
          <h1 className="font-epilogue font-bold text-3xl md:text-4xl text-foreground uppercase tracking-tight">
             {subcategorySlug === 'mtb' ? 'Mountain Bikes' : subcategorySlug.replace("-", " ")}
             <span className="text-lg text-gray-400 font-manrope font-normal ml-3 lowercase">
               {filteredProducts.length} productos
             </span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* SIDEBAR FILTROS (Desktop) */}
        <aside className="hidden lg:block lg:col-span-1 space-y-8">
          
          {/* Bloque Marcas */}
          <div>
            <h3 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-4 flex justify-between items-center">
              Marcas <ChevronDown className="w-4 h-4" />
            </h3>
            <div className="space-y-2">
              {availableBrands.map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-swiss-blood border-swiss-blood' : 'border-gray-300 group-hover:border-gray-400'}`}>
                    {selectedBrands.includes(brand) && <div className="w-2 h-2 bg-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-foreground transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bloque Precio (Mock) */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-4 flex justify-between items-center">
              Precio <ChevronDown className="w-4 h-4" />
            </h3>
            <div className="flex items-center gap-2 text-sm">
                <input type="number" placeholder="Min" className="w-full bg-surface border border-transparent focus:border-swiss-blood px-3 py-2 rounded-sm outline-hidden" />
                <span className="text-gray-400">-</span>
                <input type="number" placeholder="Max" className="w-full bg-surface border border-transparent focus:border-swiss-blood px-3 py-2 rounded-sm outline-hidden" />
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
                 <span className="text-xs text-gray-500 uppercase tracking-widest hidden sm:block">Ordenar por:</span>
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
                 <Link href={`/producto/${product.id}`} key={product.id} className="group flex flex-col h-full">
                    {/* Image Container */}
                    <div className="relative aspect-4/3 bg-surface rounded-sm overflow-hidden mb-4">
                       <img 
                         src={product.image} 
                         alt={product.name} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                       {!product.inStock && (
                         <div className="absolute top-2 right-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                           Sin Stock
                         </div>
                       )}
                       {/* Quick Actions (Hover) */}
                       <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <button className="p-2 bg-white text-swiss-blood rounded-full shadow-lg hover:bg-swiss-blood hover:text-white transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                       </div>
                    </div>

                    {/* Info */}
                    <div>
                       <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 block">
                         {product.brand}
                       </span>
                       <h3 className="font-epilogue font-bold text-lg leading-tight mb-2 group-hover:text-swiss-blood transition-colors">
                         {product.name}
                       </h3>
                       <div className="flex items-center justify-between mt-auto">
                          <span className="font-manrope font-bold text-gray-900">
                            ${product.price.toLocaleString("es-AR")}
                          </span>
                          {/* Botón fantasma solo visual */}
                          <span className="text-xs font-bold uppercase tracking-wider text-swiss-blood opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                             Ver Detalle
                          </span>
                       </div>
                    </div>
                 </Link>
               ))}
             </div>
           ) : (
             <div className="py-20 text-center bg-surface rounded-sm">
                <p className="text-gray-500 mb-4">No encontramos productos con esos filtros.</p>
                <button 
                  onClick={() => setSelectedBrands([])}
                  className="text-swiss-blood font-bold uppercase text-xs hover:underline"
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