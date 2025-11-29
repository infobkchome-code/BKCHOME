export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-16 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Texto principal */}
        <div className="space-y-6">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
            Inmobiliaria · Alcorcón y zona sur
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
            Tu vivienda, en manos de una inmobiliaria
            <span className="block text-slate-600">
              que te habla claro y te acompaña en todo el proceso.
            </span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base max-w-xl">
            En BKC Home te ayudamos a vender, comprar y financiar tu vivienda
            con cercanía, transparencia y un servicio adaptado a tu situación.
            Principalmente trabajamos en Alcorcón, Móstoles, Arroyomolinos y
            zona sur de Madrid.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/valora-tu-vivienda"
              className="px-5 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
            >
              Valorar mi vivienda gratis
            </a>
            <a
              href="/comprar"
              className="px-5 py-3 rounded-full border border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-900 transition"
            >
              Estoy buscando casa
            </a>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 rounded-full border border-slate-200">
              Especialistas en viviendas de 200.000 € a 600.000 €
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-200">
              Oficina en Alcorcón
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-200">
              Te acompañamos hasta la entrega de llaves
            </span>
          </div>
        </div>

        {/* Tarjeta lateral */}
        <div className="md:justify-self-end w-full max-w-md mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              ¿Quieres saber cuánto podría valer tu vivienda?
            </h2>
            <p className="text-sm text-slate-600">
              Te damos una estimación de precio orientativa según la zona y
              características de tu vivienda, y si lo deseas, hablamos contigo
              para explicarte cómo conseguir ese precio.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Zona / barrio
                </label>
                <input
                  type="text"
                  placeholder="Ej. Alcorcón – Parque Lisboa"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="Tu número para que te llamemos"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
              <button className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
                Quiero que me llaméis
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Sin compromiso. Solo te explicamos qué precio es realista para tu
              vivienda en este momento.
            </p>
          </div>
        </div>
      </section>

      {/* BLOQUE SERVICIOS */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">
          ¿En qué punto estás ahora mismo?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* VENDER */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">
                Quiero vender mi vivienda
              </h3>
              <p className="text-sm text-slate-600">
                Analizamos el mercado, fijamos un precio realista y te
                acompañamos en todo el proceso: visitas, negociación, contrato y
                notaría.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Estudio de precio según mercado real</li>
                <li>• Plan de difusión y filtro de compradores</li>
                <li>• Acompañamiento hasta la firma</li>
              </ul>
            </div>
            <a
              href="/valora-tu-vivienda"
              className="mt-4 inline-flex justify-center px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition"
            >
              Valorar mi vivienda
            </a>
          </div>

          {/* COMPRAR */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">
                Estoy buscando casa
              </h3>
              <p className="text-sm text-slate-600">
                Te ayudamos a encontrar la vivienda adecuada para tu presupuesto
                y tu momento vital, evitando visitas y opciones que no encajan.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Búsqueda activa según tus criterios</li>
                <li>• Selección de inmuebles y agenda de visitas</li>
                <li>• Asesoramiento en ofertas y contratos</li>
              </ul>
            </div>
            <a
              href="/comprar"
              className="mt-4 inline-flex justify-center px-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-slate-900 transition"
            >
              Quiero que me ayudéis a comprar
            </a>
          </div>

          {/* HIPOTECAS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">
                Necesito hipoteca
              </h3>
              <p className="text-sm text-slate-600">
                A través de BKC Hipotecas estudiamos tu caso, comparamos
                entidades y te ayudamos a entender las condiciones antes de
                firmar.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Estudio de viabilidad sin compromiso</li>
                <li>• Comparativa de varias entidades</li>
                <li>• Acompañamiento hasta la firma en notaría</li>
              </ul>
            </div>
            <a
              href="/hipotecas"
              className="mt-4 inline-flex justify-center px-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-slate-900 transition"
            >
              Ver servicio de hipotecas
            </a>
          </div>
        </div>
      </section>

      {/* BLOQUE CÓMO TRABAJAMOS */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Así trabajamos contigo
            </h2>
            <p className="text-sm text-slate-600">
              Nuestro objetivo es que entiendas cada paso del proceso y que
              tomes decisiones con información, no con prisas ni presiones.
            </p>
            <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
              <li>Hablamos contigo y entendemos tu situación.</li>
              <li>Analizamos el mercado y vemos qué opciones hay.</li>
              <li>Definimos un plan de acción claro.</li>
              <li>Te acompañamos en visitas, negociación y documentos.</li>
              <li>Te acompañamos hasta la entrega de llaves.</li>
            </ol>
          </div>

          <div className="space-y-4 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-medium text-slate-900 mb-1">
                Conocimiento real de la zona
              </p>
              <p className="text-xs text-slate-600">
                Trabajamos principalmente en Alcorcón y zona sur de Madrid, lo
                que nos permite darte precios y tiempos de venta ajustados a la
                realidad del mercado.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-medium text-slate-900 mb-1">
                Un solo equipo para todo el proceso
              </p>
              <p className="text-xs text-slate-600">
                Venta, compra e hipoteca bajo el mismo paraguas. Menos
                quebraderos de cabeza y mejor coordinación en cada paso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            ¿Hablamos de tu caso?
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Cuéntanos si quieres vender, comprar o necesitas hipoteca y vemos
            contigo qué opciones reales tienes ahora mismo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/valora-tu-vivienda"
              className="px-5 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
            >
              Empezar valorando mi vivienda
            </a>
            <a
              href="mailto:info@bkchome.es"
              className="px-5 py-3 rounded-full border border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-900 transition"
            >
              Escribir a info@bkchome.es
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
