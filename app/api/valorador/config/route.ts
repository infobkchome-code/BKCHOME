import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_CRM_URL || "https://back.hipotecasbkc.es";

  try {
    const res = await fetch(`${base}/api/valorador/config`, { cache: "no-store" });
    const contentType = res.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await res.json().catch(() => ({}))
      : { ok: res.ok, status: res.status };

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: "Config fetch failed", details: String(err?.message || err) },
      { status: 502 }
    );
  }
}
