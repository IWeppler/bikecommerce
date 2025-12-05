export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: "bicicletas" | "accesorios" | "repuestos";
  subcategory: string;
  image: string;
  brand: string;
  description: string;
  stock: number;
  isBestSeller: boolean;
  isNew: boolean;
  specs?: {
    frame?: string;
    wheels?: string;
    transmission?: string;
    brakes?: string;
    details?: string;
  };
}
