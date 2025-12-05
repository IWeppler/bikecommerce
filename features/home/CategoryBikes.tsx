"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: "ruta-cat",
    category: "bicicletas",
    subcategory: "ruta",
    title: "Bicis de Ruta",
    image: "/categories/race.webp", 
  },
  {
    id: "urbana-cat",
    category: "bicicletas",
    subcategory: "urbana",
    title: "Urbanas",
    image: "/categories/urban.avif", 
  },
  {
    id: "mtb-cat",
    category: "bicicletas",
    subcategory: "mtb",
    title: "Montaña (MTB)",
    image: "/categories/mountainbike2.jpg", 
  },
  {
    id: "gravel-cat",
    category: "bicicletas",
    subcategory: "gravel",
    title: "Gravel",
    image: "/categories/grava.avif", 
  },
  {
    id: "ebike-cat",
    category: "bicicletas",
    subcategory: "e-bike",
    title: "E-Bikes",
    image: "/categories/ebikes.avif", 
  },
  {
    id: "kids-cat",
    category: "bicicletas",
    subcategory: "kids",
    title: "Niños",
    image: "/kids/portada.webp",
  },
  {
    id: "componentes-cat",
    category: "equipamiento",
    subcategory: "equipamiento",
    title: "equipamiento",
    image:
      "/categories/components.jpg",
  },
  {
    id: "ropa-cat",
    category: "indumentaria",
    subcategory: "indumentaria",
    title: "Indumentaria",
    image: "/clothes/portada.webp",
  },
];

export default function CategoryBikes() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-background border-b border-surface py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header con controles */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="text-blood font-bold uppercase tracking-widest text-xs mb-2 block">
              Explorá el Catálogo
            </span>
            <h2 className="font-epilogue font-bold text-3xl md:text-5xl text-foreground tracking-tighter uppercase">
              Categorías <br className="md:hidden" /> Principales
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 border border-assets hover:bg-foreground transition-all group cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-background transition-colors" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 border border-assets hover:bg-foreground transition-all group cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-foreground group-hover:text-background transition-colors" />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((cat, idx) => (
            <Link
              key={idx}
              href={`/categoria/${cat.subcategory}`}
              className="flex-none w-[280px] md:w-[320px] snap-start group"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-surface mb-4 rounded-sm">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Badge flotante si es bicicleta */}
                {cat.category === "bicicletas" && (
                  <div className="absolute top-4 left-4 bg-surface backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Bicicletas
                  </div>
                )}
              </div>

              {/* Info debajo */}
              <div className="flex items-center justify-between pr-2 border-b border-transparent group-hover:border-assets pb-2 transition-colors">
                <h3 className="font-epilogue font-bold text-xl md:text-2xl text-foreground uppercase tracking-tight">
                  {cat.title}
                </h3>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                Ver colección
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
