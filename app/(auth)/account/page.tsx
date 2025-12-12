"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  Package, 
  MapPin, 
  LogOut, 
  CreditCard, 
  Loader2,
  ChevronRight
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { routes } from "@/routes";

type AccountSection = 'dashboard' | 'orders' | 'addresses' | 'details';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState<AccountSection>('dashboard');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setIsMounted(true);
    
    if (!useAuthStore.getState().isAuthenticated) {
      router.push(routes.auth.login);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push(routes.home);
  };

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blood" />
      </div>
    );
  }

  // Menú lateral
  const menuItems = [
    { id: 'dashboard', label: 'Escritorio', icon: User },
    { id: 'orders', label: 'Mis Pedidos', icon: Package },
    { id: 'addresses', label: 'Direcciones', icon: MapPin },
    { id: 'details', label: 'Detalles de Cuenta', icon: CreditCard },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12 md:py-20 min-h-screen">
      
      {/* Header de Página */}
      <div className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="font-epilogue font-bold text-3xl md:text-4xl uppercase tracking-tight mb-2">
          Mi Cuenta
        </h1>
        <p className="text-gray-500">
          Bienvenido de nuevo, <span className="text-foreground font-bold">{user?.name}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR DE NAVEGACIÓN */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as AccountSection)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all border-l-2 ${
                  activeSection === item.id
                    ? "border-blood text-blood bg-gray-50"
                    : "border-transparent text-gray-500 hover:text-foreground hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-red-600 transition-colors border-l-2 border-transparent mt-8"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1">
          
          {/* VISTA: DASHBOARD (Resumen) */}
          {activeSection === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <p className="text-gray-600 font-manrope leading-relaxed">
                Desde el escritorio de tu cuenta puedes ver tus{" "}
                <button onClick={() => setActiveSection('orders')} className="text-blood underline decoration-blood/30 underline-offset-4 hover:decoration-blood">pedidos recientes</button>,{" "}
                gestionar tus{" "}
                <button onClick={() => setActiveSection('addresses')} className="text-blood underline decoration-blood/30 underline-offset-4 hover:decoration-blood">direcciones de envío</button>{" "}
                y <button onClick={() => setActiveSection('details')} className="text-blood underline decoration-blood/30 underline-offset-4 hover:decoration-blood">editar tu contraseña y detalles de la cuenta</button>.
              </p>

              {/* Grid de Accesos Rápidos (Estilo Tarjetas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-8 flex flex-col justify-between hover:border-blood transition-colors group cursor-pointer" onClick={() => setActiveSection('orders')}>
                    <div>
                        <Package className="w-8 h-8 text-gray-300 group-hover:text-blood mb-4 transition-colors" />
                        <h3 className="font-epilogue font-bold text-lg uppercase mb-2">Mis Pedidos</h3>
                        <p className="text-sm text-gray-500">Rastrea, devuelve o vuelve a comprar artículos.</p>
                    </div>
                </div>
                
                <div className="border border-gray-200 p-8 flex flex-col justify-between hover:border-blood transition-colors group cursor-pointer" onClick={() => setActiveSection('details')}>
                    <div>
                        <User className="w-8 h-8 text-gray-300 group-hover:text-blood mb-4 transition-colors" />
                        <h3 className="font-epilogue font-bold text-lg uppercase mb-2">Información Personal</h3>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA: PEDIDOS (Placeholder) */}
          {activeSection === 'orders' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="font-epilogue font-bold text-xl uppercase mb-6">Historial de Pedidos</h2>
              
              {/* Estado vacío de pedidos */}
              <div className="bg-surface border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Aún no has realizado pedidos</h3>
                <p className="text-gray-500 mb-6 text-sm">Empieza a explorar nuestro catálogo para equiparte.</p>
                <Link href={routes.catalog.root} className="inline-block bg-black text-white font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-blood transition-colors">
                    Ir a la tienda
                </Link>
              </div>
            </div>
          )}

           {/* VISTA: DIRECCIONES (Placeholder) */}
           {activeSection === 'addresses' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="font-epilogue font-bold text-xl uppercase">Mis Direcciones</h2>
                  <button className="text-xs font-bold uppercase text-blood border-b border-blood hover:opacity-70">Agregar nueva</button>
              </div>
              <p className="text-sm text-gray-500">No tienes direcciones guardadas por defecto.</p>
            </div>
          )}

           {/* VISTA: DETALLES (Formulario ReadOnly por ahora) */}
           {activeSection === 'details' && (
            <div className="max-w-lg animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="font-epilogue font-bold text-xl uppercase mb-6">Detalles de la cuenta</h2>
              <form className="space-y-6">
                  <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Nombre</label>
                      <input type="text" defaultValue={user?.name} className="w-full bg-gray-50 border border-gray-200 p-3 font-medium focus:outline-none focus:border-blood" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</label>
                      <input type="email" defaultValue={user?.email} disabled className="w-full bg-gray-100 border border-transparent p-3 text-gray-500 cursor-not-allowed" />
                  </div>
                  <button type="button" className="bg-black text-white font-bold uppercase tracking-widest text-xs px-8 py-4 hover:bg-blood transition-colors">
                      Guardar Cambios
                  </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}