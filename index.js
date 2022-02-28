const searchPlayer = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchText = searchFeild.value;
    searchText.innerHTML = '';
    document.getElementById('spiner').style.display ='block';
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => searchPlayerDisplay(data.player))
    document.getElementById('spiner').style.display ='none';
}
const searchPlayerDisplay = players =>{
    if(players){
        document.getElementById('spiner').style.display ='none';
    }
    else{
        document.getElementById('spiner').style.display ='block';
    }
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML= '';
    players.forEach(player => {
       const div = document.createElement('div');
       div.classList.add('card');
       div.innerHTML = `
       <img class="img-fluid w-50 rounded mx-auto d-block" src="${player.strThumb}" class="card-img-top" alt="...">
       <h4 class="text-center">${player.strPlayer}</h4>
        <div class="card-body">
             <h5 class="card-text text-center">${player.strNationality}</h5>
        </div>
       <div class="text-center p-2">
       <button class="btn btn-danger">Delete</button>
       <button onclick="loadPlayerDeatils(${player.idPlayer})" class="btn btn-success">Details</button>
       </div>`;
        searchResult.appendChild(div);

    });
}
const loadPlayerDeatils = playerId => {
    console.log(playerId);
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayesDetails(data.players[0]))
}

const displayPlayesDetails = player => {
    if(player.strGender == 'Male'){
        document.getElementById('img-male').style.display = "block";
        document.getElementById('img-female').style.display = "none";
    }
    else{
        document.getElementById('img-female').style.display = "block";
        document.getElementById('img-male').style.display = "none";
        
    }
    const playesDetails = document.getElementById('playes-details');
    playesDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${player.strThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${player.strPlayer}</h5>
    <p class="card-text">${player.strDescriptionEN}</p>
    <a href="${player.strTwitter}" class="btn btn-primary">Twiter</a>
  </div>`;
  playesDetails.appendChild(div);
}
