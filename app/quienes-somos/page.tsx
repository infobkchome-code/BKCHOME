export default function QuienesSomosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Quiénes somos</h1>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
        <p className="text-slate-700">
          En BKC Home trabajamos con un enfoque simple: claridad, datos y acompañamiento real.
          Nuestro objetivo es que vendas o compres con seguridad y sin sorpresas en notaría.
        </p>
        <ul className="text-sm text-slate-700 space-y-1">
          <li>• Especializados en Alcorcón y zona sur de Madrid</li>
          <li>• Estrategia de precio realista y marketing cuidado</li>
          <li>• Coordinación completa de la operación (arras, notaría y tiempos)</li>
        </ul>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="/contacto"
            className="px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800"
          >
            Contactar
          </a>
          <a
            href="/valora-tu-vivienda"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
          >
            Valorar vivienda
          </a>
        </div>
      </div>
    </div>
  );
}
