import "./globals.css";

export const metadata = {
  title: "EcomStore - Tienda de Tecnología",
  description:
    "Descubre los mejores productos de tecnología en EcomStore. Calidad, innovación y los mejores precios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
