"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { routes } from "@/routes";

export default function CheckoutSuccessPage() {
  // Generamos un ID falso para la demo
  const orderId = "ORD-" + Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Icono Animado */}
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-green-50/50">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="font-epilogue font-bold text-4xl uppercase tracking-tighter mb-4 text-foreground">
          ¡Compra Exitosa!
        </h1>

        <p className="text-gray-500 font-manrope text-lg mb-8">
          Gracias por confiar en APEX. Tu pedido ya está en proceso de
          preparación.
        </p>

        {/* Tarjeta de Detalles */}
        <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-xl shadow-gray-100/50 mb-8 text-left">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
              N° de Orden
            </span>
            <span className="font-mono font-bold text-lg">{orderId}</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Hemos enviado un correo de confirmación con la factura y el código
            de seguimiento a tu email.
          </p>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          <Link
            href={routes.home}
            className="w-full bg-black text-white font-epilogue font-bold uppercase tracking-widest py-4 hover:bg-blood transition-colors flex items-center justify-center gap-2 rounded-sm"
          >
            Volver al inicio
          </Link>

          <Link
            href={routes.auth.account}
            className="group flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-foreground py-2 transition-colors"
          >
            Ver mis pedidos{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
