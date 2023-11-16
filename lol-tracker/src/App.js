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
                <p> Mode,date,LP,Win/loss, Match Duration</p>
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
