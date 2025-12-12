import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const SellBikeSchema = z.object({
  // Paso 1: Datos de la bici
  brand: z.string().min(2, "La marca es obligatoria"),
  model: z.string().min(2, "El modelo es obligatorio"),
  year: z.string().regex(/^\d{4}$/, "Ingresa un año válido (ej: 2021)"),

  type: z.enum(["mtb", "ruta", "urbana", "otra"] as const, {
    error: () => ({ message: "Selecciona el tipo de bicicleta" }),
  }),

  // Paso 2: Estado
  condition: z.enum(
    ["excelente", "bueno", "regular", "para-reparar"] as const,
    {
      error: () => ({ message: "El estado es obligatorio" }),
    }
  ),

  description: z.string().optional(),

  // Paso 3: Contacto
  name: z.string().min(3, "Tu nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono obligatorio"),

  // Intención (Vender o Canjear)
  intent: z.enum(["venta", "canje"] as const, {
    error: () => ({ message: "Selecciona qué quieres hacer" }),
  }),

  image: z
    .any()
    .refine((file) => file instanceof File, "La foto es obligatoria")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño máximo es 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Solo se aceptan formatos .jpg, .jpeg, .png y .webp"
    ),
});

export type SellBikeFormValues = z.infer<typeof SellBikeSchema>;
