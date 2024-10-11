var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();
app.use(cors());

const API_KEY = "RGAPI-0b6f460c-458a-4bcc-a531-803ce252c933";

function getPlayerPUUIDbyName(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY).then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
};

function getPlayerPUUIDbyRiotID(playerName, playerTag) {
    return axios.get("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + playerName + "/" + playerTag + "?api_key=" + API_KEY).then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
};

function getSummonerIDbyName(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY).then(response => {
        console.log(response.data);
        return response.data.id
    }).catch(err => err);
};

function getSummonerIDbyRiotID(playerName, playerTag) {
    const PUUID = getPlayerPUUIDbyRiotID(playerName, playerTag);
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-puuid/" + PUUID + "?api_key=" + API_KEY).then(response => {
        console.log(response.data);
        return response.data.id
    }).catch(err => err);
};

app.get('/player', async (req, res) => {
    const playerName = req.query.username;
    const playerTag = req.query.tagline;

    let PUUID;
    if (playerTag === "") {
        PUUID = await getPlayerPUUIDbyName(playerName)
    } else {
        PUUID = await getPlayerPUUIDbyRiotID(playerName, playerTag)
    }

    const API_CALL = "https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-puuid/" + PUUID + "?api_key=" + API_KEY
    const playerData = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(playerData);
    res.json(playerData);
});

app.get('/ranked', async (req, res) => {
    const playerName = req.query.username;
    const playerTag = req.query.tagline;

    let summonerID;
    if (playerTag === "") {
        summonerID = await getSummonerIDbyName(playerName)
    } else {
        summonerID = await getSummonerIDbyRiotID(playerName, playerTag)
    }

    const API_CALL = "https://na1.api.riotgames.com" + "/lol/league/v4/entries/by-summoner/" + summonerID + "?api_key=" + API_KEY
    const rankedData = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(rankedData)
    res.json(rankedData)
})

//const { getRecentPlayers } = require('./RecentlyPlayedWith.js');

// GET recentGames
// GET localhost:4000/recentGames
app.get('/recentGames', async (req, res) => {
    const playerName = req.query.username;
    const playerTag = req.query.tagline;
    // PUUID
    let PUUID;
    if (playerTag === "") {
        PUUID = await getPlayerPUUIDbyName(playerName)
    } else {
        PUUID = await getPlayerPUUIDbyRiotID(playerName, playerTag)
    }

    // get API_CALL
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(gameIDs);

    var matchDataArray = [];
    for (var i = 0; i < gameIDs.length - 10; i++) {
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com" + "/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData);
    }
    //const recentPlayers = getRecentPlayers(matchDataArray, playerName);
    res.json(matchDataArray);
});


app.listen(4000, function () {
    console.log("Server started on port 4000");
});