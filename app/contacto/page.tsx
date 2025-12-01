import LeadForm from "../components/LeadForm";

export default function ContactoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Contacto</h1>
        <p className="text-slate-600">
          Escríbenos o déjanos tu número. Te orientamos sin compromiso.
        </p>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-2 text-sm text-slate-700">
          <div className="font-semibold">Datos</div>
          <div>📍 Alcorcón (Madrid) · Zona sur</div>
          <div>
            💬 WhatsApp:{" "}
            <a className="underline" href="https://wa.me/34617476695">+34 617 476 695</a>
          </div>
          <div>
            📞 Teléfono:{" "}
            <a className="underline" href="tel:+34617476695">+34 617 476 695</a>
          </div>
        </div>
      </div>

      <LeadForm source="contacto" title="¿Te llamamos?" subtitle="Déjanos tu número y el motivo." />
    </div>
  );
}
