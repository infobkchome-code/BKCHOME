"use client";

import { FormEvent, useState } from "react";

export default function LeadForm({
  source,
  title = "Te llamamos",
  subtitle = "Déjanos tus datos y te contactamos.",
}: {
  source: string;
  title?: string;
  subtitle?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim()) {
      setError("Completa nombre y teléfono.");
      return;
    }
    if (!privacy) {
      setError("Debes aceptar la política de privacidad.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source,
          name,
          phone,
          email: email || null,
          message: msg || null,
        }),
      });

      const json = await res.json();
      if (!json?.ok) throw new Error(json?.error || "Error");

      setOk(true);
      setName("");
      setPhone("");
      setEmail("");
      setMsg("");
      setPrivacy(false);
    } catch {
      setError("No se pudo enviar. Inténtalo de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{subtitle}</p>

      {ok && (
        <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
          ✅ Recibido. Te contactamos lo antes posible.
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-900">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-slate-700">Nombre</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. María López"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">Teléfono</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ej. 600 000 000"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">Email (opcional)</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tuemail@..."
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">Mensaje (opcional)</label>
          <textarea
            className="mt-1 w-full min-h-[90px] rounded-xl border border-slate-200 bg-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Cuéntanos qué necesitas y en qué zona..."
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
          y autorizo el contacto para la gestión de mi solicitud.
        </label>

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-emerald-700 text-white py-2.5 text-sm font-semibold hover:bg-emerald-800 disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
