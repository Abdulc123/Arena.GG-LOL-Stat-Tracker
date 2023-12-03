import { useState } from 'react';
import axios from 'axios';
import '../css/App.css';
import PlayerInfo from '../components/PlayerInfo';
import Dashboard from '../components/Dashboard';
import RankedInfo from '../components/RankedInfo';
import MatchHistory from '../components/MatchHistory';

const version = '13.23.1';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [currentSummonerName, setCurrentSummonerName] = useState("");
  const [gameList, setGameList] = useState("");
  const [playerData, setPlayerData] = useState("");
  const [rankedData, setRankedData] = useState("");

  function handleInputChange(event) {
    setSearchInput(event.target.value);
  }

  function searchSummonerData() {
    setCurrentSummonerName(searchInput);
    axios.get("http://localhost:4000/recentGames", { params: { username: searchInput } })
      .then(function (response) {
        setGameList(response.data);
      }).catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:4000/player", { params: { username: searchInput } })
      .then(function (response) {
        setPlayerData(response.data);
      }).catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:4000/ranked", { params: { username: searchInput } })
      .then(function (response) {
        setRankedData(response.data);
      }).catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <input type="text" value={searchInput} onChange={handleInputChange}></input>
      <button onClick={searchSummonerData}>Search</button>

      <div className="backdrop-container">
        <div className="champ-background-image"> </div>
        <PlayerInfo playerData={playerData} version={version} />
        <Dashboard playerData={playerData} />
      </div>

      <div class="bottom-container">
        <RankedInfo rankedData={rankedData} playerData={playerData} />
        <MatchHistory gameList={gameList} currentSummonerName={currentSummonerName} searchInput={searchInput} version={version} />
      </div>
    </div>
  );
}

export default App;