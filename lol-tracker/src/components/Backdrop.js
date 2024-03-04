import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/App.css';

const Backdrop = ({ currentSummonerName, version, playerData }) => {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const bannerVersion = "1";

  // Function to calculate the most played champion
  const calculateMostPlayedChampion = () => {
    if (!Array.isArray(gameList) || gameList.length === 0) {
      return "Kayn"; // Default champion if gameList is empty
    }

    const championCounts = {};
    
    gameList.forEach((gameData) => {
      const searchedParticipant = gameData.info.participants.find(participant => participant.summonerName === currentSummonerName);

      if (searchedParticipant) {
        const championName = searchedParticipant.championName;
        championCounts[championName] = (championCounts[championName] || 0) + 1;
      }
    });

    // Find the champion with the highest count
    let maxCount = 0;
    let mostPlayedChampion = null;

    for (const champion in championCounts) {
      if (championCounts[champion] > maxCount) {
        mostPlayedChampion = champion;
        maxCount = championCounts[champion];
      }
    }

    return mostPlayedChampion || "Kayn"; // Default champion if unable to determine
  };

  const calculateMostRecentChampion = () => {
    if (!Array.isArray(gameList) || gameList.length === 0) {
      return "Kayn"; // Default champion if gameList is empty
    }
  
    // Sort the gameList based on game creation timestamp in descending order
    const sortedGames = gameList.slice().sort((a, b) => b.info.gameCreation - a.info.gameCreation);
  
    const mostRecentGameData = sortedGames.find((gameData) => {
      const searchedParticipant = gameData.info.participants.find(participant => participant.summonerName === currentSummonerName);
      return searchedParticipant;
    });
  
    // Return the championName from the most recent game, or "Kayn" if no game is found
    return mostRecentGameData ? mostRecentGameData.info.participants.find(participant => participant.summonerName === currentSummonerName).championName : "Kayn";
  };

  //const mostPlayedChamp = calculateMostPlayedChampion();
  const mostRecentPlayedChamp = calculateMostRecentChampion();

  // Check if playerData is available before fetching recent games
  useEffect(() => {
    if (playerData) {
      setLoading(true); // Set loading to true when a new player search occurs
      // Fetch recent games and limit to the last 20
      axios.get("http://localhost:4000/recentGames", { params: { username: currentSummonerName } })
        .then(function (response) {
          // Limit the gameList to the last 20 games
          const last20Games = response.data.slice(0, 20);
          setGameList(last20Games);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false when data is loaded (or on error)
        });
    }
  }, [currentSummonerName, playerData]);

  // Render the component based on loading state and playerData
  if (playerData) {
    return (
      <div>
        {loading && <div className="loading-circle"></div>}
        {!loading && mostRecentPlayedChamp && (
          <div className="champ-background-image" 
            style={{ backgroundImage: `url('https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/splash/${mostRecentPlayedChamp}_${bannerVersion}.jpg')` }}
          ></div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Backdrop;
