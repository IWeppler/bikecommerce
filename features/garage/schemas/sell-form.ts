import { z } from "zod";

export const SellBikeSchema = z.object({
  // Paso 1: Datos de la bici
  brand: z.string().min(2, "La marca es obligatoria"),
  model: z.string().min(2, "El modelo es obligatorio"),
  year: z.string().regex(/^\d{4}$/, "Ingresa un año válido (ej: 2021)"),

  // CORRECCIÓN 1: Agregamos 'as const' al array
  type: z.enum(["mtb", "ruta", "urbana", "otra"] as const, {
    error: () => ({ message: "Selecciona el tipo de bicicleta" }),
  }),

  // Paso 2: Estado
  // CORRECCIÓN 2: Agregamos 'as const' al array
  condition: z.enum(["excelente", "bueno", "regular", "para-reparar"] as const, {
    error: () => ({ message: "El estado es obligatorio" }),
  }),

  description: z.string().optional(),

  // Paso 3: Contacto
  name: z.string().min(3, "Tu nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono obligatorio"),

  // Intención (Vender o Canjear)
  // CORRECCIÓN 3: Agregamos 'as const' al array
  intent: z.enum(["venta", "canje"] as const, {
    error: () => ({ message: "Selecciona qué quieres hacer" }),
  }),
});

export type SellBikeFormValues = z.infer<typeof SellBikeSchema>;