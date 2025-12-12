import { Metadata } from "next";
import AuthForm from "@/features/auth/AuthForm";

export const metadata: Metadata = {
  title: "Crear Cuenta | APEX",
  description: "Únete a la comunidad APEX.",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <AuthForm view="register" />
    </div>
  );
}