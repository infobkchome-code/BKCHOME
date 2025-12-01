export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-semibold">Política de cookies</h1>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-700">
        <p>
          Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento y, si se habilitan,
          cookies analíticas/marketing (por ejemplo Google Analytics o Meta Pixel).
        </p>
        <p className="text-xs text-slate-500">
          *Si activas analítica/ads, conviene añadir banner de consentimiento y gestor de cookies.
        </p>
      </div>
    </div>
  );
}
