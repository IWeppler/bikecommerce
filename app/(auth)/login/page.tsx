import { Metadata } from "next";
import AuthForm from "@/features/auth/AuthForm";

export const metadata: Metadata = {
  title: "Iniciar Sesión | APEX",
  description: "Accede a tu cuenta para gestionar tus pedidos.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <AuthForm view="login" />
    </div>
  );
}