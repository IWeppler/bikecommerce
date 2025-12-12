"use client";

import Link from "next/link";
import { XCircle, RefreshCcw, HelpCircle } from "lucide-react";
import { routes } from "@/routes";

export default function CheckoutRejectedPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      
      <div className="max-w-md w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Icono de Error */}
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-red-50/50">
          <XCircle className="w-12 h-12 text-blood" />
        </div>

        <h1 className="font-epilogue font-bold text-3xl uppercase tracking-tighter mb-4 text-foreground">
          Hubo un problema
        </h1>
        
        <p className="text-gray-500 font-manrope mb-8">
          No pudimos procesar tu pago. Esto puede deberse a fondos insuficientes, tarjeta rechazada o un error de conexión.
        </p>

        {/* Botones de Acción */}
        <div className="space-y-3">
          <Link 
            href={routes.checkout.process}
            className="w-full bg-blood text-white font-epilogue font-bold uppercase tracking-widest py-4 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 rounded-sm shadow-lg shadow-red-100"
          >
            <RefreshCcw className="w-4 h-4" />
            Intentar nuevamente
          </Link>
          
          <Link 
            href={routes.contact} 
            className="w-full bg-white border border-gray-200 text-foreground font-epilogue font-bold uppercase tracking-widest py-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 rounded-sm"
          >
            <HelpCircle className="w-4 h-4" />
            Contactar Soporte
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
            Si el problema persiste, comunicate con tu banco emisor.
        </p>

      </div>
    </div>
  );
}