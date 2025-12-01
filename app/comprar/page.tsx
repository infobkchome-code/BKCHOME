import LeadForm from "../components/LeadForm";

export default function ComprarPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-5">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Comprar vivienda con claridad
        </h1>
        <p className="text-slate-600">
          Te ayudamos a elegir bien, negociar mejor y llegar a notaría con todo controlado.
          Si necesitas hipoteca, te derivamos al comparador en hipotecasbkc.es.
        </p>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
          <div className="font-semibold">Checklist rápido (lo que revisamos contigo)</div>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Precio vs. mercado real de la zona</li>
            <li>• Estado, reformas, comunidad e IBI</li>
            <li>• Documentación y cargas</li>
            <li>• Negociación y arras</li>
            <li>• Coordinación con banco y notaría</li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://hipotecasbkc.es"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800"
            >
              Ver hipotecas
            </a>
            <a
              href="https://wa.me/34617476695"
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
            >
              Pedir orientación
            </a>
          </div>
        </div>
      </div>

      <LeadForm
        source="comprar"
        title="Te ayudamos a encontrar y negociar"
        subtitle="Cuéntanos zona, presupuesto y plazos."
      />
    </div>
  );
}
