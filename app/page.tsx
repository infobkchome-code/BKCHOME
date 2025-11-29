export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-16 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Inmobiliaria en Alcorcón
            <span className="block text-emerald-400 mt-1">
              BKC Home, tu casa en buenas manos.
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg">
            Te ayudamos a vender, comprar y financiar tu vivienda en Alcorcón
            y zona sur de Madrid, con un acompañamiento cercano, transparente
            y 100% a medida.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/valora-tu-vivienda"
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-sm md:text-base font-medium transition"
            >
              Valorar mi vivienda gratis
            </a>
            <a
              href="/comprar"
              className="px-5 py-3 rounded-2xl border border-slate-700 hover:border-emerald-400 text-sm md:text-base transition"
            >
              Quiero comprar vivienda
            </a>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full border border-slate-700">
              Especialistas en Alcorcón y zona sur
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-700">
              Acompañamiento hasta la entrega de llaves
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-700">
              Servicio de broker hipotecario propio
            </span>
          </div>
        </div>

        {/* LADO DERECHO – TARJETA DESTACADA */}
        <div className="md:justify-self-end w-full max-w-md mx-auto">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold mb-1">
              ¿Estás pensando en vender?
            </h2>
            <p className="text-sm text-slate-300">
              Te decimos cuánto podrías sacar por tu vivienda según operaciones
              reales en la zona y te explicamos cómo conseguirlo.
            </p>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Estudio de precio realista, no de portal</li>
              <li>• Plan de marketing y filtrado de compradores</li>
              <li>• Negociación, hipoteca y notaría incluidas</li>
            </ul>
            <a
              href="/valora-tu-vivienda"
              className="mt-3 inline-flex justify-center px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-sm font-medium transition w-full"
            >
              Quiero saber cuánto vale mi casa
            </a>
          </div>
        </div>
      </section>

      {/* BLOQUE 3 SERVICIOS */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          ¿En qué punto estás ahora mismo?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* PROPIETARIO */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Soy propietario y quiero vender</h3>
              <p className="text-sm text-slate-300">
                Valoramos tu vivienda, definimos el precio de salida y nos
                encargamos de todo el proceso hasta la firma en notaría.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Estudio de mercado y precio objetivo</li>
                <li>• Reportaje y difusión en portales</li>
                <li>• Filtro de visitas y negociación</li>
              </ul>
            </div>
            <a
              href="/valora-tu-vivienda"
              className="mt-4 inline-flex justify-center px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-xs font-medium transition"
            >
              Valorar mi vivienda
            </a>
          </div>

          {/* COMPRADOR */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quiero comprar vivienda</h3>
              <p className="text-sm text-slate-300">
                Te ayudamos a encontrar la casa adecuada, comparar opciones y
                negociar el mejor precio, evitando visitas y pisos que no encajan.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Búsqueda activa según tus criterios</li>
                <li>• Selección de inmuebles y agenda de visitas</li>
                <li>• Análisis, oferta y acompañamiento legal</li>
              </ul>
            </div>
            <a
              href="/comprar"
              className="mt-4 inline-flex justify-center px-4 py-2 rounded-2xl border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 text-xs font-medium transition"
            >
              Quiero que me ayudéis a comprar
            </a>
          </div>

          {/* HIPOTECAS */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Necesito hipoteca</h3>
              <p className="text-sm text-slate-300">
                Servicio de broker hipotecario: comparamos bancos por ti, te
                explicamos las condiciones y te acompañamos hasta la firma.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Estudio gratuito de viabilidad</li>
                <li>• Comparativa de varias entidades</li>
                <li>• Acompañamiento durante todo el proceso</li>
              </ul>
            </div>
            <a
              href="/hipotecas"
              className="mt-4 inline-flex justify-center px-4 py-2 rounded-2xl border border-slate-700 hover:border-emerald-500 text-xs font-medium transition"
            >
              Quiero un estudio hipotecario
            </a>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              Así trabajamos contigo
            </h2>
            <p className="text-sm text-slate-300">
              No creemos en procesos fríos ni impersonales. Hablamos contigo,
              entendemos tu situación y diseñamos un plan claro para conseguir
              el resultado que buscas.
            </p>
            <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
              <li>Primera llamada o visita a la oficina para escuchar tu caso.</li>
              <li>Análisis de mercado y opciones reales según tu objetivo.</li>
              <li>Plan de acción claro, con tiempos y pasos definidos.</li>
              <li>Acompañamiento hasta la entrega de llaves.</li>
            </ol>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="font-medium mb-1">
                Oficina en Alcorcón, cerca de ti
              </p>
              <p className="text-xs text-slate-400">
                Trabajamos principalmente en Alcorcón y zona sur (Móstoles,
                Arroyomolinos, Madrid capital sur…), conociendo precios reales
                y tiempos de venta en cada barrio.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="font-medium mb-1">
                Un solo interlocutor para todo el proceso
              </p>
              <p className="text-xs text-slate-400">
                Ventas, compras, hipotecas y notaría bajo el mismo paraguas. Te
                lo ponemos fácil para que no tengas que coordinar a mil personas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-emerald-500/50 bg-emerald-500/10 p-6 md:p-8 text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            ¿Hablamos de tu caso?
          </h2>
          <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto">
            Cuéntanos si quieres vender, comprar o necesitas hipoteca y vemos
            qué opciones reales tienes ahora mismo.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/valora-tu-vivienda"
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-sm font-medium transition"
            >
              Empezar valorando mi vivienda
            </a>
            <a
              href="mailto:info@bkchome.es"
              className="px-5 py-3 rounded-2xl border border-slate-700 hover:border-emerald-500 text-sm font-medium transition"
            >
              Escribir a info@bkchome.es
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
