"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type NominatimItem = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
};

export type AddressSelection = {
  label: string;        // corto (Calle X 11)
  fullAddress: string;  // largo (display_name)
  city?: string;
  postcode?: string;
  lat: number;
  lon: number;
};

function prettyLabel(item: NominatimItem) {
  const a = item.address;
  const road = a?.road;
  const num = a?.house_number;
  if (road && num) return `${road} ${num}`;
  if (road) return road;
  // fallback: primera parte antes de la coma
  return item.display_name.split(",")[0]?.trim() || item.display_name;
}

function extractCity(item: NominatimItem) {
  const a = item.address;
  return a?.city || a?.town || a?.village || a?.municipality || a?.suburb;
}

export default function AddressAutocomplete(props: {
  value: string;
  onChange: (v: string) => void;
  onSelect: (sel: AddressSelection) => void;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  countryCode?: string; // default "es"
  // bounding box (minLon,minLat,maxLon,maxLat) para sesgar a Madrid Sur
  viewbox?: string;
  bounded?: boolean; // si true, limita resultados al viewbox
}) {
  const {
    value,
    onChange,
    onSelect,
    placeholder,
    className,
    countryCode = "es",
    viewbox,
    bounded = false,
  } = props;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NominatimItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const query = useMemo(() => value.trim(), [value]);

  useEffect(() => {
    setError(null);

    if (query.length < 3) {
      setItems([]);
      setLoading(false);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);

        abortRef.current?.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("limit", "6");
        url.searchParams.set("countrycodes", countryCode);
        url.searchParams.set("accept-language", "es");
        url.searchParams.set("q", query);

        if (viewbox) url.searchParams.set("viewbox", viewbox);
        if (bounded) url.searchParams.set("bounded", "1");

        const res = await fetch(url.toString(), {
          signal: ac.signal,
          headers: {
            // Nominatim recomienda identificar el cliente; en browser no podemos cambiar User-Agent,
            // pero esto ayuda un poco:
            "Accept": "application/json",
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as NominatimItem[];

        // Filtro extra por seguridad
        const filtered = data.filter((it) => {
          const cc = it.address?.country_code?.toLowerCase();
          if (cc && cc !== countryCode) return false;
          // fallback: si por lo que sea no viene country_code, validamos por texto
          if (!cc && countryCode === "es" && !it.display_name.includes("España")) return false;
          return true;
        });

        setItems(filtered);
        setOpen(true);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setError("No hemos podido buscar direcciones ahora mismo.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(t);
  }, [query, countryCode, viewbox, bounded]);

  // cerrar dropdown al click fuera
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={className}
          autoComplete="off"
          inputMode="text"
        />
        <div className="text-xs text-slate-400 min-w-[70px] text-right">
          {loading ? "Buscando…" : ""}
        </div>
      </div>

      {error ? (
        <div className="mt-2 text-xs text-red-600">{error}</div>
      ) : null}

      {open && items.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <ul className="max-h-72 overflow-auto">
            {items.map((it) => {
              const label = prettyLabel(it);
              const city = extractCity(it);
              const postcode = it.address?.postcode;

              return (
                <li key={it.place_id}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 transition"
                    onMouseDown={(e) => {
                      // importante para que no se cierre antes del click
                      e.preventDefault();
                    }}
                    onClick={() => {
                      const sel: AddressSelection = {
                        label,
                        fullAddress: it.display_name,
                        city,
                        postcode,
                        lat: Number(it.lat),
                        lon: Number(it.lon),
                      };
                      onSelect(sel);
                      setOpen(false);
                    }}
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {label}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-2">
                      {it.display_name}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                      {city ? `${city}` : ""}{postcode ? ` · ${postcode}` : ""}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {open && !loading && query.length >= 3 && items.length === 0 && !error && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-lg px-4 py-3 text-sm text-slate-600">
          No encuentro resultados en España. Prueba con “Calle + número” o añade el municipio.
        </div>
      )}
    </div>
  );
}
