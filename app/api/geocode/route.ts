import { NextResponse } from "next/server";

const cache = new Map<string, any>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();

  if (q.length < 4) return NextResponse.json({ results: [] });

  const key = q.toLowerCase();
  if (cache.has(key)) return NextResponse.json(cache.get(key));

  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&q=" +
    encodeURIComponent(q);

  const res = await fetch(url, {
    headers: {
      // Nominatim recomienda identificar el cliente
      "User-Agent": "BKC Home ValoraTuVivienda/1.0 (https://bkchome.es)",
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });

  if (!res.ok) return NextResponse.json({ results: [] });

  const data = (await res.json()) as any[];

  const results = (data || []).map((r) => ({
    place_id: r.place_id,
    display_name: r.display_name,
    lat: Number(r.lat),
    lon: Number(r.lon),
    address: r.address, // city/town/municipality/postcode/etc
    type: r.type,
  }));

  const payload = { results };
  cache.set(key, payload);

  return NextResponse.json(payload);
}
