const publisherId =
  process.env.ADSENSE_PUBLISHER_ID ??
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.replace(/^ca-/, "");

export const dynamic = "force-static";

export function GET() {
  const validPublisherId = /^pub-\d{16}$/.test(publisherId ?? "");
  const body = validPublisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# AdSense publisher ID is not configured yet.\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
