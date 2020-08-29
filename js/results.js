function resultStandings(data) {
  //objek/array dari response.json masuk lewat data yes
  //susun komponen card secara dinamis
  // let classementHTML = "";
  let club = data.standings;
  // let group = data.standings.group;
  console.log(club);

  let classementHTML = "";
  let tableHTML = "";
  let groupHTML = "";
  let groupTableHTML = "";

  club.forEach(function (team, index) {
    let table = team.table;
    console.log(team.group);
    console.log(table);
    let group = team.group;

    groupHTML += `
          <td>${team.group}</td>
        `;

    table.forEach(function (klasemen, index) {
      console.log(klasemen.position);

      classementHTML += `
              <tr>
                <td>${klasemen.position}</td>
                <td>${klasemen.team.name}</td>
                <td>${klasemen.playedGames}</td>
                <td>${klasemen.won}</td>
                <td>${klasemen.draw}</td>
                <td>${klasemen.lost}</td>
                <td>${klasemen.points}</td>
                <td>${klasemen.goalsFor}</td>
              </tr>
        `;
    });
    groupTableHTML +=
      `
          <h4>${group}</h4>
          <table>
          <tr>
            <th class="center-align">Position</th>
            <th>Team</th>
            <th class="center-align">Played</th>
            <th class="center-align">Won</th>
            <th class="center-align">Draw</th>
            <th class="center-align">Lost</th>
            <th class="center-align">GF</th>
            <th class="center-align">GA</th>
          </tr> ` +
      classementHTML +
      `
          </table>
        `;
    document.getElementById("classement").innerHTML = groupTableHTML;
    classementHTML = "";
  });
}

function resultTeam(data) {
  //objek/array dari response.json masuk lewat data yes
  //susun komponen card secara dinamis
  let teamsHTML = "";
  let club = data.teams;
  club.slice(0, 6).forEach(function (team, index) {
    team = JSON.parse(JSON.stringify(team).replace(/http:/g, "https:"));
    teamsHTML += `
              <div  class="col s12 m6 l4">
                <a href="/standings.github.io/pages/detail.html?id=${team.id}">
                  <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img class="activator" src="${team.crestUrl}" alt="image-team">
                    </div>
                    <div class="card-content">
                      <p class="card-title activator grey-text text-darken-4">${team.name}</p>
                    </div>
                  </div>
                </a>
              </div>
            `;
  });
  document.getElementById("teams").innerHTML = teamsHTML;
}

function resultTeamById(data) {
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
}

function resultSavedTeam(teams) {
  let teamsHTML = "";
  console.log(teams.length);
  console.log("result save team");
  if (teams.length != 0) {
    teams.forEach(function (team) {
      teamsHTML += `
                      <div  class="col s12 m6 l4">
                        <a href="/standings.github.io/pages/detail.html?id=${team.id}">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" src="${team.crestUrl}" alt="image-team">
                            </div>
                            <div class="card-content">
                              <p class="card-title activator grey-text text-darken-4">${team.name}</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    `;
    });
  } else {
    teamsHTML = `
      <p>Team Favourite belum ditambahkan</p>
    `;
  }

  // Sisipkan komponen card ke dalam elemen dengan id #teams
  document.getElementById("saves").innerHTML = teamsHTML;
}
