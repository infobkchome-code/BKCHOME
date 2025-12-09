"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import dynamic from "next/dynamic";

const MapPreview = dynamic(() => import("@/app/components/MapPreview"), {
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

type GeoSuggestion = {
  place_id: string;
  display_name: string;
  lat: number;
  lon: number;
  address?: any;
};

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

  // --------- Geocoding / Mapa ----------
  const [addressQuery, setAddressQuery] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoSuggestions, setGeoSuggestions] = useState<GeoSuggestion[]>([]);
  const [geoSelected, setGeoSelected] = useState<GeoSuggestion | null>(null);
  const [showGeo, setShowGeo] = useState(false);

  useEffect(() => {
    fbqTrack("ViewContent", { source: "valora-tu-vivienda" });
  }, []);

  // Mantener el input visible sincronizado con step1.address
  useEffect(() => {
    setAddressQuery(step1.address);
  }, [step1.address]);

  // Buscar sugerencias mientras escribe (sin botón)
  useEffect(() => {
    const q = addressQuery.trim();
    if (q.length < 5) {
      setGeoSuggestions([]);
      setGeoLoading(false);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setGeoLoading(true);
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setGeoSuggestions(Array.isArray(data?.results) ? data.results : []);
      } catch {
        setGeoSuggestions([]);
      } finally {
        setGeoLoading(false);
      }
    }, 450);

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
    setGeoSelected(s);
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

    let pricePerM2 = 1800;

    switch (step1.condition) {
      case "reformar":
        pricePerM2 = 1400;
        break;
      case "buen_estado":
        pricePerM2 = 1800;
        break;
      case "reformado":
        pricePerM2 = 2100;
        break;
      case "obra_nueva":
        pricePerM2 = 2300;
        break;
    }

    let factor = 1;
    if (step1.hasGarage === "si") factor += 0.05;
    if (step1.hasTerrace === "si") factor += 0.05;

    const basePrice = m2 * pricePerM2 * factor;
    return { minPrice: basePrice * 0.93, maxPrice: basePrice * 1.05 };
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
            Te mostramos una <span className="font-semibold text-slate-800">horquilla orientativa</span> según
            viviendas similares en tu zona. Sin compromiso y sin publicar nada.
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
        </header>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5 md:p-8">
          {errorMsg && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {errorMsg}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Datos de la vivienda</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Cuanto más preciso, más realista será el rango.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Dirección + Autocomplete + Mapa */}
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
                    onBlur={() => setTimeout(() => setShowGeo(false), 150)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && geoSuggestions.length > 0) {
                        e.preventDefault();
                        selectGeo(geoSuggestions[0]);
                      }
                    }}
                    placeholder="Ej: Calle Retablo 11, Alcorcón"
                    required
                  />

                  {(showGeo && (geoLoading || geoSuggestions.length > 0)) && (
                    <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                      {geoLoading && (
                        <div className="px-3 py-2 text-xs text-slate-600">
                          Buscando…
                        </div>
                      )}

                      {!geoLoading && geoSuggestions.length === 0 && (
                        <div className="px-3 py-2 text-xs text-slate-500">
                          Escribe un poco más (calle + número + ciudad).
                        </div>
                      )}

                      {!geoLoading &&
                        geoSuggestions.map((s) => (
                          <button
                            key={s.place_id}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => selectGeo(s)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 border-t border-slate-100"
                          >
                            <div className="text-slate-900">{s.display_name}</div>
                            <div className="text-xs text-slate-500">
                              Pulsa para seleccionar
                            </div>
                          </button>
                        ))}
                    </div>
                  )}

                  {geoSelected && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                      <div className="h-44 md:h-52">
                        <MapPreview lat={geoSelected.lat} lon={geoSelected.lon} />
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

          {/* STEP 2 */}
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

          {/* STEP 3 */}
          {step === 3 && result && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Tu rango orientativo</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Esto es una estimación inicial. Podemos afinar con una revisión real (altura, vistas, orientación, reformas, etc.).
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
                  Basado en datos que nos indicaste: {step1.size} m² · {step1.city}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-600">
                  ⚠️ Valoración aproximada. No sustituye a un informe profesional ni a una visita presencial.
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
