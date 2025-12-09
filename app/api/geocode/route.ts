import { NextResponse } from "next/server";

const cache = new Map<string, any>();

function viewboxFromLatLon(lat: number, lon: number, delta = 0.25) {
  // left,top,right,bottom (lon,lat)
  const left = lon - delta;
  const right = lon + delta;
  const top = lat + delta;
  const bottom = lat - delta;
  return `${left},${top},${right},${bottom}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (q.length < 4) return NextResponse.json({ results: [] });

  const key = q.toLowerCase();
  if (cache.has(key)) return NextResponse.json(cache.get(key));

  // ✅ Vercel geo headers (pueden no venir siempre)
  const h = new Headers(req.headers);
  const country = (h.get("x-vercel-ip-country") || "").toLowerCase();
  const latStr = h.get("x-vercel-ip-latitude");
  const lonStr = h.get("x-vercel-ip-longitude");

  // Por defecto: prioriza Madrid/Toledo
  let viewbox = "-4.80,40.60,-3.20,39.65";

  const lat = latStr ? Number(latStr) : NaN;
  const lon = lonStr ? Number(lonStr) : NaN;
  if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
    viewbox = viewboxFromLatLon(lat, lon, 0.25);
  }

  // Si tu web es SOLO España, yo lo dejaría siempre en ES.
  // Si quieres “solo ES cuando esté en ES”, cambia a: const countrycodes = country === "es" ? "es" : "";
  const countrycodes = "es";

  const url =
    "https://nominatim.openstreetmap.org/search" +
    "?format=jsonv2&addressdetails=1&limit=8&accept-language=es" +
    (countrycodes ? `&countrycodes=${countrycodes}` : "") +
    `&viewbox=${encodeURIComponent(viewbox)}&bounded=0` +
    "&q=" + encodeURIComponent(q);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "BKC Home ValoraTuVivienda/1.0 (https://bkchome.es)",
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });

  if (!res.ok) return NextResponse.json({ results: [] });

  const data = (await res.json()) as any[];

  const results = (data || [])
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
