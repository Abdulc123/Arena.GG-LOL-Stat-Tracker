import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const[gameList, setGameList] = useState("");
  const[playerData, setPlayerData] = useState("");
  const[rankedData, setRankedData] = useState("");
  
  function getPlayerGames(event) {
    axios.get("http://localhost:4000/recentGames", {params: {username: searchText}})
      .then(function (response) {
        setGameList(response.data);
      }).catch (function (error) {
        console.log(error);
      })
  }

  function getPlayerData(event) {
    axios.get("http://localhost:4000/player", {params: {username: searchText}})
      .then(function (response) {
        setPlayerData(response.data);
      }).catch (function (error) {
        console.log(error)
      })
  }
  


  function getRankedData(event) {
    axios.get("http://localhost:4000/ranked", {params: {username: searchText}})
      .then(function (response) {
        setRankedData(response.data);
      }).catch (function (error) {
        console.log(error)
      })
  }


  function getWinRate(wins, losses) {
    const winRate = (wins / (wins + losses)) * 100
    return winRate.toFixed(2);
  }

  return (
    <div className="App">
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={() => {getPlayerGames(); getPlayerData(); getRankedData();}}>Search</button>
      <div className='side-container'></div>
      <div className="top-container">
      {playerData ? (
      <>
        <div class="image-container">
          <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
        </div>
        <div class="text-container">
          {playerData.name} <br />
          {playerData.summonerLevel}
        </div>
      </>
      ) : (
        <p>No player data available</p>
      )}
    
      </div>

      <div class="container">
      <div className="left-container">
      {rankedData ? (
      <>
        {/* Display Solo/Duo ranked data */}
        {rankedData[0] ? (
          <div className="solo-duo-box">
            <p>Solo/Duo</p>
            <p>{rankedData[0].tier} {rankedData[0].rank} {rankedData[0].leaguePoints} LP</p>
            <p>{rankedData[0].wins}W {rankedData[0].losses}L {getWinRate(rankedData[0].wins, rankedData[0].losses)}%</p>
          </div>
        ) : (
          //Error Handling Output if no solo/duo rank available
          <div className="solo-duo-box">
          <p>Ranked Solo: Unranked </p>
          </div>
        )}
        {/* Display Flex ranked data */}
        {rankedData[1] ? (
          <div className="flex-box">
            <p>Flex</p>
            <p>{rankedData[1].tier} {rankedData[1].rank} {rankedData[1].leaguePoints} LP</p>
            <p>{rankedData[1].wins}W {rankedData[1].losses}L {getWinRate(rankedData[1].wins, rankedData[1].losses)}%</p>
          </div>
        ) : (
          //Error Handling Output if no flex rank available
          <div className="flex-box">
          <p>Ranked Flex: Unranked</p>
          </div>
        )}
      </>
      ):(
      <>
      </>
      )
      }
      </div>

      <div className="right-container">
      <div className="dashboard-container">
        <div className="dashboard-title">Match History</div>
        <div>
          {gameList.length !== 0 ? (
  <>        {gameList.map((gameData, index) => {
              let wins = 0; // Initialize wins outside the loop
              // Assuming playerData and gameData are accessible
              const puuid = playerData.puuid;
              const playerIndex = gameData.metadata.participants.indexOf(puuid);
              const playerInfo = gameData.info.participants[playerIndex];

              // Check if player won the game
              if (playerInfo && playerInfo.win === true) {
                wins += 1;
              }

              return (
                <div key={index}>
                <p>Wins: {wins}</p>
                </div>
              );
            })}
  </>
) : (
  <>
    <p>We have no data!</p>
  </>
)}

        </div>
      </div>
      <div className="match-history-container">
      {gameList.length !== 0 ?
        <>
          {
            gameList.map((gameData, index) =>
              <>
                <h2>Game {index + 1}</h2>
                <div>
                  {gameData.info.participants.map((data, participantIndex) =>
                    <p>{data.summonerName}, KDA: {data.kills}/{data.deaths}/{data.assists}, {data.win ? 'Win' : 'Loss'}</p>)
                  }
                </div>
              </>
            )
          }
        </>
      :
        <>
          <p>We have no data!</p>
        </>
      }
      </div>
      </div>
    </div>
    </div>
  );


}

export default App;
