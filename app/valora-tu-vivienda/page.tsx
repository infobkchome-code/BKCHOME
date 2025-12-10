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

  if (state.includes("comunidad de madrid") || name.includes("madrid")) return -20;
  if (county.includes("toledo") || name.includes("toledo")) return -10;
  return 0;
}

// ✅ UTM completo + url/referrer (si no hay nada, devuelve null)
function readAttribution() {
  if (typeof window === "undefined") return null;

  const sp = new URL
