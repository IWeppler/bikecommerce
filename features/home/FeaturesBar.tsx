import { Truck, ShieldCheck, Wrench } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Envío Asegurado",
    desc: "A todo el país en caja reforzada."
  },
  {
    icon: ShieldCheck,
    title: "Garantía Oficial",
    desc: "5 años en cuadros de carbono."
  },
  {
    icon: Wrench,
    title: "Service Post-Venta",
    desc: "Ajuste gratuito a los 3 meses."
  }
];

export default function FeaturesBar() {
  return (
    <section className="bg-foreground text-background py-12">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 group cursor-default">
            <div className="p-3 bg-white/5 rounded-sm">
              <item.icon className="w-6 h-6 text-background" />
            </div>
            <div>
              <h3 className="font-epilogue font-bold uppercase tracking-wide text-sm mb-0.5">
                {item.title}
              </h3>
              <p className="text-paragraph text-sm">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}