import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pitch, Roll y Yaw — Visualizador 3D",
  description:
    "Visualizador interactivo de los tres ejes de rotación de un avión: Cabeceo, Alabeo y Guiñada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-900">{children}</body>
    </html>
  );
}
