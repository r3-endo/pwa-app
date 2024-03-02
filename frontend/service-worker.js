const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

// オフラインでも有効にしたいファイルを定義する。以下に定義したものがオフラインキャッシュ領域に格納される
// 参考
// https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerGlobalScope/install_event
self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(["/"]));
});

// fetchイベントをServiceWorkerが監視する。serviceWorkerにコンテンツがある場合はそちらを利用する
// 参考
// https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerGlobalScope/fetch_event
self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request));
});
