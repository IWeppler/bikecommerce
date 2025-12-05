"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import navigationData from "@/data/navigation.json";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-surface">
      <div className="max-w-[1440px] mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="shrink-0 z-50">
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-epilogue font-bold text-3xl tracking-tighter italic text-foreground">
              APEX
            </span>
            <div className="h-2 w-2 bg-swiss-blood rounded-full mt-2 group-hover:animate-pulse" />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center h-full">
          <ul className="flex h-full">
            {Object.entries(navigationData).map(([key, item]) => (
              <li
                key={key}
                className="h-full flex items-center px-6 relative group cursor-pointer"
                onMouseEnter={() => setActiveMenu(key)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <span className="font-epilogue text-sm font-bold uppercase tracking-wide border-b-2 border-transparent hover:border-swiss-blood py-1 transition-all">
                  {item.label}
                </span>

                {/* MEGA MENU */}
                {activeMenu === key && (
                  <div className="absolute top-full left-0 w-[90vw] max-w-5xl -translate-x-1/4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="bg-white shadow-2xl border-t-2 border-swiss-blood p-8 grid grid-cols-12 gap-8 rounded-b-sm">
                      
                      {/* Enlaces */}
                      <div className="col-span-8 grid grid-cols-3 gap-8">
                        {item.sections.map((section: any) => (
                          <div key={section.title}>
                            <h3 className="font-epilogue font-bold text-foreground mb-4 uppercase text-xs tracking-wider">
                              {section.title}
                            </h3>
                            <ul className="space-y-2.5">
                              {section.links.map((link: string) => (
                                <li key={link}>
                                  <Link
                                    href={`/categoria/${link.toLowerCase().replace(" ", "-")}`}
                                    className="text-sm text-gray-500 hover:text-swiss-blood transition-colors block"
                                  >
                                    {link}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Destacado */}
                      <div className="col-span-4 relative group/card overflow-hidden bg-surface h-full min-h-[250px] rounded-sm">
                        <img
                          src={item.featured.image}
                          alt={item.featured.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end items-start text-white">
                          <span className="bg-swiss-blood text-white text-[10px] font-bold px-2 py-0.5 mb-2 uppercase tracking-widest">
                            New Arrival
                          </span>
                          <h4 className="font-epilogue font-bold text-xl leading-tight italic">
                            {item.featured.title}
                          </h4>
                          <p className="text-sm text-gray-200 mt-1 mb-4 font-medium">
                            {item.featured.subtitle}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </li>
            ))}
            <li className="h-full flex items-center px-6">
              <Link href="/ofertas" className="font-epilogue text-sm font-bold uppercase tracking-wide text-swiss-blood hover:opacity-80">
                Ofertas
              </Link>
            </li>
          </ul>
        </nav>

        {/* ICONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-surface rounded-full transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-surface rounded-full transition-colors hidden md:block">
            <User className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-2 hover:bg-surface rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <span className="absolute top-0 right-0 bg-swiss-blood text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </button>
          <button className="lg:hidden p-2" onClick={() => setIsMobileOpen(!isMobileOpen)}>
             {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu Logic Here... (Mantenemos la misma del anterior) */}
    </header>
  );
}