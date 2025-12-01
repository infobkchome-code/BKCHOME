import ValoradorVivienda from "./components/ValoradorVivienda";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO (limpio: sin tarjeta derecha + sin botón WhatsApp aquí) */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-medium tracking-[0.25em] text-slate-500 uppercase">
              Inmobiliaria · Alcorcón y zona sur
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
              Vende tu vivienda
              <span className="block text-emerald-700 mt-1">
                con una inmobiliaria que te habla claro.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-2xl">
              Valoración realista + marketing + filtro de interesados + acompañamiento hasta notaría.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                ✅ Sin compromiso
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                ✅ Zona sur (especialistas)
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700">
                ✅ Sin “inflar” precios
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#valorador"
                className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition"
              >
                🧮 Calcular cuánto vale mi casa (30s)
              </a>

              {/* WhatsApp sin botón (ya está en la barra) */}
              <a
                href="https://wa.me/34617476695"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 hover:underline"
              >
                Prefiero WhatsApp →
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Consejo: usa el valorador y si te encaja, lo afinamos con comparables reales.
            </p>
          </div>
        </div>
      </section>

      {/* CINTA DE CONFIANZA */}
      <section className="border-b border-slate-200 bg-slate-100/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-3 items-center justify-between">
          <p className="text-xs text-slate-600">
            📍 Oficina en Alcorcón · Nos movemos por toda la zona sur de Madrid
          </p>
          <p className="text-xs text-slate-600">
            🎯 Especialistas en propietarios que venden para comprar otra vivienda
          </p>
        </div>
      </section>

      {/* SECCIÓN VALORADOR (PROTAGONISTA) */}
      <section id="valorador" className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[1fr,1.1fr] md:items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.25em] text-emerald-800 uppercase">
              Herramienta gratuita
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Calcula cuánto puede valer tu vivienda (orientativo)
            </h2>

            <p className="text-sm text-slate-600">
              Úsalo como primera referencia. Si te encaja, te damos el precio realista de salida y la estrategia.
            </p>

            <ul className="text-sm text-slate-700 space-y-2">
              <li>✅ Evitas “publico y ya” → visitas filtradas.</li>
              <li>✅ Te decimos cómo vender para comprar sin quedarte en el aire.</li>
              <li>✅ Si quieres, lo afinamos con comparables reales.</li>
            </ul>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="/valora-tu-vivienda"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
              >
                Valoración avanzada →
              </a>
              <a
                href="https://wa.me/34617476695"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Enviarlo por WhatsApp
              </a>
            </div>
          </div>

          <ValoradorVivienda />
        </div>
      </section>

      {/* RESTO (igual que lo tenías) */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-8">
        <div className="max-w-xl space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            ¿Cómo trabajamos tu venta en BKC Home?
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Plan completo para vender con seguridad, al mejor precio posible y sin sorpresas en notaría.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">1. Valoración y estrategia</h3>
            <p className="text-xs text-slate-600">
              Analizamos tu vivienda, la zona y tus tiempos. Definimos precio y plan.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">2. Marketing y filtro</h3>
            <p className="text-xs text-slate-600">
              Anuncio optimizado, fotos cuidadas y filtro de interesados.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">3. Negociación y notaría</h3>
            <p className="text-xs text-slate-600">
              Negociamos por ti, revisamos arras y coordinamos la firma.
            </p>
          </div>
        </div>
      </section>

      {/* Botón flotante */}
      <a
        href="#valorador"
        className="fixed bottom-4 right-4 z-40 px-4 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-lg hover:bg-emerald-800 transition"
      >
        🧮 Saber cuánto vale mi casa
      </a>
    </main>
  );
}
