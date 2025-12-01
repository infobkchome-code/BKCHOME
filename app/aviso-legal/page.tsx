export default function AvisoLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-semibold">Aviso legal</h1>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-700">
        <p>
          Este sitio web es titularidad de <strong>BKC Home</strong>.
        </p>
        <p>
          Datos del titular (completa con tus datos reales):
          <br />
          <strong>Nombre/Razón social:</strong> [COMPLETAR]
          <br />
          <strong>NIF/CIF:</strong> [COMPLETAR]
          <br />
          <strong>Domicilio:</strong> [COMPLETAR]
          <br />
          <strong>Email:</strong> [COMPLETAR]
        </p>

        <p>
          El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de las
          presentes condiciones. El usuario se compromete a utilizar el sitio de forma lícita.
        </p>

        <p className="text-xs text-slate-500">
          *Plantilla informativa. Revisa y adapta con tu asesoría/abogado para tu caso concreto.
        </p>
      </div>
    </div>
  );
}
