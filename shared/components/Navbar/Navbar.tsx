"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import navigationData from "@/data/navigation.json";
import { routes } from "@/routes";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { slugify } from "@/lib/db";

export default function Navbar() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { user, isAuthenticated } = useAuthStore();
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);

  const [isMounted, setIsMounted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setIsMounted(true);
    setHasMounted(true);
  }, []);

  const userLink =
    isMounted && isAuthenticated ? routes.auth.account : routes.auth.login;

  const totalItems = hasMounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  // Lógica de Submit del Buscador
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q")?.toString().trim();

    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setIsMobileOpen(false);
    }
  };

  // Toggle del menú móvil
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    setMobileExpanded(null);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-surface">
      <div className="max-w-[1440px] mx-auto px-4 h-20 flex items-center justify-between relative bg-background z-50">
        {/* LOGO */}
        <div className="shrink-0">
          <Link
            href={routes.home}
            className="flex items-center gap-1 group"
            onClick={() => setIsMobileOpen(false)}
          >
            <span className="font-epilogue font-bold text-3xl tracking-tighter italic text-foreground">
              APEX
            </span>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION  */}
        <nav className="hidden lg:flex items-center h-full">
          <ul className="flex h-full">
            {Object.entries(navigationData).map(([key, item]) => {
              const parentCategory = key.toLowerCase().replace(/\s+/g, "-");
              return (
                <li
                  key={key}
                  className="h-full flex items-center px-6 relative group cursor-pointer"
                  onMouseEnter={() => setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <span className="font-epilogue text-sm font-bold uppercase tracking-wide border-b-2 border-transparent py-1 transition-all">
                    {item.label}
                  </span>

                  {/* MEGA MENU DESKTOP */}
                  {activeMenu === key && (
                    <div className="absolute top-full left-0 w-[90vw] max-w-5xl -translate-x-1/4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="bg-white shadow-2xl border-t-2 border-blood p-8 grid grid-cols-12 gap-8 rounded-b-sm">
                        <div className="col-span-8 grid grid-cols-3 gap-8">
                          {item.sections.map((section: any) => (
                            <div key={section.title}>
                              <h3 className="font-epilogue font-bold text-foreground mb-4 uppercase text-xs tracking-wider">
                                {section.title}
                              </h3>
                              <ul className="space-y-2.5">
                                {section.links.map((link: string) => {
                                  const subCategorySlug = slugify(link);

                                  const parentCategorySlug = slugify(key);

                                  return (
                                    <li key={link}>
                                      <Link
                                        href={routes.catalog.subcategory(
                                          parentCategorySlug,
                                          subCategorySlug
                                        )}
                                        className="text-sm text-gray-500 hover:text-blood transition-colors block"
                                      >
                                        {link}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <Link
                          href={routes.catalog.category(
                            item.featured.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                          )}
                          className="col-span-4 relative group/card overflow-hidden bg-surface h-full min-h-[250px] rounded-sm block"
                        >
                          <img
                            src={item.featured.image}
                            alt={item.featured.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end items-start text-white">
                            <span className="bg-blood text-white text-[10px] font-bold px-2 py-0.5 mb-2 uppercase tracking-widest">
                              New Arrival
                            </span>
                            <h4 className="font-epilogue font-bold text-xl leading-tight italic">
                              {item.featured.title}
                            </h4>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            <li className="h-full flex items-center px-6">
              <Link
                href={routes.offers}
                className="font-epilogue text-sm font-bold uppercase tracking-wide text-blood hover:opacity-80"
              >
                Ofertas
              </Link>
            </li>
          </ul>
        </nav>

        {/* ICONS */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Botón de Search: Ahora es un toggle */}
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMobileOpen(false);
            }}
            className={`p-2 rounded-full transition-colors ${
              isSearchOpen
                ? "bg-surface text-blood"
                : "hover:bg-surface text-foreground"
            }`}
          >
            {isSearchOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          <Link
            href={userLink}
            className="p-2 hover:bg-surface rounded-full transition-colors hidden md:block relative group"
            title={isAuthenticated ? `Hola, ${user?.name}` : "Iniciar Sesión"}
          >
            <User
              className={`w-5 h-5 ${
                isAuthenticated ? "text-blood" : "text-foreground"
              }`}
            />
            {isMounted && isAuthenticated && (
              <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="p-2 hover:bg-surface rounded-full transition-colors relative cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-blood text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </button>

          <button className="lg:hidden p-2" onClick={toggleMobileMenu}>
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`
        absolute top-full left-0 w-full bg-white border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out z-40
        ${isSearchOpen ? "max-h-40 opacity-100 shadow-xl" : "max-h-0 opacity-0"}
      `}
      >
        <div className="max-w-[1440px] mx-auto px-4 py-8">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              name="q"
              autoFocus={isSearchOpen}
              placeholder="Buscar bicicletas, accesorios, marcas..."
              className="w-full bg-surface border-b-2 border-transparent focus:border-blood text-xl py-3 pl-4 pr-12 outline-none font-epilogue placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blood"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* MOBILE MENU LOGIC */}
      <div
        className={`
        fixed inset-x-0 top-20 bottom-0 bg-background z-30 lg:hidden overflow-y-auto transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col p-6 pb-24">
          {/* 1. Buscador Móvil (Visible dentro del menú también) */}
          <form onSubmit={handleSearch} className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="q"
              placeholder="Buscar..."
              className="w-full bg-surface py-3 pl-10 pr-4 rounded-sm text-sm border border-transparent focus:border-blood outline-none"
            />
          </form>

          {/* 2. Navegación Principal (Acordeón) */}
          <nav className="flex flex-col gap-2">
            {Object.entries(navigationData).map(([key, item]) => {
              const parentCategory = key.toLowerCase().replace(/\s+/g, "-");
              const isExpanded = mobileExpanded === key;

              return (
                <div key={key} className="border-b border-gray-100">
                  {/* Header de Categoría */}
                  <button
                    onClick={() => setMobileExpanded(isExpanded ? null : key)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span
                      className={`font-epilogue font-bold uppercase tracking-wider ${
                        isExpanded ? "text-blood" : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-blood" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* Submenú desplegable */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-[1000px] opacity-100 mb-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-4 space-y-6">
                      {/* Link "Ver todo" */}
                      <Link
                        href={routes.catalog.category(parentCategory)}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-blood"
                      >
                        Ver todo {item.label} <ArrowRight className="w-3 h-3" />
                      </Link>

                      {/* Secciones */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        {item.sections.map((section: any) => (
                          <div key={section.title}>
                            <h4 className="font-epilogue font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-3">
                              {section.title}
                            </h4>
                            <ul className="space-y-3">
                              {section.links.map((link: string) => {
                                const subCategory = link
                                  .toLowerCase()
                                  .replace(/\s+/g, "-");
                                return (
                                  <li key={link}>
                                    <Link
                                      href={routes.catalog.subcategory(
                                        parentCategory,
                                        subCategory
                                      )}
                                      onClick={() => setIsMobileOpen(false)}
                                      className="text-sm text-gray-600 hover:text-blood block"
                                    >
                                      {link}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Enlace Ofertas */}
            <Link
              href={routes.offers}
              onClick={() => setIsMobileOpen(false)}
              className="py-4 font-epilogue font-bold uppercase tracking-wider text-blood border-b border-gray-100 flex justify-between items-center"
            >
              Ofertas
              <ChevronRight className="w-5 h-5" />
            </Link>

            {/* Enlace Cuenta (Móvil) */}
            <Link
              href={userLink}
              onClick={() => setIsMobileOpen(false)}
              className="py-4 font-epilogue font-bold uppercase tracking-wider text-foreground border-b border-gray-100 flex justify-between items-center"
            >
              {isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión / Registrarse"}
              <User className="w-5 h-5 text-gray-400" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
