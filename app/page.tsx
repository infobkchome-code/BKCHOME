"use client";

import { useMemo, useState } from "react";

function formatEUR(value: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

function calcMonthly(principal: number, annualRatePct: number, years: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = Math.max(0, annualRatePct) / 100 / 12;

  if (principal <= 0) return 0;
  if (r === 0) return principal / n;

  const pow = Math.pow(1 + r, n);
  return principal * (r * pow) / (pow - 1);
}

export default function HomePage() {
  // --- Simulador hipoteca (arriba del todo) ---
  const [price, setPrice] = useState<number>(250000);
  const [downPct, setDownPct] = useState<number>(20);
  const [years, setYears] = useState<number>(30);
  const [rate, setRate] = useState<number>(3.5);

  const { downAmount, loanAmount, monthly, incomeNeeded } = useMemo(() => {
    const p = Math.max(0, price);
    const dp = Math.min(100, Math.max(0, downPct));
    const down = p * (dp / 100);
    const loan = Math.max(0, p - down);
    const m = calcMonthly(loan, rate, years);
    // Regla rápida: cuota <= 35% de ingresos netos
    const income = m > 0 ? m / 0.35 : 0;

    return { downAmount: down, loanAmount: loan, monthly: m, incomeNeeded: income };
  }, [price, downPct, years, rate]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* SIMULADOR HIPOTECA (PRIMER BLOQUE) */}
      <section className="bg-slate-900 text-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-start">
          <div className="space-y-4">
            <p className="text-xs font-medium tracking-[0.25em] text-slate-300 uppercase">
              Hipotecas BKC
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Calcula tu hipoteca en 30 segundos
            </h2>
            <p className="text-sm text-slate-200 max-w-xl">
              Simulación orientativa de cuota mensual. Si quieres, te llevamos al comparador completo
              en <span className="font-semibold">hipotecasbkc.es</span>.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="https://hipotecasbkc.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-900 text-sm font-semibold hover:bg-emerald-400 transition"
              >
                Ir al comparador completo
              </a>
              <a
                href="https://wa.me/34617476695"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-700 text-sm font-medium text-slate-50 hover:bg-slate-800 transition"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <p className="text-[11px] text-slate-400">
              *Estimación orientativa. Tipo, vinculaciones y condiciones finales dependen del perfil.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-slate-700 p-5 md:p-6 space-y-4">
            <div className="grid gap-3">
              <label className="text-xs text-slate-200">
                Precio vivienda (€)
                <input
                  type="number"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/40 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </label>

              <label className="text-xs text-slate-200">
                Ahorros / entrada (%)
                <input
                  type="number"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/40 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs text-slate-200">
                  Plazo (años)
                  <input
                    type="number"
                    inputMode="numeric"
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/40 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                </label>

                <label className="text-xs text-slate-200">
                  Tipo interés (%)
                  <input
                    type="number"
                    step="0.1"
                    inputMode="decimal"
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/40 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/40 border border-slate-700 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Entrada estimada</span>
                <span className="font-medium text-slate-100">{formatEUR(downAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Importe hipoteca</span>
                <span className="font-medium text-slate-100">{formatEUR(loanAmount)}</span>
              </div>
              <div className="h-px bg-slate-700 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-100">Cuota mensual aprox.</span>
                <span className="text-lg font-semibold text-emerald-400">{formatEUR(monthly)}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Ingresos netos orientativos (regla 35%): {formatEUR(incomeNeeded)}/mes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO (TU BLOQUE ACTUAL) */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
          {/* Texto */}
          <div className="space-y-5">
            <p className="text-xs font-medium tracking-[0.25em] text-slate-500 uppercase">
              Inmobiliaria · Alcorcón y zona sur
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
              Vende tu vivienda
              <span className="block text-emerald-700 mt-1">
                con una inmobiliaria que te habla claro.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-xl">
              En BKC Home te ayudamos a vender o comprar tu vivienda en Alcorcón y zona sur de
              Madrid, acompañándote en todo: valoración, marketing, visitas, negociación, firma
              y financiación si la necesitas.
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              <li>✅ Valoración realista según mercado actual en tu zona.</li>
              <li>✅ Difusión profesional en portales y base de datos de compradores.</li>
              <li>✅ Te ayudamos también con la hipoteca, si eres comprador.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/valora-tu-vivienda"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
              >
                🧮 Valorar mi vivienda online
              </a>
              <a
                href="https://wa.me/34617476695"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-300 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                💬 Hablar por WhatsApp
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Sin compromiso. Te explicamos todo el proceso y tú decides.
            </p>
          </div>

          {/* Formulario lead rápido */}
          <div className="bg-slate-900 text-slate-50 rounded-3xl p-5 md:p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              Cuéntanos qué quieres hacer con tu vivienda
            </h2>
            <p className="text-xs text-slate-300 mb-4">
              Déjanos tus datos y te llamamos para una valoración y estrategia de venta sin
              compromiso.
            </p>

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Aquí conectaremos este formulario con tu CRM / Supabase o con un email. De momento es solo demo."
                );
              }}
            >
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Nombre y apellidos
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ej. María López"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Teléfono</label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ej. 600 000 000"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Localidad / zona de la vivienda
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Ej. Alcorcón – Parque Lisboa"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">¿Qué necesitas?</label>
                <select
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-sm px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                  defaultValue="vender"
                >
                  <option value="vender">Quiero vender mi vivienda</option>
                  <option value="comprar">Quiero comprar vivienda</option>
                  <option value="ambas">Estoy entre vender y comprar</option>
                  <option value="hipoteca">Solo asesoramiento de hipoteca</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-900 text-sm font-semibold hover:bg-emerald-400 transition"
              >
                Me llamáis para verlo
              </button>

              <p className="text-[10px] text-slate-400 mt-2">
                Al enviar aceptas que te contactemos para informarte sobre la venta o compra de tu
                vivienda. Podrás ejercer tus derechos de protección de datos cuando quieras.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* (resto de tu home igual...) */}
    </main>
  );
}
