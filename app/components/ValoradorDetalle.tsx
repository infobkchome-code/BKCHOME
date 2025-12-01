"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  }).format(isNaN(n) ? 0 : n);
}

const ZONA_KEYS = new Set<ZonaKey>(ZONAS.map((z) => z.key));
const ESTADOS = new Set<Estado>(["reformar", "normal", "reformado"]);

function isZonaKey(v: string | null): v is ZonaKey {
  return !!v && (ZONA_KEYS as Set<string>).has(v);
}

function isEstado(v: string | null): v is Estado {
  return !!v && (ESTADOS as Set<string>).has(v);
}

function asBool(v: string) {
  return v === "1" || v === "true" || v === "yes";
}

function asNum(v: string | null, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default function ValoradorDetalle() {
  const router = useRouter();
  const sp = useSearchParams();

  const [step, setStep] = useState<1 | 2>(1);

  // Datos vivienda
  const [zona, setZona] = useState<ZonaKey>("alcorcon");
  const [m2, setM2] = useState<number>(80);
  const [habitaciones, setHabitaciones] = useState<number>(3);
  const [banos, setBanos] = useState<number>(1);
  const [estado, setEstado] = useState<Estado>("normal");
  const [ascensor, setAscensor] = useState<boolean>(true);
  const [exterior, setExterior] = useState<boolean>(true);
  const [terraza, setTerraza] = useState<boolean>(false);
  const [garaje, setGaraje] = useState<boolean>(false);

  const zonaBase = useMemo(() => ZONAS.find((z) => z.key === zona)!, [zona]);
  const [eurM2Manual, setEurM2Manual] = useState<number>(zonaBase.eurM2);

  // ✅ Precarga desde query params (sin romper defaults si no vienen)
  useEffect(() => {
    const z = sp.get("zona");
    if (isZonaKey(z)) setZona(z);

    const est = sp.get("estado");
    if (isEstado(est)) setEstado(est);

    // numéricos
    setM2(asNum(sp.get("m2"), 80));
    setHabitaciones(asNum(sp.get("habitaciones"), 3));
    setBanos(asNum(sp.get("banos"), 1));

    // booleanos (solo si el param existe; si no, respetamos el default del state)
    const a = sp.get("ascensor");
    if (a !== null) setAscensor(asBool(a));

    const ex = sp.get("exterior");
    if (ex !== null) setExterior(asBool(ex));

    const t = sp.get("terraza");
    if (t !== null) setTerraza(asBool(t));

    const g = sp.get("garaje");
    if (g !== null) setGaraje(asBool(g));

    // eurM2Manual
    const em = sp.get("eurM2Manual");
    if (em !== null) {
      const n = Number(em);
      if (Number.isFinite(n) && n >= 500) setEurM2Manual(n);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Si cambia la zona y no es "otro", sincroniza eurM2Manual con la base
  useEffect(() => {
    if (zona !== "otro") setEurM2Manual(zonaBase.eurM2);
  }, [zona, zonaBase.eurM2]);

  const eurM2 = zona === "otro" ? eurM2Manual : zonaBase.eurM2;

  const { min, mid, max } = useMemo(() => {
    const m2Safe = Math.max(20, Math.min(400, isNaN(m2) ? 0 : m2));
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

  // Captación (solo en step 2)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const resumen = useMemo(() => {
    const zonaLabel = ZONAS.find((z) => z.key === zona)?.label ?? zona;
    return `Valoración orientativa: ${eur(min)} - ${eur(max)} (central: ${eur(mid)}).
Zona: ${zonaLabel}. m²: ${m2}. Hab: ${habitaciones}. Baños: ${banos}. Estado: ${estado}.
Extras: ${[
      ascensor && "ascensor",
      exterior && "exterior",
      terraza && "terraza",
      garaje && "garaje",
    ]
      .filter(Boolean)
      .join(", ") || "ninguno"}.`;
  }, [zona, m2, habitaciones, banos, estado, ascensor, exterior, terraza, garaje, min, mid, max]);

  async function submitLead() {
    setErr(null);
    if (!name.trim() || !phone.trim()) return setErr("Completa nombre y teléfono.");
    if (!privacy) return setErr("Debes aceptar la política de privacidad.");

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "valora-tu-vivienda",
          name,
          phone,
          email: email || null,
          message: resumen,
        }),
      });
      const json = await res.json();
      if (!json?.ok) throw new Error(json?.error || "Error");
      router.push("/gracias");
    } catch {
      setErr("No se pudo enviar. Prueba de nuevo o escríbenos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Valora tu vivienda (orientativo)
          </h1>
          <p className="text-sm text-slate-600">
            Primero calculas un rango. Luego, si quieres, te damos una valoración más precisa con comparables reales.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          Paso <span className="font-semibold text-slate-900">{step}</span>/2
        </div>
      </div>

      {step === 1 && (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <label className="text-xs font-medium text-slate-700">
              Zona
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                value={zona}
                onChange={(e) => setZona(e.target.value as ZonaKey)}
              >
                {ZONAS.map((z) => (
                  <option key={z.key} value={z.key}>
                    {z.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-medium text-slate-700">
              Metros (m²)
              <input
                type="number"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                value={m2}
                onChange={(e) => setM2(Number(e.target.value))}
                min={20}
                max={400}
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

            <label className="text-xs font-medium text-slate-700">
              Habitaciones
              <input
                type="number"
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
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                value={banos}
                onChange={(e) => setBanos(Number(e.target.value))}
                min={0}
                max={6}
              />
            </label>

            {zona === "otro" ? (
              <label className="text-xs font-medium text-slate-700">
                Precio zona (€/m²) aprox
                <input
                  type="number"
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

          <div className="mt-4 flex flex-wrap gap-2">
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
                    "px-3 py-2 rounded-2xl border text-xs transition",
                    active
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {active ? "✅ " : ""}
                  {label as string}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5">
            <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-semibold">
              Estimación orientativa
            </div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              {eur(min)} – {eur(max)}
            </div>
            <div className="mt-1 text-sm text-slate-700">
              Valor central aprox.: <span className="font-semibold">{eur(mid)}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800"
              >
                Quiero valoración precisa
              </button>

              <a
                href={WHATSAPP}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
              >
                Enviarte datos por WhatsApp
              </a>

              <a
                href="https://hipotecasbkc.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
              >
                ¿Necesitas hipoteca? (hipotecasbkc.es)
              </a>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              *Para afinar usamos comparables reales (altura, orientación, calidades, y demanda de tu zona).
            </p>
          </div>
        </>
      )}

      {step === 2 && (
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr,1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-900">Resumen</div>
            <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">{resumen}</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
              >
                ← Volver
              </button>
              <a
                href={WHATSAPP}
                className="px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold hover:bg-white"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-900">Te contactamos</div>
            <p className="mt-1 text-sm text-slate-600">
              Déjanos tus datos y te damos una valoración más precisa.
            </p>

            {err && (
              <div className="mt-3 p-3 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-900">
                {err}
              </div>
            )}

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700">Nombre</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700">Teléfono</label>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700">Email (opcional)</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label className="flex items-start gap-2 text-[11px] text-slate-600">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                />
                Acepto la{" "}
                <a href="/privacidad" className="underline">
                  política de privacidad
                </a>{" "}
                y autorizo el contacto para esta valoración.
              </label>

              <button
                disabled={loading}
                onClick={submitLead}
                className="w-full rounded-2xl bg-emerald-700 text-white py-2.5 text-sm font-semibold hover:bg-emerald-800 disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar y que me contacten"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
