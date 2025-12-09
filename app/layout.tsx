import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bkchome.es";
const PHONE = "+34617476695";
const WHATSAPP = "https://wa.me/34617476695";

// Pixel (fallback para test si env var no entra)
const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "2053101328796781";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BKC Home - Inmobiliaria en Alcorcón y zona sur",
    template: "%s | BKC Home",
  },
  description:
    "BKC Home, tu inmobiliaria en Alcorcón y zona sur de Madrid. Te ayudamos a vender, comprar y financiar tu vivienda con un trato cercano y transparente.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "BKC Home - Inmobiliaria en Alcorcón y zona sur",
    description:
      "Vende o compra con tranquilidad. Valoración, marketing, negociación y notaría. También te ayudamos con la hipoteca si lo necesitas.",
    siteName: "BKC Home",
    locale: "es_ES",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* META PIXEL (en body para evitar líos de head en App Router) */}
        {META_PIXEL_ID ? (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${META_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}

        {/* CABECERA */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <a href="/" className="text-lg font-semibold tracking-tight">
              <span className="text-slate-900">BKC</span>{" "}
              <span className="text-slate-500">Home</span>
            </a>

            {/* NAV DESKTOP */}
            <nav className="hidden md:flex items-center gap-5 text-sm text-slate-600">
              <a href="/vender" className="hover:text-slate-900">
                Vender
              </a>
              <a href="/comprar" className="hover:text-slate-900">
                Comprar
              </a>
              <a
                href="https://hipotecasbkc.es"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 font-semibold"
              >
                Hipotecas
              </a>
              <a href="/quienes-somos" className="hover:text-slate-900">
                Quiénes somos
              </a>
              <a href="/contacto" className="hover:text-slate-900">
                Contacto
              </a>
            </nav>

            {/* CTA DESKTOP */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${PHONE}`}
                className="px-3 py-2 rounded-full border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
              >
                📞 Llamar
              </a>
              <a
                href={WHATSAPP}
                className="px-3 py-2 rounded-full border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
              >
                💬 WhatsApp
              </a>
              <a
                href="/valora-tu-vivienda"
                className="px-4 py-2 rounded-full bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
              >
                Valora tu vivienda
              </a>
            </div>

            {/* NAV MÓVIL (sin JS) */}
            <details className="md:hidden relative">
              <summary className="list-none cursor-pointer px-3 py-2 rounded-xl border border-slate-200 text-sm">
                ☰ Menú
              </summary>
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-lg p-2 text-sm">
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                  href="/vender"
                >
                  Vender
                </a>
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                  href="/comprar"
                >
                  Comprar
                </a>
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold"
                  href="https://hipotecasbkc.es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hipotecas
                </a>
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                  href="/valora-tu-vivienda"
                >
                  Valora tu vivienda
                </a>
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                  href="/quienes-somos"
                >
                  Quiénes somos
                </a>
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                  href="/contacto"
                >
                  Contacto
                </a>
                <div className="h-px bg-slate-200 my-2" />
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                  href={`tel:${PHONE}`}
                >
                  📞 Llamar
                </a>
                <a
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                  href={WHATSAPP}
                >
                  💬 WhatsApp
                </a>
              </div>
            </details>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="min-h-[60vh]">{children}</div>

        {/* CTA flotante global */}
        <a
          href={WHATSAPP}
          className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold flex items-center gap-2 shadow-lg hover:bg-slate-50"
        >
          💬 WhatsApp
        </a>
