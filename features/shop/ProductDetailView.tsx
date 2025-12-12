"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Check,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { Product } from "@/lib/db";

const SITE_CONFIG = {
  transferDiscount: 0.15,
  installments: 6,
};

export default function ProductDetailView({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // 1. LOGICA DE COLORES
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  // 2. LOGICA DE IMAGENES
  // @ts-ignore
  const productImages = product.images && product.images.length > 0 
    // @ts-ignore
    ? product.images 
    : [product.image];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- CÁLCULOS DE PRECIO CORREGIDOS ---
  
  // A. Detectamos si es oferta
  // @ts-ignore
  const isOffer = product.isOffer && product.discountPrice;
  
  // B. Definimos el precio real que paga el cliente hoy
  // @ts-ignore
  const effectivePrice = isOffer ? product.discountPrice : product.price;

  // C. Calculamos transferencia y cuotas sobre el PRECIO EFECTIVO (no el de lista)
  const transferPrice = effectivePrice * (1 - SITE_CONFIG.transferDiscount);
  const installmentPrice = effectivePrice / SITE_CONFIG.installments;

  // D. Calculamos porcentaje OFF para el badge visual
  const discountPercentage = isOffer 
    // @ts-ignore
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* COLUMNA 1: GALERÍA */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        
        {/* Imagen Principal */}
        <div className="bg-white rounded-sm overflow-hidden aspect-4/3 relative group border border-gray-100">
          <img
            src={productImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge: Prioridad a OFERTA, sino NUEVO */}
          {isOffer ? (
             <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest z-10 shadow-sm">
                -{discountPercentage}% OFF
             </span>
          ) : product.isNew ? (
            <span className="absolute top-4 left-4 bg-foreground text-background text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
              Nuevo Ingreso
            </span>
          ) : null}

          {/* Flechas de navegación */}
          {productImages.length > 1 && (
             <>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => prev === 0 ? productImages.length - 1 : prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => prev === productImages.length - 1 ? 0 : prev + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
             </>
          )}
        </div>

        {/* Miniaturas */}
        {productImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {productImages.map((img: string, i: number) => (
                    <button 
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-20 h-20 shrink-0 border rounded-sm overflow-hidden bg-white cursor-pointer ${
                            currentImageIndex === i 
                            ? 'border-blood ring-1 ring-blood' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        <img 
                            src={img} 
                            alt={`Vista ${i}`} 
                            className="w-full h-full object-contain p-1" 
                        />
                    </button>
                ))}
            </div>
        )}
      </div>

      {/* COLUMNA 2: INFO */}
      <div className="lg:col-span-5 flex flex-col h-fit lg:sticky lg:top-24">
        
        {/* Header Producto */}
        <div className="mb-8 border-b border-gray-100 pb-8">
             <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">{product.brand}</h2>
             <h1 className="font-epilogue font-bold text-3xl md:text-4xl leading-tight text-foreground uppercase mb-6">{product.name}</h1>
             
             {/* --- LOGICA VISUAL DE PRECIOS CORREGIDA --- */}
             <div className="space-y-1">
                
                {isOffer ? (
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 line-through decoration-gray-400">
                            Precio de lista: {formatMoney(product.price)}
                        </span>
                        <div className="flex items-center gap-3">
                            <p className="font-manrope text-3xl font-bold text-blood">
                                {formatMoney(effectivePrice)}
                            </p>
                            <span className="text-xs font-bold textforeground px-2 py-1 rounded-sm">
                                OFERTA
                            </span>
                        </div>
                    </div>
                ) : (
                    // CASO NORMAL
                    <p className="font-manrope text-3xl font-bold text-foreground">
                        {formatMoney(effectivePrice)}
                    </p>
                )}

                <div className="flex flex-col gap-1 pt-3">
                    <p className="text-sm font-medium text-green-700">
                        {formatMoney(transferPrice)} <span className="text-gray-500 font-normal">pagando con transferencia</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        {SITE_CONFIG.installments} cuotas sin interés de {formatMoney(installmentPrice)}
                    </p>
                </div>
            </div>
        </div>

        {/* --- SELECTORES --- */}
        <div className="space-y-6 mb-8">
          
          {/* Selector de Color */}
          {/* @ts-ignore */}
          {product.colors && product.colors.length > 0 ? (
            <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    Color: <span className="text-foreground">{selectedColor?.name || 'Seleccionar'}</span>
                </span>
                <div className="flex gap-3">
                    {/* @ts-ignore */}
                    {product.colors.map((color: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: color.hex }}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all relative cursor-pointer
                                ${selectedColor?.name === color.name 
                                    ? "border-blood ring-1 ring-blood ring-offset-2" 
                                    : "border-gray-200 hover:scale-110" 
                                }`}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
          ) : null}

          {/* Selector de Talle */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Talle</span>
              <button className="text-[10px] font-bold uppercase text-blood underline decoration-blood/30 underline-offset-2 hover:decoration-blood cursor-pointer">
                Ver guía de talles
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-12 border text-sm font-bold uppercase transition-all cursor-pointer
                    ${selectedSize === size
                      ? "border-blood bg-blood text-background"
                      : "border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- BOTONES DE ACCIÓN --- */}
        <div className="flex flex-col gap-3 mb-8">
            <button
                onClick={() => addItem({
                    ...product, 
                    price: effectivePrice // Guardamos en el carrito el precio real (oferta o normal)
                })}
                disabled={product.stock <= 0}
                className="w-full bg-foreground text-background font-epilogue font-bold uppercase tracking-widest py-4 hover:bg-blood transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
                <ShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? "Agregar al Carrito" : "Sin Stock"}
            </button>
        </div>

        {/* Badges de Confianza */}
         <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-gray-400" />
                <span><span className="font-bold text-foreground">Envío Gratis</span> a todo el país en compras superiores a $100.000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-gray-400" />
                <span>Garantía oficial de <span className="font-bold text-foreground">{product.brand}</span></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
                <Check className="w-5 h-5 text-green-500" />
                <span>Stock disponible para entrega inmediata</span>
            </div>
        </div>
        
        {/* Descripción */}
        <div className="mt-8">
            <h3 className="font-bold uppercase text-xs tracking-wider text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
        </div>

      </div>
    </div>
  );
}