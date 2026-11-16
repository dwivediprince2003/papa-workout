// App files (page, plan): network-first so updates show up, cache fallback when offline.
// Exercise demos (demos/*.webp, and older remote GIFs): cache-first — they never change,
// so once seen they load instantly and work offline.
const C = "workout-companion-v10";
const DEMOS = "workout-companion-demos-v3";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== C && k !== DEMOS).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  const isDemo = (u.origin === location.origin && u.pathname.includes("/demos/")) || u.hostname === "static.exercisedb.dev";

  if (isDemo) {
    e.respondWith(caches.open(DEMOS).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      const r = await fetch(e.request);
      if (r.ok || r.type === "opaque") c.put(e.request, r.clone());
      return r;
    }));
    return;
  }

  if (u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(C).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
