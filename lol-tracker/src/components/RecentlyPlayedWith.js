import React from 'react';
import '../css/App.css';

// RecentlyPlayedWith.js

// Function to analyze recent games and extract recent players played with
function getRecentPlayers(matchDataArray, playerName) {
    const recentPlayers = {};
    matchDataArray.forEach(matchData => {
        const { metadata, info } = matchData;
        const { participants, teams } = info;
        const playerIndex = participants.findIndex(participant => participant.summonerName === playerName);
        const playerTeamId = participants[playerIndex].teamId;
        const playerWin = teams.find(team => team.teamId === playerTeamId).win === 'Win';

        participants.forEach(participant => {
            if (participant.teamId !== playerTeamId && participant.summonerName !== playerName) {
                const teammateName = participant.summonerName;
                if (!recentPlayers[teammateName]) {
                    recentPlayers[teammateName] = { gamesPlayed: 1, wins: 0, losses: 0 };
                } else {
                    recentPlayers[teammateName].gamesPlayed++;
                }
                if (playerWin) {
                    recentPlayers[teammateName].wins++;
                } else {
                    recentPlayers[teammateName].losses++;
                }
            }
        });
    });

    Object.values(recentPlayers).forEach(player => {
        player.winRate = player.wins / player.gamesPlayed;
    });
    
    return recentPlayers;
}

export default RecentlyPlayedWith;