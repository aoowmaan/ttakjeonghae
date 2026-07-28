import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

let workerPromise;
function getWorker() {
  if (!workerPromise) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    workerPromise = import(workerUrl.href).then((module) => module.default);
  }
  return workerPromise;
}

async function render(pathname = "/") {
  const worker = await getWorker();

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished home page without preview artifacts", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>딱정해/);
  assert.match(html, /고민은 짧게/);
  assert.match(html, /모든 게임/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders commercial and representative game routes", async () => {
  const routes = [
    "/games",
    "/about",
    "/help",
    "/privacy",
    "/terms",
    "/play/room-picker",
    "/play/decision-wheel",
    "/play/food-worldcup",
    "/play/travel-type",
    "/play/chaos-balance",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, route);
  }
});

test("keeps the game catalog unique and substantial", async () => {
  const source = await readFile(new URL("../data/games.ts", import.meta.url), "utf8");
  const slugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.ok(slugs.length >= 27);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.match(source, /food-worldcup/);
  assert.match(source, /spicy-relationship-balance/);
});

test("server-renders every published game route", async () => {
  const source = await readFile(new URL("../data/games.ts", import.meta.url), "utf8");
  const slugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);

  for (const slug of slugs) {
    const response = await render(`/play/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /LIVE GAME/, slug);
    assert.doesNotMatch(html, /Application error|Internal Server Error/i, slug);
  }
});

test("includes AdSense, ads.txt, privacy and discovery wiring", async () => {
  const [env, adUnit, adsTxt, privacy, sitemap, manifest] = await Promise.all([
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
    readFile(new URL("../components/ad-unit.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ads.txt/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/manifest.ts", import.meta.url), "utf8"),
  ]);

  assert.match(env, /NEXT_PUBLIC_ADSENSE_SLOT_WIDE/);
  assert.match(env, /ADSENSE_PUBLISHER_ID/);
  assert.match(adUnit, /data-ad-client/);
  assert.match(adsTxt, /google\.com/);
  assert.match(privacy, /Google 광고 쿠키/);
  assert.match(sitemap, /games\.map/);
  assert.match(manifest, /standalone/);
});
