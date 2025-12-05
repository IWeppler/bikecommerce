export default function TopBar() {
  return (
    <div className="bg-[#121313] text-white py-2 px-4 text-[11px] font-medium tracking-wide uppercase z-50 relative">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <p className="hidden md:block">
          Envío gratis en pedidos superiores a $200.000
        </p>
        <p className="md:hidden">Envío gratis {">"} $200k</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-blood transition-colors">
            Buscar Tiendas
          </a>
          <a href="#" className="hover:text-blood transition-colors">
            Centro de Ayuda
          </a>
        </div>
      </div>
    </div>
  );
}
