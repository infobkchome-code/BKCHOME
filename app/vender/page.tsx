import LeadForm from "../components/LeadForm";

export default function VenderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-5">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Vende tu vivienda sin sorpresas
        </h1>
        <p className="text-slate-600">
          Te acompañamos de principio a fin: valoración realista, estrategia de precio, marketing,
          filtrado de interesados, negociación, arras y notaría.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Valoración y estrategia", "Te decimos el precio que tiene sentido hoy y el plan para vender mejor."],
            ["Marketing profesional", "Anuncio optimizado, difusión y presentación cuidada."],
            ["Filtro de compradores", "Menos visitas inútiles: priorizamos interesados reales."],
            ["Notaría y seguridad", "Arras y escritura revisadas y coordinadas."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="font-semibold">{t}</div>
              <p className="text-sm text-slate-600 mt-1">{d}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="/valora-tu-vivienda"
            className="px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800"
          >
            Valorar mi vivienda
          </a>
          <a
            href="https://wa.me/34617476695"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>

      <LeadForm
        source="vender"
        title="¿Vas a vender? Te llamamos"
        subtitle="Dinos zona y objetivo (rapidez vs. precio) y te orientamos."
      />
    </div>
  );
}
