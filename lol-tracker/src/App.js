import {useState} from 'react';
import axios from 'axios';
import './App.css';

// queueIDS for determining what type of match
const gameModes = {
  420: 'Ranked Solo/Duo',
  440: 'Ranked Flex',
  430: 'Normal Blind Pick',
  450: 'ARAM',
  400: 'Normal Draft Pick',
  490: 'Quickplay',
  700: 'Clash',
  830: 'Co-op vs AI Intro Bots',
  840: 'Co-op vs AI Beginner Bots',
  850: 'Co-op vs AI Intermediate Bots',
  900: 'ARURF',
  1020: 'One for All',
  1300: 'Nexus Blitz',
  // Add more if needed
};

function App() {
  const [searchText, setSearchText] = useState("");
  const[gameList, setGameList] = useState("");
  const[playerData, setPlayerData] = useState("");
  const[rankedData, setRankedData] = useState("");
  
  function getPlayerGames(event) {
    axios.get("http://localhost:4000/recentGames", {params: {username: searchText}})
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

  // Determines the game mode type based on unique queueID
  function determineGameMode(queueId) {
    return gameModes[queueId] || 'Unknown Mode';
  }

  // Determines how long match took place based on current time
  function calculateTimeAgo(gameCreationTimestamp) {
    const currentTimestamp = Date.now();
    const gameCreationDate = new Date(gameCreationTimestamp);
  
    const timeDifference = currentTimestamp - gameCreationDate.getTime();
    const secondsAgo = Math.floor(timeDifference / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
  
    if (daysAgo > 0) {
      return `${daysAgo + 1} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutesAgo > 0) {
      return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  }

  function formatGameDuration(gameDurationInSeconds) {
    const minutes = Math.floor(gameDurationInSeconds / 60)
    const seconds = gameDurationInSeconds % 60

    const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedDuration
  }

  return (
    <div className="App">
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={() => {getPlayerGames(); getPlayerData(); getRankedData();}}>Search</button>
      <div className='side-container'></div>
      <div className="top-container">
      {playerData ? (
      <>
        <div className ="image-container">
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

      <div className="nav-container">
        {playerData ? (
          // Render navigation content when playerData is available
          <>
            <div className = "nav-bar">
              <p> Overview | Main Champion Stats</p>
            </div>

            <div className = "dashboard-bar">
              <p> Dashboard PlaceHolder</p>
            </div>
            {/* Additional content related to playerData */}
          </>
        ) : (
          // Render alternative content when playerData is not available
          <p></p>
        )}
      </div>


      <div class="bottom-container">
      <div class="column">
      {rankedData ? (
      <>
        {/* Display Solo/Duo ranked data */}
        {rankedData[0] ? (
          <div class="ranked-box">

            <p>Solo/Duo</p>
            <p>{rankedData[0].tier} {rankedData[0].rank} {rankedData[0].leaguePoints} LP</p>
            <p>{rankedData[0].wins}W {rankedData[0].losses}L {getWinRate(rankedData[0].wins, rankedData[0].losses)}%</p>

          </div>
        ) : (
          //Error Handling Output if no solo/duo rank available
        <div class = "ranked-box">
          <p>Ranked Solo: Unranked </p>
        </div>
        )}
        {/* Display Flex ranked data */}
        {rankedData[1] ? (
          <div class="ranked-box">

            <p>Flex</p>
            <p>{rankedData[1].tier} {rankedData[1].rank} {rankedData[1].leaguePoints} LP</p>
            <p>{rankedData[1].wins}W {rankedData[1].losses}L {getWinRate(rankedData[1].wins, rankedData[1].losses)}%</p>

          </div>
        ) : (
          //Error Handling Output if no flex rank available
        <div class = "ranked-box">
          <p>Ranked Flex: Unranked</p>
        </div>
        )}
      </>
      ):(
      <>

      </>
      )
      }
      
      {playerData ? (
  // Render navigation content when playerData is available
  <>
    <div className="champion-stats-side-container">
      <p>Champion Stats Placeholder</p>
    </div>

    <div className="recently-played-with-container">
      <p>Recently Played with ____ in Past 20 Games Placeholder </p>
    </div>
    {/* Additional content related to playerData */}
    </>
    ) : (
    // Render alternative content when playerData is not available
    <p></p>
    )}

      </div>

      <div class="column">
    {gameList.length !== 0 ? (
      <>
        
        {gameList.map((gameData, index) => (
          <div key={index} className="match-summary-box">
            <h2>Match {index + 1}</h2>
          <div className = "match-summary-box">

            <div className = "content-container">

              <div className = "group-one">
                <div className = "g1-row-one">

                  <div className = "queue-type-box">
                  <p>{determineGameMode(gameData.info.queueId)}</p>
                  </div>

                  <div className = "date-box">
                  <p>{calculateTimeAgo(gameData.info.gameCreation)}</p>                    
                  </div> 
                </div>

                <div className = "g1-row-two">
                    <p> ? LP * </p>
                    
                  </div>
                
                <div className = "g1-row-three">
                  
                  <div className = "win-or-loss-box">
                    <p className={gameData.info.participants[index].win ? 'win' : 'loss'}>
                      {gameData.info.participants[index].win ? 'Win' : 'Loss'}
                    </p>
                  </div>

                  <div className = "match-duration-box">
                    <p>{formatGameDuration(gameData.info.gameDuration)}</p>
                  </div>
                </div>

              </div>

              <div className = "group-two">
                <p> Summoners champion, level, abilities, and runes</p>
              </div>

              <div className = "group-three">
                <p> K/D/A, KDA, CS, vision score</p>
              </div>
              
              <div className = "group-four">
                <p> Items bought from shop</p>
              </div>

              <div className = "group-five">

                <div className="champion-icon-and-summoner-name-column">
                  {gameData.info.participants.slice(0, 5).map((data, participantIndex) => (
                    <div key={participantIndex} className="champion-icon-and-summoner-name-row">
                      {/* Image container with champion icon */}
                      <div className="champion-img-container">
                        <img
                          className="icon"
                          src={`https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${data.championName}.png`}
                          alt={`${data.championName} Icon`}
                        />
                      

                      {/* Summoner name container */}
                      <div className="summoner-name-container">
                        <p className={searchText === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
                      </div>

                      </div>
                    </div>
                  ))}
                </div>

                <div className="champion-icon-and-summoner-name-column">
                  {gameData.info.participants.slice(5, 10).map((data, participantIndex) => (
                    <div key={participantIndex} className="champion-icon-and-summoner-name-row">
                      {/* Image container with champion icon */}
                      <div className="champion-img-container">
                        <img
                          className="icon"
                          src={`https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${data.championName}.png`}
                          alt={`${data.championName} Icon`}
                        />
                      

                      {/* Summoner name container */}
                      <div className="summoner-name-container">
                        <p className={searchText === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
                      </div>

                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className = "dropdown-container">
                <p> V </p>
              </div>

            </div>

          </div>
                </div>
              ))}
            </>
          ) : (
      <p>We have no data!</p>
    )}
  </div>
</div>
    </div>
  );


}

export default App;
