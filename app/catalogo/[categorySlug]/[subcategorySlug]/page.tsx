import ProductListingPage from "@/features/shop/ProductListing";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { subcategorySlug, categorySlug } = await params;

  // Formateo de títulos para SEO (Capitalize)
  const categoryTitle = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
  const subTitle = subcategorySlug === 'mtb' ? 'Mountain Bikes' : subcategorySlug.charAt(0).toUpperCase() + subcategorySlug.slice(1);

  return {
    title: `${subTitle} - ${categoryTitle} | Apex Bikes`,
    description: `Comprá online ${subTitle} en Apex Bikes. Envíos a todo el país. Distribuidores oficiales.`,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { categorySlug, subcategorySlug } = await params;

  return (
    <ProductListingPage 
      categorySlug={categorySlug} 
      subcategorySlug={subcategorySlug} 
    />
  );
}