// let base_url = "https://api.football-data.org/v2/competitions/CL/";
let base_url = "https://api.football-data.org/v2/";
const token = "b931f071ccc548bda3870d2b63107506";

let fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": token,
    },
  });
};

//block jika fetch berhasil hore
function status(response) {
  if (response.status !== 200) {
    console.log("Error: " + response.status);
    //method reject agar block catch ter-panggil
    return Promise.reject(new Error(response.statusText));
  } else {
    //objek ke promise untuk keperluan then
    return Promise.resolve(response);
  }
}

//parsing json to array js
function json(response) {
  return response.json();
}

//handle error di block catch
function error(error) {
  //parameter error dari promise.reject
  console.log("Error: " + error);
}

//request data json Team
function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/CL/teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("data getTeams from chaches Team");
          resultTeam(data);
        });
      }
    });
  }

  fetchApi(base_url + "competitions/CL/teams")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log("data getTeams from Fetch Team");
      resultTeam(data);
    })
    .catch(error);
}

// Request detail team
function getTeamByid() {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParams = urlParams.get("id");
    console.log("masuk getTeamById");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParams).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log("data getTeamById from chaches teambyid");
            console.log(data);

            let teamHTML = "";
            teamHTML += `
                          <div class="team-detail center">
                            <img class="responsive-img" src="${data.crestUrl}" alt="image-team">
                            <h4>${data.name}</h4>
                            <table>
                                <tr>
                                  <th>Country</th>
                                  <td>${data.area.name}</td>
                                </tr>
                                <tr>
                                  <th>Address</th>
                                  <td>${data.address}</td>
                                </tr>
                                <tr>
                                  <th>Website</th>
                                  <td>${data.website}</td>
                                </tr>
                                <tr>
                                  <th>Stadium</th>
                                  <td>${data.venue}</td>
                                </tr>
                                <tr>
                                  <th>Founded</th>
                                  <td>${data.founded}</td>
                                </tr>
                                <tr>
                                  <th>Club Colour</th>
                                  <td>${data.clubColors}</td>
                                </tr>
                            </table>
                          </div>
                        `;
            document.getElementById("team").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            // resultTeamById(data);
            resolve(data);
          });
        }
      });
    }

    fetchApi(base_url + "teams/" + idParams)
      .then(status)
      .then(json)
      .then(function (data) {
        console.log("data getTeamById from fetch teambyid");
        // console.log(data);
        // resultTeamById(data);

        let teamHTML = "";
        teamHTML += `
                    <div class="team-detail center">
                      <img class="responsive-img" src="${data.crestUrl}">
                      <h4>${data.name}</h4>
                      <table>
                          <tr>
                            <th>Country</th>
                            <td>${data.area.name}</td>
                          </tr>
                          <tr>
                            <th>Address</th>
                            <td>${data.address}</td>
                          </tr>
                          <tr>
                            <th>Website</th>
                            <td>${data.website}</td>
                          </tr>
                          <tr>
                            <th>Stadium</th>
                            <td>${data.venue}</td>
                          </tr>
                          <tr>
                            <th>Founded</th>
                            <td>${data.founded}</td>
                          </tr>
                          <tr>
                            <th>Club Colour</th>
                            <td>${data.clubColors}</td>
                          </tr>
                      </table>
                    </div>
                  `;
        document.getElementById("team").innerHTML = teamHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch(error);
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log("data getAll:");
    console.log(teams);
    // Menyusun komponen card team secara dinamis
    resultSavedTeam(teams);
  });
}

function getSavedTeamById() {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    console.log("idParam getSavedById = " + idParam);

    getById(idParam).then(function (teams) {
      console.log("masuk getSavedTeamByID");
      console.log(teams);
      let teamHTML = "";
      teamHTML += `
      <div class="team-detail center">
        <img class="responsive-img" src="${teams.crestUrl}" alt="image-team">
        <h4>${teams.name}</h4>
        <table>
            <tr>
              <th>Country</th>
              <td>${teams.area.name}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>${teams.address}</td>
            </tr>
            <tr>
              <th>Website</th>
              <td>${teams.website}</td>
            </tr>
            <tr>
              <th>Stadium</th>
              <td>${teams.venue}</td>
            </tr>
            <tr>
              <th>Founded</th>
              <td>${teams.founded}</td>
            </tr>
            <tr>
              <th>Club Colour</th>
              <td>${teams.clubColors}</td>
            </tr>
        </table>
      </div>
  `;
      document.getElementById("team").innerHTML = teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(teams);
    });
  });
}

function getClassement() {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/CL/standings?standingType=TOTAL")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log("data getClassement from chaches Standings");

            resultStandings(data);
          });
        }
      });
  }

  fetchApi(base_url + "competitions/CL/standings?standingType=TOTAL")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log("data getClassement from Fetch Standings");
      //objek/array dari response.json masuk lewat data yes
      //susun komponen card secara dinamis
      resultStandings(data);
    })
    .catch(error);
}
