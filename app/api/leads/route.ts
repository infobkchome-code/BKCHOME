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

  const payload = await req.json();

  const res = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-bkc-webhook-key": secret,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
