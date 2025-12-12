"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { routes } from "@/routes";
import { CreditCard, Banknote, ShieldCheck, Lock } from "lucide-react";

const CHECKOUT_CONFIG = {
  shippingCost: 8500,
  freeShippingThreshold: 150000,
  transferDiscount: 0.15,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">(
    "card"
  );

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.push(routes.catalog.root);
    }
  }, [isMounted, items, router]);

  if (!isMounted || items.length === 0) return null;

  const subtotal = getTotalPrice();
  const isFreeShipping = subtotal > CHECKOUT_CONFIG.freeShippingThreshold;
  const shipping = isFreeShipping ? 0 : CHECKOUT_CONFIG.shippingCost;

  // Descuento solo si elige transferencia
  const discountAmount =
    paymentMethod === "transfer"
      ? subtotal * CHECKOUT_CONFIG.transferDiscount
      : 0;

  const total = subtotal + shipping - discountAmount;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular proceso de pago
    setTimeout(() => {
      clearCart(); // Limpiamos carrito
      router.push(routes.checkout.success);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Simplificado (Solo Logo y Candado) */}

      <header className="border-b border-gray-100 py-4 px-4 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href={routes.home}
            className="font-epilogue font-bold text-2xl italic tracking-tighter"
          >
            APEX
          </Link>

          <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" /> Checkout Seguro
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 p-4 py-8 lg:py-12">
        {/* === COLUMNA IZQUIERDA: FORMULARIOS === */}

        <div className="lg:col-span-7 space-y-10">
          {/* 1. Contacto */}

          <section>
            <h2 className="font-epilogue font-bold text-lg uppercase tracking-wider mb-4">
              1. Datos de Contacto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
                required
              />

              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
                required
              />
            </div>
          </section>

          {/* 2. Envío */}

          <section>
            <h2 className="font-epilogue font-bold text-lg uppercase tracking-wider mb-4">
              2. Dirección de Envío
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Apellido"
                  className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
                />
              </div>

              <input
                type="text"
                placeholder="Dirección (Calle y Altura)"
                className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
              />

              <input
                type="text"
                placeholder="Departamento / Piso (Opcional)"
                className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Código Postal"
                  className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Ciudad"
                  className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors"
                />
              </div>

              <select className="w-full border border-gray-200 p-3 rounded-sm focus:border-blood outline-none transition-colors bg-white">
                <option value="">Seleccionar Provincia...</option>

                <option value="CABA">Capital Federal</option>

                <option value="BA">Buenos Aires</option>

                <option value="CBA">Córdoba</option>

                <option value="SF">Santa Fe</option>

                {/* ... resto de provincias */}
              </select>
            </div>
          </section>

          {/* 3. Pago */}

          <section>
            <h2 className="font-epilogue font-bold text-lg uppercase tracking-wider mb-4">
              3. Método de Pago
            </h2>

            <div className="space-y-3">
              {/* Opción Tarjeta */}

              <label
                className={`block border p-4 rounded-sm cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-blood bg-red-50/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-blood w-5 h-5"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm uppercase">
                        Tarjeta de Crédito / Débito
                      </span>

                      <div className="flex gap-1 text-gray-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Hasta 6 cuotas sin interés.
                    </p>
                  </div>
                </div>
              </label>

              {/* Opción Transferencia */}

              <label
                className={`block border p-4 rounded-sm cursor-pointer transition-all ${
                  paymentMethod === "transfer"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-green-600 w-5 h-5"
                    checked={paymentMethod === "transfer"}
                    onChange={() => setPaymentMethod("transfer")}
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm uppercase text-green-800">
                        Transferencia Bancaria
                      </span>

                      <Banknote className="w-4 h-4 text-green-700" />
                    </div>

                    <p className="text-xs text-green-700 font-bold">
                      15% DE DESCUENTO ADICIONAL
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </section>

          <div className="lg:hidden">
            {/* Botón móvil al final del form */}

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="w-full bg-blood text-white font-epilogue font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-red-700 transition-colors shadow-lg"
            >
              {isLoading
                ? "Procesando..."
                : `Pagar $${total.toLocaleString("es-AR")}`}
            </button>
          </div>
        </div>

        {/* === COLUMNA DERECHA: RESUMEN === */}

        <div className="lg:col-span-5">
          <div className="bg-gray-50 p-6 rounded-sm border border-gray-100 sticky top-24">
            <h3 className="font-epilogue font-bold text-md uppercase tracking-wider mb-6 border-b border-gray-200 pb-4">
              Resumen del pedido
            </h3>

            {/* Lista de Items (Scrollable si son muchos) */}

            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-sm overflow-hidden border border-gray-200 relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    <span className="absolute top-0 right-0 bg-gray-500 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-bl-sm font-bold">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase leading-tight mb-1">
                      {item.name}
                    </h4>

                    <p className="text-xs text-gray-500">{item.brand}</p>
                  </div>

                  <p className="text-sm font-bold font-manrope">
                    ${(item.price * item.quantity).toLocaleString("es-AR")}
                  </p>
                </div>
              ))}
            </div>

            {/* Totales */}

            <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Envío</span>

                {isFreeShipping ? (
                  <span className="text-green-600 font-bold text-xs uppercase">
                    Gratis
                  </span>
                ) : (
                  <span>${shipping.toLocaleString("es-AR")}</span>
                )}
              </div>

              {/* Fila Descuento (Condicional) */}

              {paymentMethod === "transfer" && (
                <div className="flex justify-between text-green-700 font-bold bg-green-100/50 p-2 rounded-sm -mx-2">
                  <span>Descuento Transferencia (15%)</span>

                  <span>-${discountAmount.toLocaleString("es-AR")}</span>
                </div>
              )}

              <div className="flex justify-between items-end border-t border-gray-200 pt-4 mt-2">
                <span className="font-epilogue font-bold uppercase text-lg">
                  Total
                </span>

                <div className="text-right">
                  <span className="font-manrope font-bold text-2xl tracking-tight block">
                    ${total.toLocaleString("es-AR")}
                  </span>

                  {paymentMethod === "card" && (
                    <span className="text-[10px] text-gray-500 font-medium">
                      o 6 cuotas de ${(total / 6).toLocaleString("es-AR")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Botón Desktop */}

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="hidden lg:block w-full bg-blood text-white font-epilogue font-bold uppercase tracking-widest py-4 mt-8 hover:bg-red-700 transition-colorsdisabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? "Procesando..." : "Confirmar Compra"}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Compra protegida
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
