"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Check,
  Shield,
  CreditCard,
  Banknote,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { Product } from "@/lib/db";

const SITE_CONFIG = {
  transferDiscount: 0.15,
  installments: 6,
};

export default function ProductDetailView({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  // Estados para selectores
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // --- CÁLCULOS ARGENTINOS ---
  const transferPrice = product.price * (1 - SITE_CONFIG.transferDiscount);
  const installmentPrice = product.price / SITE_CONFIG.installments;

  // Formateador de moneda
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* COLUMNA 1: GALERÍA (Ocupa 7 columnas en desktop) */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="bg-surface rounded-sm overflow-hidden aspect-4/3 relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-foreground text-background text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Nuevo Ingreso
            </span>
          )}
        </div>
        {/* Aquí podrías poner thumbnails si tuvieras más fotos */}
      </div>

      {/* COLUMNA 2: INFO Y COMPRA (Ocupa 5 columnas, Sticky para que te siga al scrollear) */}
      <div className="lg:col-span-5 flex flex-col h-fit lg:sticky lg:top-24">
        <div className="mb-8 border-b border-gray-100 pb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
            {product.brand}
          </h2>
          <h1 className="font-epilogue font-bold text-3xl md:text-4xl leading-tight text-foreground uppercase mb-6">
            {product.name}
          </h1>

          {/* --- PRECIOS  --- */}
          <div className="space-y-1">
            {/* Precio Principal */}
            <p className="font-manrope text-3xl font-bold text-foreground">
              {formatMoney(product.price)}
            </p>

            {/* Info Financiera (Sutil) */}
            <div className="flex flex-col gap-1 pt-2">
              <p className="text-sm font-medium text-blood">
                {formatMoney(transferPrice)}{" "}
                <span className="text-gray-500 font-normal">
                  pagando con transferencia
                </span>
              </p>
              <p className="text-sm text-gray-500">
                {SITE_CONFIG.installments} cuotas sin interés de{" "}
                {formatMoney(installmentPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* --- SELECTORES (Color y Talle) --- */}
        <div className="space-y-6 mb-8">
          {/* Selector de Color */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
              Color: <span className="text-foreground">Negro Mate</span>
            </span>
            <div className="flex gap-3">
              {["bg-gray-900", "bg-gray-400", "bg-red-700"].map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${color} ${
                    selectedColor === color
                      ? "border-blood ring-1 ring-blood ring-offset-2"
                      : "border-transparent hover:scale-110"
                  } transition-all`}
                />
              ))}
            </div>
          </div>

          {/* Selector de Talle */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Talle
              </span>
              <button className="text-[10px] font-bold uppercase text-blood underline decoration-blood/30 underline-offset-2 hover:decoration-blood">
                Ver guía de talles
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-12 border text-sm font-bold uppercase transition-all
                                ${
                                  selectedSize === size
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
            onClick={() => addItem(product)}
            disabled={product.stock <= 0}
            className="w-full bg-foreground text-background font-epilogue font-bold uppercase tracking-widest py-4 hover:bg-blood transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {product.stock > 0 ? "Agregar al Carrito" : "Sin Stock"}
          </button>
        </div>

        {/* Información Extra (Acordeones o Badges) */}
        <div className="space-y-4 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Truck className="w-5 h-5 text-gray-400" />
            <span>
              <span className="font-bold text-foreground">Envío Gratis</span> a
              todo el país en compras superiores a $100.000
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-gray-400" />
            <span>
              Garantía oficial de{" "}
              <span className="font-bold text-foreground">{product.brand}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Check className="w-5 h-5 text-green-500" />
            <span>Stock disponible para entrega inmediata</span>
          </div>
        </div>

        {/* Descripción corta */}
        <div className="mt-8">
          <h3 className="font-bold uppercase text-xs tracking-wider text-gray-900 mb-2">
            Descripción
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
