import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, ArrowRight } from "lucide-react";

// Simulamos los datos del JSON para extraer las marcas dinámicamente.
// En producción: import products from "@/data/products.json";
const productsData = [
  { brand: "Venzo" },
  { brand: "Trek" },
  { brand: "Raleigh" },
  { brand: "SLP" },
  { brand: "Specialized" },
  { brand: "Lazer" },
  { brand: "Beto" },
  { brand: "Maxxis" },
  { brand: "CatEye" },
  { brand: "Shimano" },
];

// Lógica para obtener marcas únicas ordenadas
const uniqueBrands = Array.from(new Set(productsData.map((p) => p.brand))).sort();

export default function Footer() {
  return (
    <footer className="bg-foreground text-white border-t-4 border-swiss-blood pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-4">
        
        {/* Top Section: Newsletter & Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 border-b border-white/10 pb-16">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 group">
              <span className="font-epilogue font-bold text-4xl tracking-tighter italic text-white">
                APEX
              </span>
              <div className="h-2 w-full bg-swiss-blood rounded-full mt-1 group-hover:animate-pulse" />
            </Link>
            <p className="font-manrope text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Tu tienda de ciclismo premium en Tostado. Ingeniería, pasión y las mejores marcas del mundo en un solo lugar.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-swiss-blood transition-colors group">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-swiss-blood transition-colors group">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-swiss-blood transition-colors group">
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-8 bg-white/5 rounded-sm p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
            <div>
              <h3 className="font-epilogue font-bold text-2xl uppercase italic tracking-tight mb-2">
                Unite al Pelotón
              </h3>
              <p className="text-gray-400 text-sm">
                Recibí ofertas exclusivas y novedades de lanzamientos antes que nadie.
              </p>
            </div>
            <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Tu email..." 
                className="bg-black/30 border border-white/10 px-4 py-3 text-sm text-white focus:outline-hidden focus:border-swiss-blood w-full md:w-80 rounded-sm"
              />
              <button className="bg-swiss-blood hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-sm transition-colors flex items-center justify-center gap-2">
                Suscribirse <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          
          {/* Columna 1: Explorar */}
          <div>
            <h4 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-6 text-gray-500">
              Explorar
            </h4>
            <ul className="space-y-4">
              {['Bicicletas', 'Indumentaria', 'Componentes', 'Accesorios', 'Ofertas'].map((item) => (
                <li key={item}>
                  <Link href={`/categoria/${item.toLowerCase()}`} className="text-gray-300 hover:text-swiss-blood transition-colors font-medium text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 2: Marcas (Dinámica) */}
          <div>
            <h4 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-6 text-gray-500">
              Nuestras Marcas
            </h4>
            <ul className="space-y-4">
              {uniqueBrands.slice(0, 6).map((brand) => (
                <li key={brand}>
                  <Link href={`/marcas/${brand.toLowerCase()}`} className="text-gray-300 hover:text-swiss-blood transition-colors font-medium text-sm">
                    {brand}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/marcas" className="text-swiss-blood font-bold text-xs uppercase tracking-wide hover:underline flex items-center gap-1 mt-2">
                  Ver todas <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ayuda al Cliente */}
          <div>
            <h4 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-6 text-gray-500">
              Soporte
            </h4>
            <ul className="space-y-4">
              {['Guía de Talles', 'Envíos y Entregas', 'Garantía Apex', 'Devoluciones', 'Service Oficial'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-300 hover:text-swiss-blood transition-colors font-medium text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="font-epilogue font-bold text-sm uppercase tracking-widest mb-6 text-gray-500">
              Contacto
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-swiss-blood shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Av. San Martín 1234,<br /> Tostado, Santa Fe (CP 3060)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-swiss-blood shrink-0" />
                <span className="text-gray-300 text-sm">+54 9 3491 123-456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-swiss-blood shrink-0" />
                <span className="text-gray-300 text-sm">ventas@apexbikes.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-manrope">
            © {new Date().getFullYear()} Apex Bikes. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
              Términos de Uso
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
              Defensa del Consumidor
            </Link>
          </div>

          
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">
            Design by <Link href="https://ignacioweppler.com" target="_blank" className="text-swiss-blood hover:underline">Ignacio Weppler</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}