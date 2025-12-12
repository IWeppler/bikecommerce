"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SellBikeSchema,
  SellBikeFormValues,
} from "@/features/garage/schemas/sell-form";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  DollarSign,
  RefreshCw,
  UploadCloud,
} from "lucide-react";
import { ImageUpload } from "@/shared/ui/image-upload";

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<SellBikeFormValues>({
    resolver: zodResolver(SellBikeSchema),
    defaultValues: {
      intent: "venta",
      type: "mtb",
      condition: "bueno",
    },
  });

  const selectedIntent = watch("intent");
  const selectedCondition = watch("condition");

  const onSubmit = async (data: SellBikeFormValues) => {
    setIsSubmitting(true);
    // Simular envío a tu backend/API
    console.log("Datos del formulario:", data);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  if (isSuccess) {
    return <SuccessView />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HERO / HEADER */}
      <div className="bg-black text-white py-16 md:py-24 px-4 text-center">
        <h1 className="font-epilogue font-bold text-4xl md:text-6xl uppercase tracking-tighter mb-6">
          Vendé tu bici <span className="text-blood">rápido y seguro</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-manrope text-lg">
          Olvidate de las fotos malas, los regateos incómodos y los encuentros
          con extraños. En <span className="text-white font-bold">APEX</span> la
          compramos nosotros.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 mb-20 relative z-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-gray-200 shadow-2xl p-6 md:p-12 rounded-sm space-y-10"
        >
          {/* SECCIÓN 1: OBJETIVO */}
          <section>
            <h2 className="font-epilogue font-bold text-xl uppercase mb-6 flex items-center gap-2">
              1. ¿Qué quieres hacer?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                className={`border p-6 rounded-sm cursor-pointer transition-all flex flex-col gap-2
                ${
                  selectedIntent === "venta"
                    ? "border-blood bg-red-50/10 ring-1 ring-blood"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  value="venta"
                  {...register("intent")}
                  className="hidden"
                />
                <div className="flex justify-between items-center">
                  <span className="font-bold uppercase tracking-wider">
                    Venderla
                  </span>
                  <DollarSign
                    className={`w-5 h-5 ${
                      selectedIntent === "venta"
                        ? "text-blood"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Recibís el dinero en tu cuenta bancaria.
                </p>
              </label>

              <label
                className={`border p-6 rounded-sm cursor-pointer transition-all flex flex-col gap-2
                ${
                  selectedIntent === "canje"
                    ? "border-blood bg-red-50/10 ring-1 ring-blood"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  value="canje"
                  {...register("intent")}
                  className="hidden"
                />
                <div className="flex justify-between items-center">
                  <span className="font-bold uppercase tracking-wider">
                    Canjearla
                  </span>
                  <RefreshCw
                    className={`w-5 h-5 ${
                      selectedIntent === "canje"
                        ? "text-blood"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  La entregás como parte de pago de una nueva.
                </p>
              </label>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* SECCIÓN 2: LA BICI */}
          <section>
            <h2 className="font-epilogue font-bold text-xl uppercase mb-6">
              2. Datos de la bicicleta
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Marca
                </label>
                <input
                  {...register("brand")}
                  placeholder="Ej: Specialized"
                  className="w-full border-b border-gray-300 py-3 focus:border-blood outline-none bg-transparent"
                />
                {errors.brand && (
                  <span className="text-xs text-red-500">
                    {errors.brand.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Modelo
                </label>
                <input
                  {...register("model")}
                  placeholder="Ej: Allez Sport"
                  className="w-full border-b border-gray-300 py-3 focus:border-blood outline-none bg-transparent"
                />
                {errors.model && (
                  <span className="text-xs text-red-500">
                    {errors.model.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Año
                </label>
                <input
                  {...register("year")}
                  placeholder="Ej: 2021"
                  className="w-full border-b border-gray-300 py-3 focus:border-blood outline-none bg-transparent"
                />
                {errors.year && (
                  <span className="text-xs text-red-500">
                    {errors.year.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Tipo
                </label>
                <select
                  {...register("type")}
                  className="w-full border-b border-gray-300 py-3 focus:border-blood outline-none bg-transparent"
                >
                  <option value="mtb">Mountain Bike</option>
                  <option value="ruta">Ruta / Gravel</option>
                  <option value="urbana">Urbana</option>
                  <option value="otra">Otra</option>
                </select>
              </div>
            </div>

            {/* Selector de Condición Visual */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-gray-500">
                Estado general
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["excelente", "bueno", "regular", "para-reparar"].map(
                  (cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setValue("condition", cond as any)}
                      className={`p-3 border text-xs font-bold uppercase transition-all
                      ${
                        selectedCondition === cond
                          ? "bg-black text-white border-black"
                          : "border-gray-200 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {cond.replace("-", " ")}
                    </button>
                  )
                )}
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* SECCIÓN 3: FOTOS */}
          <section>
            <h2 className="font-epilogue font-bold text-xl uppercase mb-6 flex items-center justify-between">
              3. Fotos
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-normal normal-case">
                Foto principal (Lado transmisión)
              </span>
            </h2>

            {/* CONEXIÓN CON REACT HOOK FORM */}
            <Controller
              name="image"
              control={control} // Necesitas sacar 'control' del useForm abajo (*)
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <ImageUpload
                  onImageSelect={(file) => onChange(file)}
                  error={error?.message}
                />
              )}
            />
          </section>

          <hr className="border-gray-100" />

          {/* SECCIÓN 4: CONTACTO */}
          <section>
            <h2 className="font-epilogue font-bold text-xl uppercase mb-6">
              4. Tus Datos
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <input
                {...register("name")}
                placeholder="Nombre Completo"
                className="w-full border-b border-gray-300 py-3 focus:border-blood outline-none bg-transparent"
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    {...register("email")}
                    placeholder="Email"
                    type="email"
                    className="w-full border-b border-gray-300 py-3 focus:border-blood outline-none bg-transparent"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register("phone")}
                    placeholder="Teléfono / WhatsApp"
                    type="tel"
                    className="w-full border-b border-gray-300 py-3 focus:border-blood outline-none bg-transparent"
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-500">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blood text-white font-epilogue font-bold uppercase tracking-widest py-5 hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-xl flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Enviando..." : "Solicitar Cotización"}
            {!isSubmitting && <ChevronRight className="w-4 h-4" />}
          </button>

          <p className="text-center text-xs text-gray-400">
            Al enviar este formulario aceptás nuestros términos y condiciones de
            compra-venta de usados.
          </p>
        </form>
      </div>
    </div>
  );
}

// Vista de Éxito simple
function SuccessView() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="font-epilogue font-bold text-3xl uppercase mb-4">
          ¡Solicitud Recibida!
        </h1>
        <p className="text-gray-600 mb-8">
          Gracias por confiar en APEX. Nuestro equipo de tasación revisará tus
          datos y te contactará por WhatsApp o Email en las próximas 24 horas
          con una propuesta.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="text-blood font-bold uppercase text-xs hover:underline"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
