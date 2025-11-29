export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-4xl font-semibold mb-4">
          Bienvenido a <span className="text-emerald-400">BKC Home</span>
        </h1>
        <p className="text-slate-300 mb-8">
          Tu inmobiliaria en Alcorcón y zona sur de Madrid.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/valora-tu-vivienda"
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition"
          >
            Valorar mi vivienda
          </a>
          <a
            href="/comprar"
            className="px-5 py-3 rounded-2xl border border-slate-700 hover:border-emerald-500 transition"
          >
            Comprar vivienda
          </a>
        </div>
      </div>
    </main>
  );
}
