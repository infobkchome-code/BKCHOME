"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const MapPreview = dynamic(() => import("../components/MapPreview"), {
  ssr: false,
});

type PropertyFormStep1 = {
  address: string;
  city: string;
  type: string;
  size: string;
  bedrooms: string;
  bathrooms: string;
  hasGarage: "si" | "no" | "";
  hasTerrace: "si" | "no" | "";
  condition: "reformar" | "buen_estado" | "reformado" | "obra_nueva" | "";
};

type ContactFormStep2 = {
  name: string;
  phone: string;
  email: string;
  acceptPrivacy: boolean;
};

type ValuationResult = {
  minPrice: number;
  maxPrice: number;
};

type ValuationConfig = {
  conditions: Record<string, number>;
  modifiers: { garage: number; terrace: number };
  range: { min: number; max: number };
};

const DEFAULT_CONFIG: ValuationConfig = {
  conditions: {
    reformar: 1400,
    buen_estado: 1800,
    reformado: 2100,
    obra_nueva: 2300,
  },
  modifiers: { garage: 0.05, terrace: 0.05 },
  range: { min: 0.93, max: 1.05 },
};

type GeoSuggestion = {
  place_id: number | string;
  display_name: string;
  lat: number | string;
  lon: number | string;
  address?: {
    country?: string;
    country_code?: string;
    state?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    county?: string;
    postcode?: string;
    road?: string;
    house_number?: string;
  };
};

const CRM_BASE =
  process.env.NEXT_PUBLIC_CRM_URL?.replace(/\/$/, "") ||
  "https://back.hipotecasbkc.es";

function fbqTrack(event: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;
  const fbq = (window as any).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}

function formatEUR(value: number) {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function pillClass(active: boolean) {
  return [
    "px-3 py-1 rounded-full text-xs font-medium border transition",
    active
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-slate-200 bg-white text-slate-600",
  ].join(" ");
}

function isSpain(s: GeoSuggestion) {
  const cc = s.address?.country_code?.toLowerCase();
  if (cc) return cc === "es";
  return /\bEspaña\b/i.test(s.display_name);
}

function scorePreferZonaSur(s: GeoSuggestion) {
  const state = (s.address?.state || "").toLowerCase();
  const county = (s.address?.county || "").toLowerCase();
  const name = (s.display_name || "").toLowerCase();

  if (state.includes("comunidad de madrid") || name.includes("madrid"))
    return -20;
  if (county.includes("toledo") || name.includes("toledo")) return -10;
  return 0;
}

function readUtm(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const sp = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const out: Record<string, string> = {};
  let any = false;
  for (const k of keys) {
    const v = sp.get(k);
    if (v) {
      out[k] = v;
      any = true;
    }
  }
  return any ? out : null;
}

export default function ValoraTuViviendaPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [step1, setStep1] = useState<PropertyFormStep1>({
    address: "",
    city: "",
    type: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    hasGarage: "",
    hasTerrace: "",
    condition: "",
  });

  const [step2, setStep2] = useState<ContactFormStep2>({
    name: "",
    phone: "",
    email: "",
    acceptPrivacy: false,
  });

  const [result, setResult] = useState<ValuationResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Config €/m² desde el CRM
  const [cfg, setCfg] = useState<ValuationConfig>(DEFAULT_CONFIG);
  const [cfgLoaded, setCfgLoaded] = useState(false);

  // Geocoding / mapa
  const [addressQuery, setAddressQuery] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoSuggestions, setGeoSuggestions] = useState<GeoSuggestion[]>([]);
  const [geoSelected, setGeoSelected] = useState<GeoSuggestion | null>(null);
  const [showGeo, setShowGeo] = useState(false);

  useEffect(() => {
    fbqTrack("ViewContent", { source: "valora-tu-vivienda" });
  }, []);

  // Cargar config desde CRM (si falla, queda DEFAULT_CONFIG)
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${CRM_BASE}/api/valorador/config`, {
          cache: "no-store",
        });
        const j = await r.json().catch(() => null);
        if (j?.data) {
          setCfg(j.data);
          setCfgLoaded(true);
        } else {
          setCfgLoaded(false);
        }
      } catch {
        setCfgLoaded(false);
      }
    })();
  }, []);

  // sincroniza input dirección
  useEffect(() => {
    if (!addressQuery && step1.address) setAddressQuery(step1.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step1.address]);

  // autocompletar dirección
  useEffect(() => {
    const q = addressQuery.trim();
    if (q.length < 4) {
      setGeoSuggestions([]);
      setGeoLoading(false);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setGeoLoading(true);
        const url = `/api/geocode?q=${encodeURIComponent(
          q
        )}&countrycodes=es&accept_language=es`;

        const res = await fetch(url);
        const data = await res.json().catch(() => ({}));
        const raw: GeoSuggestion[] = Array.isArray(data?.results)
          ? data.results
          : [];

        const filtered = raw
          .filter(isSpain)
          .sort((a, b) => scorePreferZonaSur(a) - scorePreferZonaSur(b));

        setGeoSuggestions(filtered);
      } catch {
        setGeoSuggestions([]);
      } finally {
        setGeoLoading(false);
      }
    }, 280);

    return () => clearTimeout(t);
  }, [addressQuery]);

  function handleStep1Change(field: keyof PropertyFormStep1, value: string) {
    setStep1((prev) => ({ ...prev, [field]: value }));
  }

  function handleStep2Change(
    field: keyof ContactFormStep2,
    value: string | boolean
  ) {
    setStep2((prev) => ({ ...prev, [field]: value }));
  }

  function selectGeo(s: GeoSuggestion) {
    setGeoSelected({
      ...s,
      lat: Number(s.lat),
      lon: Number(s.lon),
    });
    setShowGeo(false);

    const a = s.address || {};
    const city =
      a.city || a.town || a.village || a.municipality || a.county || "";

    handleStep1Change("address", s.display_name);
    if (city) handleStep1Change("city", city);

    setAddressQuery(s.display_name);
    setGeoSuggestions([]);
  }

  function validateStep1(): boolean {
    if (!step1.address.trim()) return false;
    if (!step1.city.trim()) return false;
    if (!step1.type) return false;
    if (!step1.size || isNaN(Number(step1.size))) return false;
    if (!step1.bedrooms) return false;
    if (!step1.bathrooms) return false;
    if (!step1.hasGarage) return false;
    if (!step1.hasTerrace) return false;
    if (!step1.condition) return false;
    return true;
  }

  function validateStep2(): boolean {
    if (!step2.name.trim()) return false;
    if (!step2.phone.trim()) return false;
    if (!step2.acceptPrivacy) return false;
    return true;
  }

  function calculateValuation(): ValuationResult | null {
    const m2 = Number(step1.size);
    if (isNaN(m2) || m2 <= 0) return null;

    const pricePerM2 =
      cfg.conditions?.[step1.condition] ??
      cfg.conditions?.buen_estado ??
      1800;

    const garagePlus =
      step1.hasGarage === "si" ? cfg.modifiers?.garage ?? 0.05 : 0;

    const terracePlus =
      step1.hasTerrace === "si" ? cfg.modifiers?.terrace ?? 0.05 : 0;

    const factor = 1 + garagePlus + terracePlus;
    const basePrice = m2 * pricePerM2 * factor;

    const minMul = cfg.range?.min ?? 0.93;
    const maxMul = cfg.range?.max ?? 1.05;

    return { minPrice: basePrice * minMul, maxPrice: basePrice * maxMul };
  }

  async function handleStep1Submit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep1()) {
      setErrorMsg("Falta algún dato o hay un campo incorrecto. Revísalo y seguimos.");
      return;
    }
    setErrorMsg(null);
    setStep(2);
  }

  async function handleStep2Submit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep2()) {
      setErrorMsg("Revisa tus datos y acepta la política de privacidad.");
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    try {
      const valuation = calculateValuation();
      if (!valuation) {
        setErrorMsg("No hemos podido calcular la valoración. Revisa los m² introducidos.");
        setSubmitting(false);
        return;
      }

      // Enviar lead (misma web -> /api/leads -> reenvía al CRM con secreto)
      try {
        const utm = readUtm();
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "bkchome_valorador",
            step1,
            step2,
            result: valuation,
            utm,
            geo: geoSelected
              ? {
                  lat: Number(geoSelected.lat),
                  lon: Number(geoSelected.lon),
                  display_name: geoSelected.display_name,
                }
              : null,
          }),
        });
      } catch (err) {
        console.error("Error enviando lead al CRM", err);
      }

      fbqTrack("Lead", { source: "valora-tu-vivienda" });

      setResult(valuation);
      setStep(3);
    } catch (err) {
      console.error(err);
      setErrorMsg("Ha ocurrido un error. Inténtalo de nuevo en unos minutos.");
    } finally {
      setSubmitting(false);
    }
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  const waLink = useMemo(() => {
    const msg = encodeURIComponent(
      `Hola Nahuel, acabo de hacer el valorador en BKC Home. Mi vivienda está en ${step1.city}, tiene ${step1.size} m². ¿Me puedes dar una valoración más precisa?`
    );
    return `https://wa.me/34617476695?text=${msg}`;
  }, [step1.city, step1.size]);

  const input =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-300";
  const label = "block text-xs font-medium text-slate-700 mb-1.5";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <section className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <header className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            ✅ Gratis · 1 minuto · Zona Sur Madrid
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            ¿Cuánto vale tu vivienda hoy?
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Te mostramos una{" "}
            <span className="font-semibold text-slate-800">
              horquilla orientativa
            </span>{" "}
            según viviendas similares en tu zona. Sin compromiso y sin publicar nada.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className={pillClass(step >= 1)}>1 · Vivienda</span>
            <span className={pillClass(step >= 2)}>2 · Contacto</span>
            <span className={pillClass(step >= 3)}>3 · Resultado</span>
          </div>

          <div className="mt-4 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 text-xs text-slate-500">
            {cfgLoaded ? "✅ Precios actualizados (CRM)" : "ℹ️ Usando precios base (fallback)"}
          </div>
        </header>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5 md:p-8">
          {errorMsg && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {errorMsg}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Datos de la vivienda</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Cuanto más preciso, más realista será el rango.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2 relative">
                  <label className={label}>Dirección o Referencia Catastral</label>

                  <input
                    type="text"
                    className={input}
                    value={addressQuery}
                    onChange={(e) => {
                      const v = e.target.value;
                      setAddressQuery(v);
                      setShowGeo(true);
                      setGeoSelected(null);
                      handleStep1Change("address", v);
                    }}
                    onFocus={() => setShowGeo(true)}
                    onBlur={() => setTimeout(() => setShowGeo(false), 120)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && geoSuggestions.length > 0) {
                        e.preventDefault();
                        selectGeo(geoSuggestions[0]);
                      }
                    }}
                    placeholder="Ej: Calle Retablo 11, Alcorcón"
                    required
                  />

                  {(showGeo &&
                    (geoLoading ||
                      geoSuggestions.length > 0 ||
                      addressQuery.trim().length >= 4)) && (
                    <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                      {geoLoading && (
                        <div className="px-4 py-3 text-xs text-slate-600">
                          Buscando en España…
                        </div>
                      )}

                      {!geoLoading && geoSuggestions.length === 0 && (
                        <div className="px-4 py-3 text-xs text-slate-500">
                          Prueba con <span className="font-semibold">calle + número</span>{" "}
                          y, si puedes, la ciudad.
                        </div>
                      )}

                      {!geoLoading &&
                        geoSuggestions.map((s) => (
                          <button
                            key={String(s.place_id)}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => selectGeo(s)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 border-t border-slate-100"
                          >
                            <div className="text-slate-900 font-medium line-clamp-2">
                              {s.display_name}
                            </div>
                            <div className="mt-1 text-[11px] text-slate-500">
                              España{s.address?.postcode ? ` · ${s.address.postcode}` : ""}
                            </div>
                          </button>
                        ))}
                    </div>
                  )}

                  {geoSelected && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                      <div className="h-44 md:h-52">
                        <MapPreview
                          lat={Number(geoSelected.lat)}
                          lon={Number(geoSelected.lon)}
                        />
                      </div>
                      <div className="px-3 py-2 text-xs text-slate-600 bg-white border-t border-slate-200">
                        📍 {geoSelected.display_name}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className={label}>Municipio</label>
                  <input
                    type="text"
                    className={input}
                    value={step1.city}
                    onChange={(e) => handleStep1Change("city", e.target.value)}
                    placeholder="Ej: Alcorcón"
                    required
                  />
                </div>

                <div>
                  <label className={label}>Tipo de vivienda</label>
                  <select
                    className={input}
                    value={step1.type}
                    onChange={(e) => handleStep1Change("type", e.target.value)}
                    required
                  >
                    <option value="">Selecciona…</option>
                    <option value="piso">Piso</option>
                    <option value="atico">Ático</option>
                    <option value="bajo">Bajo</option>
                    <option value="chalet">Chalet</option>
                    <option value="duplex">Dúplex</option>
                  </select>
                </div>

                <div>
                  <label className={label}>Superficie aprox. (m²)</label>
                  <input
                    type="number"
                    min={20}
                    className={input}
                    value={step1.size}
                    onChange={(e) => handleStep1Change("size", e.target.value)}
                    placeholder="Ej: 78"
                    required
                  />
                </div>

                <div>
                  <label className={label}>Habitaciones</label>
                  <input
                    type="number"
                    min={1}
                    className={input}
                    value={step1.bedrooms}
                    onChange={(e) => handleStep1Change("bedrooms", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={label}>Baños</label>
                  <input
                    type="number"
                    min={1}
                    className={input}
                    value={step1.bathrooms}
                    onChange={(e) => handleStep1Change("bathrooms", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={label}>¿Tiene garaje?</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasGarage", "si")}
                      className={[
                        "flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                        step1.hasGarage === "si"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasGarage", "no")}
                      className={[
                        "flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                        step1.hasGarage === "no"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className={label}>¿Terraza o balcón?</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasTerrace", "si")}
                      className={[
                        "flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                        step1.hasTerrace === "si"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasTerrace", "no")}
                      className={[
                        "flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                        step1.hasTerrace === "no"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={label}>Estado de la vivienda</label>
                  <select
                    className={input}
                    value={step1.condition}
                    onChange={(e) =>
                      handleStep1Change("condition", e.target.value as any)
                    }
                    required
                  >
                    <option value="">Selecciona…</option>
                    <option value="reformar">Para reformar</option>
                    <option value="buen_estado">Buen estado</option>
                    <option value="reformado">Reformado</option>
                    <option value="obra_nueva">Obra nueva / casi nuevo</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-500">
                  🔒 No publicamos tu vivienda. Solo calculamos una estimación.
                </p>
                <button
                  type="submit"
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
                >
                  Continuar →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Último paso</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Te mostramos el rango orientativo y, si quieres, lo afinamos contigo.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={label}>Nombre</label>
                  <input
                    type="text"
                    className={input}
                    value={step2.name}
                    onChange={(e) => handleStep2Change("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={label}>Teléfono</label>
                  <input
                    type="tel"
                    className={input}
                    value={step2.phone}
                    onChange={(e) => handleStep2Change("phone", e.target.value)}
                    placeholder="Ej: 617 000 000"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={label}>Email (opcional)</label>
                  <input
                    type="email"
                    className={input}
                    value={step2.email}
                    onChange={(e) => handleStep2Change("email", e.target.value)}
                    placeholder="Ej: tu@email.com"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="privacy"
                    type="checkbox"
                    className="mt-1"
                    checked={step2.acceptPrivacy}
                    onChange={(e) =>
                      handleStep2Change("acceptPrivacy", e.target.checked)
                    }
                  />
                  <label htmlFor="privacy" className="text-xs text-slate-600">
                    Acepto la política de privacidad y el tratamiento de mis datos para
                    recibir esta valoración orientativa.{" "}
                    <span className="font-semibold">Sin compromiso.</span>
                  </label>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  ✅ Respuesta rápida por WhatsApp o llamada · ✅ Solo zona sur Madrid
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  onClick={() => setStep(1)}
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition disabled:opacity-60"
                >
                  {submitting ? "Calculando…" : "Ver mi precio"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && result && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Tu rango orientativo</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Esto es una estimación inicial. Podemos afinar con una revisión real
                  (altura, vistas, orientación, reformas, etc.).
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <div className="text-xs font-semibold text-emerald-800">
                  HORQUILLA ORIENTATIVA DE VENTA
                </div>
                <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  {formatEUR(result.minPrice)}{" "}
                  <span className="text-base font-medium text-slate-500">—</span>{" "}
                  {formatEUR(result.maxPrice)}
                </div>
                <div className="mt-3 text-xs text-slate-600">
                  Basado en datos: {step1.size} m² · {step1.city}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-600">
                  ⚠️ Valoración aproximada. No sustituye a un informe profesional ni a
                  una visita presencial.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <a
                  href={waLink}
                  onClick={() => fbqTrack("Contact", { source: "valorador_cta" })}
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
                >
                  Quiero una valoración más precisa (WhatsApp)
                </a>
                <a
                  href="tel:+34617476695"
                  onClick={() => fbqTrack("Contact", { source: "valorador_tel" })}
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Prefiero llamada
                </a>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          BKC Home · Alcorcón y zona sur · Transparencia y acompañamiento hasta notaría
        </p>
      </section>
    </main>
  );
}
