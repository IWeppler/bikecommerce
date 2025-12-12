export const routes = {
  home: "/",
  contact: "/contacto",
  brands: "/marcas",
  offers: "/ofertas",
  catalog: {
    root: "/catalogo",
    // Función para categorías (ej: /catalogo/bicicletas)
    category: (slug: string) => `/catalogo/${slug}`,
    // Función para subcategorías (ej: /catalogo/bicicletas/mtb)
    subcategory: (category: string, subcategory: string) =>
      `/catalogo/${category}/${subcategory}`,
  },

  product: {
    details: (slug: string | number) => `/catalogo/${slug}`,
  },

  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot",
    account: "/account",
  },
  // Rutas de carrito/checkout
  checkout: {
    cart: "/carrito",
    process: "/checkout",
    success: "/checkout/success",
  },
};
