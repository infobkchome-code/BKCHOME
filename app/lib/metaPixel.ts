export function fbqTrack(event: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;
  const fbq = (window as any).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}
