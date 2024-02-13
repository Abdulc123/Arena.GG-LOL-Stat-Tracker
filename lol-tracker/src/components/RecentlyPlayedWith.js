import React from 'react';
import '../css/App.css';

// RecentlyPlayedWith.js

// Function to analyze recent games and extract recent players played with
function getRecentPlayers(matchDataArray, playerName) {
    const recentPlayers = {};
    matchDataArray.forEach(matchData => {
        const { metadata, info } = matchData;
        const { participants } = info;
        const playerIndex = participants.findIndex(participant => participant.summonerName === playerName);
        const teamId = participants[playerIndex].teamId;
        
        participants.forEach(participant => {
            if (participant.teamId === teamId && participant.summonerName !== playerName) {
                if (!recentPlayers[participant.summonerName]) {
                    recentPlayers[participant.summonerName] = 1;
                } else {
                    recentPlayers[participant.summonerName]++;
                }
            }
        });
    });
    return recentPlayers;
}

export default RecentlyPlayedWith;