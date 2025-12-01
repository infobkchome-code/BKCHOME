import "./globals.css";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "BKC Home · Inmobiliaria en Alcorcón y zona sur de Madrid",
  description:
    "BKC Home es tu inmobiliaria de confianza en Alcorcón y zona sur de Madrid. Te ayudamos a vender o comprar vivienda y a conseguir la mejor hipoteca para tu caso, con un trato cercano y transparente.",
  keywords: [
    "inmobiliaria Alcorcón",
    "vender piso Alcorcón",
    "comprar vivienda Alcorcón",
    "inmobiliaria zona sur Madrid",
    "BKC Home",
    "hipoteca Alcorcón",
  ],
  openGraph: {
    title: "BKC Home · Inmobiliaria en Alcorcón y zona sur",
    description:
      "Vende o compra tu vivienda en Alcorcón y zona sur con una inmobiliaria que te habla claro. Valoración sin compromiso y acompañamiento completo hasta la notaría.",
    type: "website",
    locale: "es_ES",
    siteName: "BKC Home",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* CABECERA */}
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
            <a href="/" className="text-lg font-semibold tracking-tight">
              <span className="text-slate-900">BKC</span>{" "}
              <span className="text-slate-500">Home</span>
            </a>

            <nav className="hidden md:flex gap-5 text-sm text-slate-600">
              <a href="/vender" className="hover:text-slate-900">
                Vender
              </a>
              <a href="/comprar" className="hover:text-slate-900">
                Comprar
              </a>
              <a href="/hipotecas" className="hover:text-slate-900">
                Hipotecas
              </a>
              <a href="/quienes-somos" className="hover:text-slate-900">
                Quiénes somos
              </a>
              <a href="/contacto" className="hover:text-slate-900">
                Contacto
              </a>
            </nav>

            <a
              href="/valora-tu-vivienda"
              className="hidden md:inline-flex px-4 py-2 rounded-full border border-slate-800 text-sm font-medium text-slate-800 hover:bg-slate-900 hover:text-white transition"
            >
              Valora tu vivienda
            </a>
          </div>
        </header>

        {/* CONTENIDO */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} BKC Home. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              <a href="/aviso-legal" className="hover:text-slate-800">
                Aviso legal
              </a>
              <a href="/privacidad" className="hover:text-slate-800">
                Política de privacidad
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
