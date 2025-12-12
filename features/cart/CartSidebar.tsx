"use client";

import Link from "next/link";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useEffect, useState } from "react";
import { routes } from "@/routes"; // Asegúrate de importar tus rutas centralizadas

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, addItem, getTotalPrice } =
    useCartStore();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 backdrop-blur-sm ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      />

      {/* Panel Deslizante */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background z-60 shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-gray-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="font-epilogue font-bold text-xl uppercase tracking-tight">
              Tu Carrito ({items.length})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              // ESTADO VACÍO
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h2 className="font-medium text-2xl mb-6 text-foreground">
                  Tu carrito está vacío
                </h2>
                <button
                  onClick={closeCart}
                  className="w-full font-epilogue bg-foreground text-background font-bold text-sm uppercase tracking-widest py-4 px-8 mb-8 hover:bg-blood transition-colors cursor-pointer"
                >
                  Seguir comprando
                </button>
                <div className="text-sm text-gray-500 font-manrope">
                  <p className="font-bold text-foreground mb-1">
                    ¿Tienes una cuenta?
                  </p>
                  <p>
                    <Link
                      href={routes.auth.login}
                      className="underline hover:text-blood"
                      onClick={closeCart}
                    >
                      Inicia sesión
                    </Link>{" "}
                    para finalizar más rápido.
                  </p>
                </div>
              </div>
            ) : (
              // LISTA DE PRODUCTOS
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-100 rounded-sm overflow-hidden shrink-0 border border-transparent group-hover:border-gray-200 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-epilogue font-bold text-sm uppercase leading-tight line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                          {item.brand}
                        </p>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        {/* Selector de Cantidad */}
                        <div className="flex items-center border border-gray-200 h-8 rounded-sm">
                          <button
                            // Si no tienes decreaseItem, usa removeItem temporalmente o crea la acción
                            onClick={() =>
                              item.quantity > 1
                                ? addItem({ ...item, stock: -1 })
                                : removeItem(item.id)
                            }
                            className="px-2 h-full hover:bg-gray-100 text-gray-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addItem(item)}
                            className="px-2 h-full hover:bg-gray-100 text-gray-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-manrope font-bold text-sm text-foreground">
                            $
                            {(item.price * item.quantity).toLocaleString(
                              "es-AR"
                            )}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-gray-400">
                              ${item.price.toLocaleString("es-AR")} c/u
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-full self-start transition-all"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer con Totales */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Subtotal
                </span>
                <span className="text-xl font-manrope font-bold text-foreground">
                  ${getTotalPrice().toLocaleString("es-AR")}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mb-6 text-center">
                Los costos de envío e impuestos se calculan en el siguiente
                paso.
              </p>

              <Link
                href={routes.checkout.process}
                onClick={closeCart}
                className="w-full bg-blood text-white font-epilogue font-bold text-sm uppercase tracking-[0.15em] py-4 hover:bg-foreground transition-all shadow-lg flex items-center justify-center"
              >
                Finalizar Compra
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
