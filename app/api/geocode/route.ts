import { NextResponse } from "next/server";

const cache = new Map<string, any>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = (searchParams.get("q") || "").trim();
  if (q.length < 4) return NextResponse.json({ results: [] });

  const key = q.toLowerCase();
  if (cache.has(key)) return NextResponse.json(cache.get(key));

  // ✅ España + prioriza Madrid/Toledo (sin bloquear el resto de España)
  // viewbox: left,top,right,bottom (lon,lat)
  // Aproximación: zona centro (Madrid/Toledo) para sugerencias más útiles
  const viewbox = "-4.80,40.60,-3.20,39.65";

  const url =
    "https://nominatim.openstreetmap.org/search" +
    "?format=jsonv2" +
    "&addressdetails=1" +
    "&limit=8" +
    "&accept-language=es" +
    "&countrycodes=es" +
    "&viewbox=" +
    encodeURIComponent(viewbox) +
    "&bounded=0" + // 0 = prioriza viewbox pero permite fuera (dentro de ES)
    "&q=" +
    encodeURIComponent(q);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "BKC Home ValoraTuVivienda/1.0 (https://bkchome.es)",
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });

  if (!res.ok) return NextResponse.json({ results: [] });

  const data = (await res.json()) as any[];

  const results = (data || [])
    // ✅ doble filtro (por si Nominatim devolviera algo raro)
    .filter((r) => (r?.address?.country_code || "").toLowerCase() === "es")
    .map((r) => ({
      place_id: r.place_id,
      display_name: r.display_name,
      lat: Number(r.lat),
      lon: Number(r.lon),
      address: r.address,
      type: r.type,
    }));

  const payload = { results };
  cache.set(key, payload);

  return NextResponse.json(payload);
}
