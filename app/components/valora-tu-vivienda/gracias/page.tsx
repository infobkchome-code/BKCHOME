export default function GraciasPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">¡Listo! ✅</h1>
      <p className="mt-3 text-slate-600">
        Hemos recibido tu solicitud. Te contactaremos lo antes posible.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="https://wa.me/34617476695"
          className="px-5 py-3 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800"
        >
          Escribir por WhatsApp
        </a>
        <a
          href="/"
          className="px-5 py-3 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
        >
          Volver a la home
        </a>
      </div>
    </main>
  );
}
