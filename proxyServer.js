var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();
app.use(cors());

const API_KEY = "RGAPI-21ea1c3e-3072-482f-8053-0de3c8c8bc47";

function getPlayerPUUID(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY).then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
};

function getSummonerID(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY).then(response => {
        console.log(response.data);
        return response.data.id
    }).catch(err => err);
};

app.get('/player', async (req, res) => {
    const playerName = req.query.username;
    const API_CALL = "https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY
    const playerData = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(playerData);
    res.json(playerData);
});

app.get('/ranked', async (req, res) => {
    const playerName = req.query.username;
    const summonerID = await getSummonerID(playerName)
    const API_CALL = "https://na1.api.riotgames.com" + "/lol/league/v4/entries/by-summoner/" + summonerID + "?api_key=" + API_KEY
    const rankedData = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(rankedData)
    res.json(rankedData)
})



// GET recentGames
// GET localhost:4000/recentGames
app.get('/recentGames', async (req, res) => {
    const playerName = req.query.username;
    // PUUID
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY

    // get API_CALL
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(gameIDs);

    var matchDataArray = [];
    for (var i = 0; i < gameIDs.length- 15; i++) {
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com" + "/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData);
    }
    res.json(matchDataArray);
});


app.listen(4000, function () {
    console.log("Server started on port 4000");
});