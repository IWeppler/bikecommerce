"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Para redirigir
import { ArrowRight, Loader2 } from "lucide-react";
import { routes } from "@/routes";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

interface AuthFormProps {
  view: "login" | "register";
}

export default function AuthForm({ view }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login); 

  const isLogin = view === "login";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Capturamos datos del form (forma rápida)
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    // const password = formData.get("password");

    // SIMULACIÓN DE API (Aquí iría tu fetch a tu backend/Supabase)
    setTimeout(() => {
      login({
        id: "user-123", 
        email: email,
        name: isLogin ? "Usuario Demo" : name, 
        role: "user",
      });

      setIsLoading(false);
      
      router.push(routes.home); 
    }, 1500);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-10 text-center">
        <h1 className="font-epilogue font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">
          {isLogin ? "Bienvenido" : "Crear Cuenta"}
        </h1>
        <p className="text-gray-500 text-sm">
          {isLogin
            ? "Ingresa tus datos para acceder a tu historial."
            : "Únete a APEX para seguimiento de pedidos."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {!isLogin && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Nombre Completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Ej. Juan Pérez"
              className="w-full bg-transparent border-b border-gray-300 py-3 text-foreground placeholder:text-gray-300 focus:border-blood focus:outline-none transition-colors font-medium"
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="nombre@ejemplo.com"
            className="w-full bg-transparent border-b border-gray-300 py-3 text-foreground placeholder:text-gray-300 focus:border-blood focus:outline-none transition-colors font-medium"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Contraseña
            </label>
            {isLogin && (
              <Link href={routes.auth.forgotPassword} className="text-[10px] text-gray-400 hover:text-blood uppercase tracking-wide font-bold">
                ¿Olvidaste tu contraseña?
              </Link>
            )}
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full bg-transparent border-b border-gray-300 py-3 text-foreground placeholder:text-gray-300 focus:border-blood focus:outline-none transition-colors font-medium"
          />
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-foreground text-background font-epilogue font-bold uppercase tracking-widest text-sm py-4 mt-4 hover:bg-blood transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-gray-100 pt-8">
        <p className="text-sm text-gray-500">
          {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <Link
            href={isLogin ? routes.auth.register : routes.auth.login}
            className="font-bold text-foreground hover:text-blood underline underline-offset-4 transition-colors ml-1"
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión"}
          </Link>
        </p>
      </div>
    </div>
  );
}