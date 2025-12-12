import React from 'react';
import { notFound } from 'next/navigation';
import { 
  getProductBySlug, 
  getAllProducts, 
  getAllCategoryPaths, 
  isValidCategory,
  getProductsByCategory 
} from '@/lib/db';
import ProductListing from '@/features/shop/ProductListing';
import ProductDetailView from '@/features/shop/ProductDetailView';

// Tipado correcto para params
interface PageProps {
  params: { slug: string[] }
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  // 1. Rutas de productos (ej: /catalogo/trek-marlin-7)
  const products = getAllProducts();
  products.forEach((p) => {
    paths.push({ slug: [p.slug] });
  });

  // 2. Rutas de categorías (ej: /catalogo/bicicletas/mtb)
  const categoryPaths = getAllCategoryPaths();
  categoryPaths.forEach((pathArray) => {
    paths.push({ slug: pathArray });
  });

  return paths;
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params; // Await necesario en versiones nuevas
  const lastSegment = slug[slug.length - 1];

  // A. INTENTAMOS VER SI ES UN PRODUCTO
  const product = getProductBySlug(lastSegment);
  if (product) {
    return <ProductDetailView product={product} />;
  }

  // B. SI NO ES PRODUCTO, INTENTAMOS VER SI ES CATEGORÍA
  if (isValidCategory(slug)) {
    const categorySlug = slug[0];
    const subcategorySlug = slug[1] || "";
    
    // Obtenemos productos filtrados
    const products = getProductsByCategory(categorySlug, subcategorySlug);

    return (
      <ProductListing 
        category={categorySlug}
        subcategory={subcategorySlug}
        initialProducts={products}
      />
    );
  }

  // C. SI NO ES NADA -> 404
  return notFound();
}