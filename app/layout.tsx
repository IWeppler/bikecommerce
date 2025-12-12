import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/shared/components/Navbar/TopBar";
import Navbar from "@/shared/components/Navbar/Navbar";
import Footer from "@/shared/components/Footer";
import CartSidebar from "@/features/cart/CartSidebar";

export const metadata: Metadata = {
  title: "Apex Bikes | Rendimiento en Movimiento",
  description: "La mejor tienda de bicicletas de Tostado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=epilogue@400,500,600,700,800,900&f[]=manrope@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-manrope antialiased bg-background text-foreground">
        <TopBar />
        <Navbar />
        <CartSidebar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
