var webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BOHe6bvh6wX4lLr_JArgjQkkssj97nTyd4VZxfGj_vP4YW1BDHxSI2ID6Q79LAameaneou3YbBlXtXZ1W2DkBIc",
  privateKey: "ZDSH1rN6kklq2UkMXxVA8pRi83Ocex-wnmpnpeEcG7A",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/ft8sQQQ0RrQ:APA91bH9reg7w568VQ4qRmqGIqbDvVx9-yOc1s-45UswMABp_UeoJwPDyq3AjJmLkp-CUA42ILV5ir6gs6yk1C4R6edm3bL4WBMJidw2MIzxvNMdYU5vHiQ0gJhIYkIXlnX2bpcKv_Fi",
  keys: {
    p256dh:
      "BNJTpN+Xxn7k9f3S6DonNLa2sERcmgSIi10plyzEyQXY+qhqlqhDCf69QtmT1DWYWOv9vlffz6hJRpf5s55duVM=",
    auth: "guj+aysQh6y0ykDmjhr74A==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";
var options = {
  gcmAPIKey: "41616740540",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
