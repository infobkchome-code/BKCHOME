import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "BKC Home - Inmobiliaria en Alcorcón",
  description:
    "BKC Home, tu inmobiliaria en Alcorcón y zona sur de Madrid. Te ayudamos a vender, comprar y financiar tu vivienda.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {/* CABECERA */}
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-400">BKC</span>{" "}
              <span className="text-slate-100">Home</span>
            </a>

            <nav className="flex gap-4 text-sm text-slate-300">
              <a href="/vender" className="hover:text-emerald-400">
                Vender
              </a>
              <a href="/comprar" className="hover:text-emerald-400">
                Comprar
              </a>
              <a href="/hipotecas" className="hover:text-emerald-400">
                Hipotecas
              </a>
              <a
                href="/valora-tu-vivienda"
                className="px-3 py-1 rounded-full border border-emerald-500 text-emerald-400 text-xs hover:bg-emerald-500/10"
              >
                Valora tu vivienda
              </a>
            </nav>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="mt-10 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500 flex justify-between gap-4 flex-wrap">
            <span>
              © {new Date().getFullYear()} BKC Home. Todos los derechos
              reservados.
            </span>
            <div className="flex gap-4">
              <a href="/aviso-legal" className="hover:text-emerald-400">
                Aviso legal
              </a>
              <a href="/privacidad" className="hover:text-emerald-400">
                Política de privacidad
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
