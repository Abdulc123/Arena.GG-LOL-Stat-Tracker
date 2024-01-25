import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/App.css';
import Backdrop from '../components/Backdrop';
import PlayerInfo from '../components/PlayerInfo';
import Dashboard from '../components/Dashboard';
import RankedInfo from '../components/RankedInfo';
import MatchHistory from '../components/MatchHistory';

const version = '14.1.1';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSummonerName, setCurrentSummonerName] = useState("");
  const [gameList, setGameList] = useState("");
  const [playerData, setPlayerData] = useState("");
  const [rankedData, setRankedData] = useState("");

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const searchParam = pathSegments[pathSegments.indexOf('data') + 1];

    if (searchParam) {
      setSearchInput(decodeURIComponent(searchParam));
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, []);

  useEffect(() => {
    if (searchInput) {
      searchSummonerData();
    }
  }, [searchQuery])

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const searchSummonerData = () => {
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

    window.history.pushState({}, '', `/data/${encodeURIComponent(searchInput)}`);
  }

  return (
    <div className="App">
      <input type="text" value={searchInput} onChange={handleInputChange}></input>
      <button onClick={() => { setSearchQuery(searchInput); searchSummonerData(); }}>Search</button>

      <div className="backdrop-container">
        <Backdrop playerData={playerData} gameList={gameList} currentSummonerName={currentSummonerName} searchInput={searchInput} version={version}  />
        <PlayerInfo playerData={playerData} version={version} />
        <Dashboard playerData={playerData} />
      </div>

      <div className="bottom-container">
        <RankedInfo rankedData={rankedData} playerData={playerData} />
        <MatchHistory gameList={gameList} currentSummonerName={currentSummonerName} searchInput={searchInput} version={version} />
      </div>
    </div>
  );
}

export default App;