import LeadForm from "./components/LeadForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-start">
          {/* Texto */}
          <div className="space-y-5">
            <p className="text-xs font-medium tracking-[0.25em] text-slate-500 uppercase">
              Inmobiliaria · Alcorcón y zona sur
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
              Vende tu vivienda
              <span className="block text-emerald-700 mt-1">
                con una inmobiliaria que te habla claro.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-xl">
              Valoración realista, marketing, visitas, negociación y notaría. Si el comprador necesita
              financiación, también le orientamos (sin mezclar marcas).
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              <li>✅ Valoración según mercado real de tu zona.</li>
              <li>✅ Anuncio optimizado + filtro de interesados.</li>
              <li>✅ Coordinación completa hasta notaría.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/valora-tu-vivienda"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
              >
                🧮 Valorar mi vivienda
              </a>
              <a
                href="https://wa.me/34617476695"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-300 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                💬 Hablar por WhatsApp
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Sin compromiso. Te explicamos el plan y tú decides.
            </p>
          </div>

          {/* Lead Form reutilizable (conecta a /api/leads) */}
          <LeadForm
            source="home"
            title="Cuéntanos tu caso"
            subtitle="Déjanos tus datos y te llamamos para una valoración/estrategia sin compromiso."
          />
        </div>
      </section>

      {/* CINTA DE CONFIANZA */}
      <section className="border-b border-slate-200 bg-slate-100/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-3 items-center justify-between">
          <p className="text-xs text-slate-600">
            📍 Oficina en Alcorcón · Nos movemos por toda la zona sur de Madrid
          </p>
          <p className="text-xs text-slate-600">
            🎯 Especialistas en propietarios que quieren vender para comprar otra vivienda
          </p>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-8">
        <div className="max-w-xl space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            ¿Cómo trabajamos tu venta en BKC Home?
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            No es solo publicar. Hacemos un plan completo para vender con seguridad, al mejor precio
            posible y sin sustos en notaría.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">1. Valoración y estrategia</h3>
            <p className="text-xs text-slate-600">
              Analizamos vivienda, zona y tiempos. Te damos un precio realista y una estrategia clara.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">
              2. Marketing y selección de compradores
            </h3>
            <p className="text-xs text-slate-600">
              Presentación cuidada, anuncio optimizado y filtro de interesados para ahorrar tiempo.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">
              3. Negociación y notaría
            </h3>
            <p className="text-xs text-slate-600">
              Negociación, arras y coordinación con notaría para firmar con tranquilidad.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            ¿Vas a vender en los próximos meses?
          </h2>
          <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto">
            Hablemos 15 minutos. Te damos una visión real de precio y estrategia para vender bien.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/valora-tu-vivienda"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
            >
              🧮 Valorar mi vivienda
            </a>
            <a
              href="tel:+34617476695"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-300 text-sm font-medium text-slate-800 hover:bg-white"
            >
              📞 Prefiero llamada
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
