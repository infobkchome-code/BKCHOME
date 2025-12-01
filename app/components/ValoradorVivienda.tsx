"use client";

import { useMemo, useState } from "react";

const WHATSAPP = "https://wa.me/34617476695";

const ZONAS = [
  { key: "alcorcon", label: "Alcorcón", eurM2: 2600 },
  { key: "mostoles", label: "Móstoles", eurM2: 2500 },
  { key: "leganes", label: "Leganés", eurM2: 2700 },
  { key: "getafe", label: "Getafe", eurM2: 2900 },
  { key: "fuenlabrada", label: "Fuenlabrada", eurM2: 2400 },
  { key: "sur", label: "Zona sur (general)", eurM2: 2600 },
  { key: "otro", label: "Otra zona (manual)", eurM2: 2600 },
] as const;

type ZonaKey = (typeof ZONAS)[number]["key"];
type Estado = "reformar" | "normal" | "reformado";

function eur(n: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
}

function clampNum(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export default function ValoradorVivienda() {
  const [zona, setZona] = useState<ZonaKey>("alcorcon");
  const [m2, setM2] = useState<number>(80);

  // “Detalles” (opcionales)
  const [showMore, setShowMore] = useState(false);
  const [habitaciones, setHabitaciones] = useState<number>(3);
  const [banos, setBanos] = useState<number>(1);
  const [estado, setEstado] = useState<Estado>("normal");
  const [ascensor, setAscensor] = useState<boolean>(true);
  const [exterior, setExterior] = useState<boolean>(true);
  const [terraza, setTerraza] = useState<boolean>(false);
  const [garaje, setGaraje] = useState<boolean>(false);

  const zonaBase = useMemo(() => ZONAS.find((z) => z.key === zona)!, [zona]);
  const [eurM2Manual, setEurM2Manual] = useState<number>(zonaBase.eurM2);

  const eurM2 = zona === "otro" ? eurM2Manual : zonaBase.eurM2;

  const { min, mid, max } = useMemo(() => {
    const m2Safe = clampNum(m2, 20, 400);
    const base = m2Safe * Math.max(500, eurM2);

    let mult = 1;

    if (estado === "reformar") mult *= 0.88;
    if (estado === "reformado") mult *= 1.08;

    mult *= 1 + Math.min(0.03, Math.max(-0.03, (habitaciones - 3) * 0.01));
    mult *= 1 + Math.min(0.03, Math.max(-0.03, (banos - 1) * 0.015));

    if (ascensor) mult *= 1.02;
    if (exterior) mult *= 1.02;
    if (terraza) mult *= 1.015;
    if (garaje) mult *= 1.03;

    const central = base * mult;
    return {
      min: Math.round(central * 0.93),
      mid: Math.round(central),
      max: Math.round(central * 1.07),
    };
  }, [m2, eurM2, habitaciones, banos, estado, ascensor, exterior, terraza, garaje]);

  const zonaLabel = useMemo(
    () => ZONAS.find((z) => z.key === zona)?.label ?? zona,
    [zona]
  );

  const precisionLabel = useMemo(() => {
    if (!showMore) return "Rápida";
    // si abre detalles, subimos “percepción” de precisión
    const extras = [ascensor, exterior, terraza, garaje].filter(Boolean).length;
    const score = 3 + extras; // 3 base + extras
    if (score >= 6) return "Alta";
    if (score >= 4) return "Media";
    return "Rápida+";
  }, [showMore, ascensor, exterior, terraza, garaje]);

  const detailsHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("zona", zona);
    params.set("m2", String(clampNum(m2, 20, 400)));

    // precargamos también los detalles aunque no estén abiertos: no molesta
    params.set("habitaciones", String(clampNum(habitaciones, 0, 10)));
    params.set("banos", String(clampNum(banos, 0, 6)));
    params.set("estado", estado);

    params.set("ascensor", ascensor ? "1" : "0");
    params.set("exterior", exterior ? "1" : "0");
    params.set("terraza", terraza ? "1" : "0");
    params.set("garaje", garaje ? "1" : "0");

    if (zona === "otro") params.set("eurM2Manual", String(Math.max(500, eurM2Manual)));

    return `/valora-tu-vivienda?${params.toString()}`;
  }, [zona, m2, habitaciones, banos, estado, ascensor, exterior, terraza, garaje, eurM2Manual]);

  const waHref = useMemo(() => {
    const text = `Hola BKC Home, he calculado una estimación orientativa para mi vivienda:
- Zona: ${zonaLabel}
- m²: ${clampNum(m2, 20, 400)}
- Rango: ${eur(min)} – ${eur(max)} (central ${eur(mid)})

¿Me ayudáis con una valoración más precisa?`;
    return `${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }, [zonaLabel, m2, min, max, mid]);

  return (
    <div className="relative">
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute -inset-6 opacity-70 blur-2xl">
        <div className="h-full w-full rounded-[40px] bg-gradient-to-br from-emerald-200 via-sky-100 to-emerald-100" />
      </div>

      {/* Marco degradado para “hero” */}
      <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-emerald-300 via-sky-200 to-emerald-200 shadow-[0_20px_60px_-35px_rgba(15,118,110,0.7)]">
        <div className="relative rounded-[27px] bg-white p-5 md:p-6">
          {/* Header con gancho */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-900">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  GRATIS · 30s
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Sin datos personales
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Precisión: {precisionLabel}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                Calcula cuánto puede valer tu vivienda
              </h2>
              <p className="text-xs text-slate-600">
                Estimación orientativa con tu zona y metros. Si quieres, la afinamos en 2 clics.
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end text-right">
              <div className="text-[11px] text-slate-500">Zona actual</div>
              <div className="text-sm font-semibold text-slate-900">{zonaLabel}</div>
            </div>
          </div>

          {/* Inputs “rápidos” */}
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="text-xs font-medium text-slate-700">
              Zona
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                value={zona}
                onChange={(e) => {
                  const v = e.target.value as ZonaKey;
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

            {zona === "otro" ? (
              <label className="text-xs font-medium text-slate-700 md:col-span-2">
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
              <div className="md:col-span-2 text-xs text-slate-600 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center justify-between">
                <span>Base orientativa de la zona</span>
                <span className="font-semibold text-slate-900">{eurM2} €/m²</span>
              </div>
            )}
          </div>

          {/* Toggle “más precisión” */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowMore((v) => !v)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              {showMore ? "− Ocultar detalles" : "+ Añadir detalles (más precisión)"}
            </button>

            <div className="text-[11px] text-slate-500">
              Tip: cuanto más completo, mejor el rango.
            </div>
          </div>

          {showMore && (
            <>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
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
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-sm">
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
            </>
          )}

          {/* Resultado “con gancho” */}
          <div className="mt-5 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 md:p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-semibold">
                  Estimación orientativa
                </div>
                <div className="mt-1 text-2xl md:text-3xl font-semibold text-slate-900">
                  {eur(min)} <span className="text-slate-400">–</span> {eur(max)}
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  Valor central aprox.: <span className="font-semibold">{eur(mid)}</span>
                </div>
              </div>

              <div className="hidden md:block text-right">
                <div className="text-[11px] text-slate-500">Rango</div>
                <div className="text-sm font-semibold text-slate-900">
                  ± {eur(Math.round((max - min) / 2))}
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              *Solo orientativo. Para afinar usamos comparables reales (finca, altura, orientación,
              calidades y demanda).
            </p>

            {/* CTAs potentes */}
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              <a
                href={detailsHref}
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition transform hover:-translate-y-[1px]"
              >
                Quiero una valoración más precisa
                <span aria-hidden>→</span>
              </a>

              <a
                href={waHref}
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Enviarte este rango por WhatsApp
              </a>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span>✅ Respuesta rápida</span>
              <span>✅ Sin compromiso</span>
              <span className="hidden md:inline">✅ Especialistas zona sur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
