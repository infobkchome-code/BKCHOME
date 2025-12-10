import { NextResponse } from "next/server";

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
      { ok: false, error: "CRM webhook fetch failed", details: String(err?.message || err) },
      { status: 502 }
    );
  }
}
