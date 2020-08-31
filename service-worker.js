importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute(
  [
    { url: "./index.html", revision: "1" },
    { url: "./nav.html", revision: "1" },
    { url: "./push.js", revision: "1" },
    { url: "./manifest.json", revision: "1" },
    { url: "./icon.png", revision: "1" },
    { url: "./service-worker.js", revision: "1" },
    { url: "./css/materialize.min.css", revision: "1" },
    { url: "./css/style.css", revision: "1" },
    { url: "./js/materialize.min.js", revision: "1" },
    { url: "./js/script.js", revision: "1" },
    { url: "./js/api.js", revision: "1" },
    { url: "./js/db.js", revision: "1" },
    { url: "./js/idb.js", revision: "1" },
    { url: "./js/nav.js", revision: "1" },
    { url: "./js/results.js", revision: "1" },
    { url: "./pages/classement.html", revision: "1" },
    { url: "./pages/detail.html", revision: "1" },
    { url: "./pages/saved.html", revision: "1" },
    { url: "./pages/score.html", revision: "1" },
    { url: "./pages/team.html", revision: "1" },
    { url: "./assets/champion.png", revision: "1" },
    { url: "./assets/icon-192x192.png", revision: "1" },
    { url: "./assets/icon-512x512.png", revision: "1" },
    { url: "./assets/icon-96x96.png", revision: "1" },
    { url: "./assets/", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

// workbox.routing.registerRoute(
//   new RegExp("/pages/"),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: "pages",
//   })
// );

workbox.routing.registerRoute(
  ({ url }) => url.origin,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

workbox.routing.registerRoute(
  new RegExp(".*.js"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp("/css/materialize.min.css"),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp(".*.png"),
  workbox.strategies.cacheFirst()
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "/assets/icon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
