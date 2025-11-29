export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 relative">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-16 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Texto principal */}
        <div className="space-y-5">
          <p className="text-xs font-medium tracking-[0.25em] text-slate-500 uppercase">
            Inmobiliaria · Alcorcón y zona sur
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
            🏡 Vende o compra tu vivienda
            <span className="block text-emerald-700 mt-1">
              con una inmobiliaria que te habla claro.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 max-w-xl">
            BKC Home te acompaña en todo el proceso: valoración realista,
            visitas filtradas, negociación, hipoteca y firma en notaría.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/valora-tu-vivienda"
              className="px-5 py-3 rounded-full bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition flex items-center gap-2"
            >
              🧮 Quiero saber cuánto vale mi vivienda
            </a>
            <a
              href="/comprar"
              className="px-5 py-3 rounded-full border border-slate-300 text-sm font-medium text-slate-700 hover:border-emerald-700 hover:text-emerald-800 transition"
            >
              🔍 Estoy buscando casa
            </a>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 rounded-full border border-slate-200">
              📍 Especialistas en Alcorcón y zona sur
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-200">
              ✅ Acompañamiento hasta la entrega de llaves
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-200">
              💶 Viviendas entre 200.000 € y 600.000 €
            </span>
          </div>
        </div>

        {/* Bloque de imagen (luego metemos foto real) */}
        <div className="w-full max-w-md md:justify-self-end mx-auto">
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-500 relative overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-4 rounded-3xl bg-white/90 backdrop-blur-sm border border-white/60 flex flex-col items-start justify-center px-5 space-y-2">
              <p className="text-xs font-medium text-emerald-800 uppercase">
                Gancho para tus anuncios
              </p>
              <p className="text-base font-semibold text-slate-900">
                “Te decimos cuánto podrías vender tu casa
                <span className="block">y cómo conseguirlo.”</span>
              </p>
              <p className="text-xs text-slate-600">
                Ideal para campañas en Meta / Google: tráfico directo a tu
                valorador.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 SERVICIOS */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid gap-6 md:grid-cols-3">
          {/* VENDER */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-lg">
                🏠
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                Quiero vender
              </h2>
              <p className="text-sm text-slate-600">
                Valoración realista y plan para vender sin malvender ni alargar
                el proceso.
              </p>
            </div>
            <a
              href="/valora-tu-vivienda"
              className="mt-4 inline-flex justify-center px-4 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition"
            >
              🧮 Valorar mi vivienda
            </a>
          </div>

          {/* COMPRAR */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-lg">
                🔑
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                Quiero comprar
              </h2>
              <p className="text-sm text-slate-600">
                Filtramos viviendas, organizamos visitas y te ayudamos a saber
                cuándo una casa realmente te conviene.
              </p>
            </div>
            <a
              href="/comprar"
              className="mt-4 inline-flex justify-center px-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-emerald-700 hover:text-emerald-800 transition"
            >
              Ver servicio para compradores
            </a>
          </div>

          {/* HIPOTECAS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-lg">
                💶
              </div>
              <h2 className="text-lg font-semibold text-slate-900">
                Necesito hipoteca
              </h2>
              <p className="text-sm text-slate-600">
                Estudio de financiación y acompañamiento hasta la firma con BKC
                Hipotecas.
              </p>
            </div>
            <a
              href="/hipotecas"
              className="mt-4 inline-flex justify-center px-4 py-2.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:border-emerald-700 hover:text-emerald-800 transition"
            >
              Ver servicio de hipotecas
            </a>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS (CORTO) */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-center">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Quién está detrás de BKC Home 💬
            </h2>
            <p className="text-sm text-slate-600">
              BKC Home nace con una idea clara: que vender o comprar vivienda
              no tenga que ser un caos. Te explicamos los pasos, las opciones y
              las consecuencias de cada decisión.
            </p>
            <p className="text-sm text-slate-600">
              Nos centramos en Alcorcón y zona sur para darte información de
              mercado real, no teorías.
            </p>
          </div>
          <div className="w-full max-w-xs mx-auto">
            <div className="aspect-[3/4] rounded-3xl bg-slate-100 border border-slate-200" />
            {/* Aquí luego pondremos una foto tuya / de la oficina */}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            ¿Quieres que veamos cuánto podrías sacar por tu vivienda?
          </h2>
          <p className="text-sm md:text-base text-slate-700 max-w-2xl mx-auto">
            Sin compromiso, sin exclusivas raras. Te damos una estimación y, si
            te encaja, te explicamos cómo plantear la venta para conseguir ese
            precio.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/valora-tu-vivienda"
              className="px-5 py-3 rounded-full bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition flex items-center gap-2"
            >
              🧮 Empezar valorando mi vivienda
            </a>
            <a
              href="mailto:info@bkchome.es"
              className="px-5 py-3 rounded-full border border-emerald-200 text-sm font-medium text-emerald-800 hover:border-emerald-700 transition"
            >
              ✉️ Escribir a info@bkchome.es
            </a>
          </div>
        </div>
      </section>

      {/* BOTÓN FLOTANTE / PESTAÑA PARA VALORADOR */}
      <a
        href="/valora-tu-vivienda"
        className="fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-full shadow-lg bg-emerald-700 text-white text-xs md:text-sm font-semibold flex items-center gap-2 hover:bg-emerald-800 transition"
      >
        🧮 Saber cuánto vale mi casa
      </a>
    </main>
  );
}
