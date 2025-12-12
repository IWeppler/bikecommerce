// lib/db.ts
import productsData from "@/data/products.json";
import navigationData from "@/data/navigation.json";

// Tipo para tu producto
export type Product = (typeof productsData)[0];

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .trim();
}

// --- PRODUCTOS ---

export const getAllProducts = () => productsData;

export const getProductBySlug = (slug: string) => {
  return productsData.find((p) => p.slug === slug) || null;
};

export const getProductsByCategory = (
  category: string,
  subcategoryOrStyle?: string
) => {
  let filtered = productsData.filter(
    (p) => slugify(p.category) === slugify(category)
  );

  if (subcategoryOrStyle) {
    const query = slugify(decodeURIComponent(subcategoryOrStyle));

    filtered = filtered.filter((p) => {
      const pSub = slugify(p.subcategory);
      const pStyle = p.style ? slugify(p.style) : "";

      return pSub === query || pStyle === query;
    });
  }

  return filtered;
};

// --- NAVEGACIÓN Y RUTAS DINÁMICAS ---
export const getAllCategoryPaths = () => {
  const paths: string[][] = [];

  Object.entries(navigationData).forEach(([categoryKey, categoryData]) => {
    const catSlug = slugify(categoryKey);
    paths.push([catSlug]);

    categoryData.sections.forEach((section) => {
      section.links.forEach((linkName) => {
        paths.push([catSlug, slugify(linkName)]);
      });
    });
  });

  return paths;
};

export const isValidCategory = (slugs: string[]) => {
  const category = slugs[0];
  const subcategory = slugs[1];

  const catKey = Object.keys(navigationData).find(
    (k) => slugify(k) === slugify(category)
  );
  if (!catKey) return false;

  if (!subcategory) return true;

  const catData = navigationData[catKey as keyof typeof navigationData];

  const allSubLinks = catData.sections.flatMap((s) =>
    s.links.map((l) => slugify(l))
  );

  const commonSubcategories = ["mtb", "ruta", "urbana", "usados"];
  const cleanSub = slugify(subcategory);

  return (
    allSubLinks.includes(cleanSub) || commonSubcategories.includes(cleanSub)
  );
};

export const getOfferProducts = () => {
  return productsData.filter((p) => p.isOffer === true);
};
