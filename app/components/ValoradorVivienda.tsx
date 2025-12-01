"use client";

import { useMemo, useState } from "react";

const ZONAS = [
  { key: "alcorcon", label: "Alcorcón", eurM2: 2600 },
  { key: "mostoles", label: "Móstoles", eurM2: 2500 },
  { key: "leganes", label: "Leganés", eurM2: 2700 },
  { key: "getafe", label: "Getafe", eurM2: 2900 },
  { key: "fuenlabrada", label: "Fuenlabrada", eurM2: 2400 },
  { key: "sur", label: "Zona sur (general)", eurM2: 2600 },
  { key: "otro", label: "Otra zona (manual)", eurM2: 2600 },
] as const;

function eur(n: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(isNaN(n) ? 0 : n);
}

type Estado = "reformar" | "normal" | "reformado";

export default function ValoradorVivienda() {
  const [zona, setZona] = useState<(typeof ZONAS)[number]["key"]>("alcorcon");
  const [m2, setM2] = useState<number>(80);
  const [habitaciones, setHabitaciones] = useState<number>(3);
  const [banos, setBanos] = useState<number>(1);
  const [estado, setEstado] = useState<Estado>("normal");

  const [ascensor, setAscensor] = useState<boolean>(true);
  const [exterior, setExterior] = useState<boolean>(true);
  const [terraza, setTerraza] = useState<boolean>(false);
  const [garaje, setGaraje] = useState<boolean>(false);

  const zonaBase = useMemo(
    () => ZONAS.find((z) => z.key === zona)!,
    [zona]
  );
  const [eurM2Manual, setEurM2Manual] = useState<number>(zonaBase.eurM2);

  const eurM2 = zona === "otro" ? eurM2Manual : zonaBase.eurM2;

  const { min, mid, max } = useMemo(() => {
    const m2Safe = Math.max(20, Math.min(400, isNaN(m2) ? 0 : m2));
    const base = m2Safe * Math.max(500, eurM2);

    let mult = 1;

    // Estado vivienda
    if (estado === "reformar") mult *= 0.88;
    if (estado === "normal") mult *= 1.0;
    if (estado === "reformado") mult *= 1.08;

    // Habitaciones / baños (pequeños ajustes)
    mult *= 1 + Math.min(0.03, Math.max(-0.03, (habitaciones - 3) * 0.01));
    mult *= 1 + Math.min(0.03, Math.max(-0.03, (banos - 1) * 0.015));

    // Extras
    if (ascensor) mult *= 1.02;
    if (exterior) mult *= 1.02;
    if (terraza) mult *= 1.015;
    if (garaje) mult *= 1.03;

    const central = base * mult;
    const low = Math.round(central * 0.93);
    const high = Math.round(central * 1.07);

    return {
      min: low,
      mid: Math.round(central),
      max: high,
    };
  }, [m2, eurM2, habitaciones, banos, estado, ascensor, exterior, terraza, garaje]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">
          Calcula cuánto puede valer tu vivienda
        </h2>
        <p className="text-xs text-slate-600">
          Estimación orientativa en función de zona, metros y extras. Sin datos personales.
        </p>
      </div>

      {/* Campos principales */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-xs font-medium text-slate-700">
          Zona
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={zona}
            onChange={(e) => {
              const v = e.target.value as (typeof ZONAS)[number]["key"];
              setZona(v);
              const found = ZONAS.find((z) => z.key === v);
              if (found) setEurM2Manual(found.eurM2);
            }}
          >
            {ZONAS.map((z) => (
              <option key={z.key} value={z.key}>
                {z.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-medium text-slate-700">
          Metros construidos (m²)
          <input
            type="number"
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={m2}
            onChange={(e) => setM2(Number(e.target.value))}
            min={20}
            max={400}
          />
        </label>

        <label className="text-xs font-medium text-slate-700">
          Habitaciones
          <input
            type="number"
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={habitaciones}
            onChange={(e) => setHabitaciones(Number(e.target.value))}
            min={0}
            max={10}
          />
        </label>

        <label className="text-xs font-medium text-slate-700">
          Baños
          <input
            type="number"
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={banos}
            onChange={(e) => setBanos(Number(e.target.value))}
            min={0}
            max={6}
          />
        </label>

        <label className="text-xs font-medium text-slate-700">
          Estado
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={estado}
            onChange={(e) => setEstado(e.target.value as Estado)}
          >
            <option value="reformar">A reformar</option>
            <option value="normal">Normal</option>
            <option value="reformado">Reformado / actualizado</option>
          </select>
        </label>

        {zona === "otro" ? (
          <label className="text-xs font-medium text-slate-700">
            Precio zona (€/m²) aproximado
            <input
              type="number"
              inputMode="numeric"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
              value={eurM2Manual}
              onChange={(e) => setEurM2Manual(Number(e.target.value))}
              min={500}
            />
          </label>
        ) : (
          <div className="text-xs text-slate-600 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center">
            Base orientativa:{" "}
            <span className="ml-1 font-semibold text-slate-900">{eurM2} €/m²</span>
          </div>
        )}
      </div>

      {/* Extras */}
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {[
          ["Ascensor", ascensor, setAscensor],
          ["Exterior", exterior, setExterior],
          ["Terraza", terraza, setTerraza],
          ["Garaje", garaje, setGaraje],
        ].map(([label, value, setter]) => {
          const active = value as boolean;
          const set = setter as (v: boolean) => void;
          return (
            <button
              key={label as string}
              type="button"
              onClick={() => set(!active)}
              className={[
                "px-3 py-1.5 rounded-2xl border text-xs transition",
                active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {active ? "✅ " : ""}{label as string}
            </button>
          );
        })}
      </div>

      {/* Resultado */}
      <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4 space-y-2">
        <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-semibold">
          Estimación orientativa
        </div>
        <div className="text-2xl font-semibold text-slate-900">
          {eur(min)} – {eur(max)}
        </div>
        <div className="text-sm text-slate-700">
          Valor central aprox.:{" "}
          <span className="font-semibold">{eur(mid)}</span>
        </div>

        <p className="mt-2 text-[11px] text-slate-500">
          *Solo orientativo. Para afinar usamos comparables reales de tu finca y zona, estado,
          planta, orientación, comunidad, etc.
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          <a
            href="/valora-tu-vivienda"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition"
          >
            Quiero una valoración más precisa
          </a>
          <a
            href="https://wa.me/34617476695"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-white"
          >
            Enviarte los datos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
