import React from "react";
import { notFound } from "next/navigation";
import CategoryHub from "@/features/shop/CategoryHub"; // Asegurate que la ruta de importación sea correcta

// Definimos qué slugs son válidos para generar páginas estáticas (SSG) o validar en runtime.
// Esto ayuda al SEO y performance.
const VALID_CATEGORIES = ["bicicletas", "equipamiento", "componentes"];

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  
  // Capitalizar para el título
  const title = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  return {
    title: `${title} | Catálogo Apex Bikes`,
    description: `Explorá nuestra colección completa de ${categorySlug}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  // En Next.js 15, params es una promesa que debemos esperar
  const { categorySlug } = await params;

  // Validación simple: si la categoría no existe en nuestra "base de datos" o lista válida,
  // devolvemos un 404 real.
  if (!VALID_CATEGORIES.includes(categorySlug)) {
    notFound();
  }

  // Renderizamos el componente visual que creamos antes
  return <CategoryHub categorySlug={categorySlug} />;
}

// Opcional: Si querés que estas páginas se generen al compilar (SSG) para máxima velocidad
export async function generateStaticParams() {
  return VALID_CATEGORIES.map((slug) => ({
    categorySlug: slug,
  }));
}