export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-semibold">Política de privacidad</h1>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-700">
        <p>
          Finalidad: gestionar solicitudes de información y contacto enviadas mediante formularios o WhatsApp.
        </p>
        <p>
          Responsable: <strong>BKC Home</strong> (completa con tus datos del titular en el Aviso Legal).
        </p>
        <p>
          Base jurídica: consentimiento del interesado.
        </p>
        <p>
          Conservación: el tiempo necesario para atender la solicitud y, en su caso, por responsabilidades legales.
        </p>
        <p>
          Derechos: acceso, rectificación, supresión, oposición, limitación y portabilidad. Puedes ejercerlos por los medios indicados
          en el Aviso Legal.
        </p>

        <p className="text-xs text-slate-500">
          *Plantilla informativa. Revisa y adapta con tu asesoría/abogado para tu caso concreto.
        </p>
      </div>
    </div>
  );
}
