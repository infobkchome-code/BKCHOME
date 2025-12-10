import { NextResponse } from "next/server";

function extractAttributionFromUrl(url: string) {
  try {
    const u = new URL(url);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "msclkid",
    ] as const;

    const out: Record<string, string> = {};
    let any = false;

    for (const k of keys) {
      const v = u.searchParams.get(k);
      if (v) {
        out[k] = v;
        any = true;
      }
    }

    // Siempre guardo la URL de entrada (sirve aunque no haya UTMs)
    out.url = u.toString();

    return any ? out : null;
  } catch {
    return null;
  }
}

function hasUsefulUtm(x: any) {
  if (!x) return false;
  if (typeof x !== "object") return true; // si viene string, lo consideramos “válido”
  return Object.keys(x).length > 0;
}

export async function POST(req: Request) {
  const webhook = process.env.CRM_LEADS_WEBHOOK_URL;
  const secret = process.env.BKC_WEBHOOK_KEY;

  if (!webhook || !secret) {
    return NextResponse.json(
      { ok: false, error: "Missing server env vars" },
      { status: 500 }
    );
  }

  let payload: any = null;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Validación mínima (evita basura)
  if (!payload?.step1 || !payload?.step2) {
    return NextResponse.json(
      { ok: false, error: "Missing step1/step2" },
      { status: 400 }
    );
  }

  // ✅ Si el front no manda UTM (o viene vacío), lo sacamos del Referer
  if (!hasUsefulUtm(payload.utm)) {
    const referer = req.headers.get("referer") || "";
    const utmFromRef = referer ? extractAttributionFromUrl(referer) : null;
    if (utmFromRef) payload.utm = utmFromRef;
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-bkc-webhook-key": secret,
      },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json().catch(() => ({}))
      : { ok: res.ok, status: res.status, text: await res.text().catch(() => "") };

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: "CRM webhook fetch failed",
        details: String(err?.message || err),
      },
      { status: 502 }
    );
  }
}
