export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-16 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Texto principal */}
        <div className="space-y-5">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
            Inmobiliaria · Alcorcón y zona sur
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
            Tu vivienda, en manos de una inmobiliaria
            <span className="block text-slate-600">
              que te acompaña en todo el proceso.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-600">
            Te ayudamos a vender y comprar vivienda con un trato cercano y
            transparente.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/valora-tu-vivienda"
              className="px-5 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
            >
              Quiero vender mi vivienda
            </a>
            <a
              href="/comprar"
              className="px-5 py-3 rounded-full border border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-900 transition"
            >
              Estoy buscando casa
            </a>
          </div>
        </div>

        {/* Bloque de imagen (luego pondremos foto real) */}
        <div className="w-full max-w-md md:justify-self-end mx-auto">
          <div className="aspect-[4/3] rounded-3xl bg-slate-200 border border-slate-200 overflow-hidden">
            {/* Aquí más adelante irá una imagen de una vivienda / tu oficina */}
          </div>
        </div>
      </section>

      {/* 3 SERVICIOS */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid gap-6 md:grid-cols-3">
          {/* VENDER */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200" />
              <h2 className="text-lg font-semibold text-slate-900">
                Quiero vender
              </h2>
              <p className="text-sm text-slate-600">
                Valoramos tu vivienda y te acompañamos hasta la firma en
                notaría.
              </p>
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
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200" />
              <h2 className="text-lg font-semibold text-slate-900">
                Quiero comprar
              </h2>
              <p className="text-sm text-slate-600">
                Te ayudamos a encontrar la vivienda adecuada sin perder tiempo.
              </p>
            </div>
            <a
              href="/comprar"
              className="mt-4 inline-flex justify-center px-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-slate-900 transition"
            >
              Ver servicio para compradores
            </a>
          </div>

          {/* HIPOTECAS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200" />
              <h2 className="text-lg font-semibold text-slate-900">
                Necesito hipoteca
              </h2>
              <p className="text-sm text-slate-600">
                Estudio de financiación y acompañamiento hasta la firma.
              </p>
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

      {/* QUIÉNES SOMOS (MUY CORTO) */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-center">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Quién está detrás de BKC Home
            </h2>
            <p className="text-sm text-slate-600">
              BKC Home nace con un objetivo sencillo: ayudarte a tomar buenas
              decisiones con tu vivienda, hablando claro y acompañándote en todo
              el proceso, desde la primera visita hasta la entrega de llaves.
            </p>
          </div>
          <div className="w-full max-w-xs mx-auto">
            <div className="aspect-[3/4] rounded-3xl bg-slate-100 border border-slate-200" />
            {/* Aquí podremos poner una foto tuya o de la oficina */}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            ¿Quieres que hablemos de tu vivienda?
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Cuéntanos si quieres vender o comprar, y vemos contigo qué opciones
            reales tienes ahora mismo.
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
