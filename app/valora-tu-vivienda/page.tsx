"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
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
  // fallback si tu API no trae addressdetails
  return /\bEspaña\b/i.test(s.display_name);
}

function scorePreferZonaSur(s: GeoSuggestion) {
  // 0 = normal, menor = más arriba (prioridad)
  const state = (s.address?.state || "").toLowerCase();
  const county = (s.address?.county || "").toLowerCase();
  const name = (s.display_name || "").toLowerCase();

  // Preferimos Madrid y Toledo (sin bloquear el resto de España)
  if (state.includes("comunidad de madrid") || name.includes("madrid")) return -20;
  if (county.includes("toledo") || name.includes("toledo")) return -10;
  return 0;
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
  const [geoSuggestions, setGeoSuggestions] = useState<GeoSugg
