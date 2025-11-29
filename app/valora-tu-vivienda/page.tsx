"use client";

import { useState, FormEvent } from "react";

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

  function handleStep1Change(
    field: keyof PropertyFormStep1,
    value: string
  ) {
    setStep1((prev) => ({ ...prev, [field]: value }));
  }

  function handleStep2Change(
    field: keyof ContactFormStep2,
    value: string | boolean
  ) {
    setStep2((prev) => ({ ...prev, [field]: value }));
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

    let pricePerM2 = 1800; // valor base por si acaso

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

    // Ajustes por extras
    let factor = 1;
    if (step1.hasGarage === "si") factor += 0.05;
    if (step1.hasTerrace === "si") factor += 0.05;

    const adjustedPricePerM2 = pricePerM2 * factor;
    const basePrice = m2 * adjustedPricePerM2;

    const minPrice = basePrice * 0.93; // -7%
    const maxPrice = basePrice * 1.05; // +5%

    return { minPrice, maxPrice };
  }

  async function handleStep1Submit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep1()) {
      setErrorMsg("Revisa los datos de la vivienda. Falta algún campo o hay un dato incorrecto.");
      return;
    }
    setErrorMsg(null);
    setStep(2);
  }

  async function handleStep2Submit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep2()) {
      setErrorMsg("Revisa tus datos de contacto y acepta la política de privacidad.");
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    try {
      // Aquí en el futuro llamas a tu API interna para guardar el lead en Supabase
      // await fetch("/api/leads", { method: "POST", body: JSON.stringify({ step1, step2 }) });

      const valuation = calculateValuation();
      if (!valuation) {
        setErrorMsg("No hemos podido calcular la valoración. Revisa los m² introducidos.");
        setSubmitting(false);
        return;
      }

      setResult(valuation);
      setStep(3);
    } catch (err) {
      console.error(err);
      setErrorMsg("Ha ocurrido un error al guardar tus datos. Inténtalo de nuevo en unos minutos.");
    } finally {
      setSubmitting(false);
    }
  }

  function formatPrice(value: number): string {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Valora tu vivienda gratis
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Te damos un precio orientativo realista según viviendas similares
            en tu zona. Sin compromiso y en menos de un minuto.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-4 text-sm text-slate-300">
            <span className="px-3 py-1 rounded-full border border-slate-700">
              ✅ Estudio personalizado
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-700">
              ✅ Especialistas en Alcorcón y zona sur
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-700">
              ✅ Sin compromiso de venta
            </span>
          </div>
        </header>

        {/* Contenedor principal */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8">
          {/* Pasos */}
          <div className="flex justify-center gap-3 mb-8 text-sm">
            <span className={`px-3 py-1 rounded-full border ${
              step === 1 ? "border-emerald-400" : "border-slate-700"
            }`}>
              1. Datos de la vivienda
            </span>
            <span className={`px-3 py-1 rounded-full border ${
              step === 2 ? "border-emerald-400" : "border-slate-700"
            }`}>
              2. Tus datos
            </span>
            <span className={`px-3 py-1 rounded-full border ${
              step === 3 ? "border-emerald-400" : "border-slate-700"
            }`}>
              3. Resultado
            </span>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-900/50 border border-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <h2 className="text-lg font-medium mb-2">
                Cuéntanos sobre tu vivienda
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">
                    Dirección (calle y número)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step1.address}
                    onChange={(e) =>
                      handleStep1Change("address", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Municipio</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step1.city}
                    onChange={(e) =>
                      handleStep1Change("city", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Tipo de vivienda</label>
                  <select
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step1.type}
                    onChange={(e) =>
                      handleStep1Change("type", e.target.value)
                    }
                    required
                  >
                    <option value="">Selecciona...</option>
                    <option value="piso">Piso</option>
                    <option value="atico">Ático</option>
                    <option value="bajo">Bajo</option>
                    <option value="chalet">Chalet</option>
                    <option value="duplex">Dúplex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Superficie aproximada (m²)
                  </label>
                  <input
                    type="number"
                    min={20}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step1.size}
                    onChange={(e) =>
                      handleStep1Change("size", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Habitaciones</label>
                  <input
                    type="number"
                    min={1}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step1.bedrooms}
                    onChange={(e) =>
                      handleStep1Change("bedrooms", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Baños</label>
                  <input
                    type="number"
                    min={1}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step1.bathrooms}
                    onChange={(e) =>
                      handleStep1Change("bathrooms", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    ¿Tiene garaje?
                  </label>
                  <div className="flex gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasGarage", "si")}
                      className={`px-3 py-2 rounded-xl border ${
                        step1.hasGarage === "si"
                          ? "border-emerald-400 bg-emerald-500/10"
                          : "border-slate-700"
                      }`}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasGarage", "no")}
                      className={`px-3 py-2 rounded-xl border ${
                        step1.hasGarage === "no"
                          ? "border-emerald-400 bg-emerald-500/10"
                          : "border-slate-700"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    ¿Tiene terraza o balcón?
                  </label>
                  <div className="flex gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasTerrace", "si")}
                      className={`px-3 py-2 rounded-xl border ${
                        step1.hasTerrace === "si"
                          ? "border-emerald-400 bg-emerald-500/10"
                          : "border-slate-700"
                      }`}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStep1Change("hasTerrace", "no")}
                      className={`px-3 py-2 rounded-xl border ${
                        step1.hasTerrace === "no"
                          ? "border-emerald-400 bg-emerald-500/10"
                          : "border-slate-700"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">
                    Estado de la vivienda
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step1.condition}
                    onChange={(e) =>
                      handleStep1Change("condition", e.target.value as any)
                    }
                    required
                  >
                    <option value="">Selecciona...</option>
                    <option value="reformar">Para reformar</option>
                    <option value="buen_estado">Buen estado</option>
                    <option value="reformado">Reformado</option>
                    <option value="obra_nueva">Obra nueva / casi nuevo</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-sm font-medium transition"
                >
                  Continuar
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <h2 className="text-lg font-medium mb-2">
                Último paso: te mostramos el rango de precio
              </h2>
              <p className="text-sm text-slate-300 mb-4">
                Déjanos tus datos de contacto. Te mostraremos una estimación
                orientativa y, si quieres, afinamos el precio contigo por
                teléfono o WhatsApp.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step2.name}
                    onChange={(e) =>
                      handleStep2Change("name", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step2.phone}
                    onChange={(e) =>
                      handleStep2Change("phone", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
                    value={step2.email}
                    onChange={(e) =>
                      handleStep2Change("email", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300 mt-2">
                <input
                  id="privacy"
                  type="checkbox"
                  className="mt-1"
                  checked={step2.acceptPrivacy}
                  onChange={(e) =>
                    handleStep2Change("acceptPrivacy", e.target.checked)
                  }
                />
                <label htmlFor="privacy">
                  Acepto la política de privacidad y el tratamiento de mis datos
                  para recibir esta valoración orientativa de mi vivienda.
                </label>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 rounded-2xl border border-slate-700 text-sm"
                  onClick={() => setStep(1)}
                >
                  Volver atrás
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-sm font-medium transition disabled:opacity-60"
                >
                  {submitting ? "Calculando..." : "Ver mi precio aproximado"}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && result && (
            <div className="space-y-5">
              <h2 className="text-lg font-medium mb-2">
                Esta podría ser la horquilla de precio de tu vivienda
              </h2>

              <p className="text-sm text-slate-300">
                Según los datos que nos has dado y teniendo en cuenta operaciones
                similares en tu zona, el precio de mercado aproximado de tu
                vivienda podría estar entre:
              </p>

              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/60 text-center">
                <p className="text-sm text-slate-400 mb-2">
                  Rango orientativo de venta
                </p>
                <p className="text-2xl font-semibold">
                  {formatPrice(result.minPrice)}{" "}
                  <span className="text-sm text-slate-400 mx-1">y</span>
                  {formatPrice(result.maxPrice)}
                </p>
              </div>

              <p className="text-xs text-slate-400">
                ⚠️ Esta valoración es aproximada y no sustituye a un
                informe profesional ni a una visita presencial. Podemos afinar
                el precio revisando el estado real de la vivienda, altura, vistas,
                orientación, reformas, IBI, comunidad, etc.
              </p>

              <div className="mt-4 flex flex-col md:flex-row gap-3">
                <button className="flex-1 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-sm font-medium transition">
                  Quiero una valoración más precisa y gratuita
                </button>
                <a
                  href="https://wa.me/34617476695" // aquí pones tu WhatsApp
                  className="flex-1 px-5 py-3 rounded-2xl border border-slate-700 text-sm font-medium text-center"
                >
                  Escríbenos por WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
