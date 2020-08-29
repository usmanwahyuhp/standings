let dbPromised = idb.open("champion-league", 1, function (upgradeDB) {
  console.log("upgradeDB");
  let teamObjectStore = upgradeDB.createObjectStore("teams", {
    keyPath: "id",
  });
  teamObjectStore.createIndex("post_title", "name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      // console.log(team);
      console.log(team.id);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team baru ditambahkan");
      M.toast({
        html: "Data berhasil ditambahkan!",
      });
    })
    .catch(function (error) {
      console.log(error);
      M.toast({
        html: "Terjadi Kesalahan",
      });
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        console.log("masukgetAll");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(function (teams) {
        console.log("masukgetById dan datanya");
        console.log(teams);
        resolve(teams);
      });
  });
}

function deleteByid(idParam) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      return store.delete(idParam.id);
    })
    .then(function () {
      console.log("Item deleted");
      M.toast({
        html: "Data berhasil dihapus dari favorit!",
      });
    })
    .catch(function (error) {
      console.log("idParam");
      console.log(idParam.id);
      console.log(error);
      M.toast({
        html: "terjadi kesalahan",
      });
    });
}
