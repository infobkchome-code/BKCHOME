import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      ...body,
      receivedAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent"),
      referer: req.headers.get("referer"),
      ip: (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || null,
    };

    const webhook = process.env.LEADS_WEBHOOK_URL;

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      console.log("LEAD (sin webhook):", payload);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
