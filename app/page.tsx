"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ...tu contenido de la home, incluido el formulario con onSubmit... */}
    </main>
  );
}
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
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
              En BKC Home te ayudamos a vender o comprar tu vivienda en Alcorcón y zona sur de
              Madrid, acompañándote en todo: valoración, marketing, visitas, negociación, firma
              y financiación si la necesitas.
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              <li>✅ Valoración realista según mercado actual en tu zona.</li>
              <li>✅ Difusión profesional en portales y base de datos de compradores.</li>
              <li>✅ Te ayudamos también con la hipoteca, si eres comprador.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/valora-tu-vivienda"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
              >
                🧮 Valorar mi vivienda online
              </a>
              <a
                href="https://wa.me/34617476695"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-300 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                💬 Hablar por WhatsApp
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Sin compromiso. Te explicamos todo el proceso y tú decides.
            </p>
          </div>

          {/* Formulario lead rápido */}
          <div className="bg-slate-900 text-slate-50 rounded-3xl p-5 md:p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              Cuéntanos qué quieres hacer con tu vivienda
            </h2>
            <p className="text-xs text-slate-300 mb-4">
              Déjanos tus datos y te llamamos para una valoración y estrategia de venta sin
              compromiso.
            </p>

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Aquí conectaremos este formulario con tu CRM / Supabase o con un email. De momento es solo demo."
                );
              }}
            >
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Nombre y apellidos
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ej. María López"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Teléfono</label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ej. 600 000 000"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Localidad / zona de la vivienda
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ej. Alcorcón – Parque Lisboa"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">¿Qué necesitas?</label>
                <select
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  defaultValue="vender"
                >
                  <option value="vender">Quiero vender mi vivienda</option>
                  <option value="comprar">Quiero comprar vivienda</option>
                  <option value="ambas">Estoy entre vender y comprar</option>
                  <option value="hipoteca">Solo asesoramiento de hipoteca</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-900 text-sm font-semibold hover:bg-emerald-400 transition"
              >
                Me llamáis para verlo
              </button>

            <p className="text-[10px] text-slate-400 mt-2">
              Al enviar aceptas que te contactemos para informarte sobre la venta o compra de tu
              vivienda. Podrás ejercer tus derechos de protección de datos cuando quieras.
            </p>
            </form>
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
            No se trata solo de publicar tu vivienda en internet. Hacemos un plan completo para
            que vendas con seguridad, al mejor precio posible y sin sorpresas en la notaría.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">1. Valoración y estrategia</h3>
            <p className="text-xs text-slate-600">
              Analizamos tu vivienda, la zona y los tiempos que manejas. Te explicamos qué precio
              tiene sentido hoy y qué estrategia seguir (rápida, máxima rentabilidad, cambio de
              vivienda…).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">
              2. Marketing y selección de compradores
            </h3>
            <p className="text-xs text-slate-600">
              Fotos, anuncio optimizado y filtrado de interesados para que no pierdas tiempo con
              visitas que no encajan o no tienen financiación.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">
              3. Negociación, hipoteca y notaría
            </h3>
            <p className="text-xs text-slate-600">
              Negociamos por ti, coordinamos con bancos y notaría, revisamos arras y escritura
              para que firmes tranquilo, sabiendo cuánto cobras y cuándo.
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE PROPIETARIOS / COMPRADORES */}
      <section className="max-w-6xl mx-auto px-4 pb-12 md:pb-16 grid gap-8 md:grid-cols-2">
        {/* Propietarios */}
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Si eres propietario</h2>
          <p className="text-sm text-slate-700">
            Te ayudamos a vender tu vivienda actual y a enlazar la operación con la compra de tu
            próxima casa, coordinando plazos, hipoteca y todo el papeleo.
          </p>
          <ul className="text-xs text-slate-700 space-y-1">
            <li>• Valoración gratuita y sin compromiso.</li>
            <li>• Análisis de compradores reales interesados en tu zona.</li>
            <li>• Estrategia para vender y comprar sin quedarte “en el aire”.</li>
          </ul>
          <a
            href="/valora-tu-vivienda"
            className="inline-flex mt-2 text-xs font-semibold text-emerald-800 hover:underline"
          >
            Quiero valorar mi vivienda →
          </a>
        </div>

        {/* Compradores */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Si buscas vivienda</h2>
          <p className="text-sm text-slate-700">
            Te acompañamos como inmobiliaria y como asesores hipotecarios: revisamos opciones,
            negociamos y buscamos la mejor financiación disponible para tu perfil.
          </p>
          <ul className="text-xs text-slate-700 space-y-1">
            <li>• Te explicamos qué puedes comprar con tu capacidad real.</li>
            <li>• Te avisamos de oportunidades que encajan contigo.</li>
            <li>• Te ayudamos a comparar hipotecas y condiciones.</li>
          </ul>
          <a
            href="https://wa.me/34617476695"
            className="inline-flex mt-2 text-xs font-semibold text-slate-900 hover:underline"
          >
            Quiero que me orientéis por WhatsApp →
          </a>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            ¿Vas a vender o cambiar de vivienda en los próximos meses?
          </h2>
          <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto">
            Hablemos 15 minutos. Te damos una visión real de por cuánto podrías vender tu
            vivienda y qué opciones de compra y financiación tienes ahora mismo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/valora-tu-vivienda"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
            >
              🧮 Quiero una valoración orientativa
            </a>
            <a
              href="tel:+34617476695"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-300 text-sm font-medium text-slate-800 hover:bg-white"
            >
              📞 Prefiero que me llaméis
            </a>
          </div>
        </div>
      </section>

      {/* BOTÓN FLOTANTE VALORACIÓN */}
      <a
        href="/valora-tu-vivienda"
        className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-lg hover:bg-emerald-800 transition"
      >
        🧮 Saber cuánto vale mi casa
      </a>
    </main>
  );
}
