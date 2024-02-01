import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    document.title = "Arena.GG";
    const pathSegments = window.location.pathname.split('/');
    const searchParam = pathSegments[pathSegments.indexOf('data') + 1];

    if (searchParam) {
      const decodedSearchParam = decodeURIComponent(searchParam);
      setSearchInput(decodedSearchParam);
      setSearchQuery(decodedSearchParam);
      document.title = decodedSearchParam;
    }
  }, []);

  useEffect(() => {
    if (searchInput) {
      searchSummonerData();
      document.title = searchQuery;
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
      <nav className="appNav">
        <div className="appNav-links">
          <Link to="/" className="appNav-link">
            <img src="../images/FullLogo.png" alt="Home" className="appNav-icon"/>
          </Link>
          <Link to="/data" className="appNav-link">Data</Link>
          <Link to="/about" className="appNav-link">About Us</Link>
        </div>
        <div className="search-bar-container">
          <input type="text" value={searchInput} placeholder="Enter Champion Name..." onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchQuery(searchInput);
                searchSummonerData();
                e.target.blur(); 
              }
            }}
          />
          <button onClick={() => { setSearchQuery(searchInput); searchSummonerData(); }}>Search</button>
        </div>
      </nav>

      <div className="backdrop-container">
        <Backdrop playerData={playerData} gameList={gameList} currentSummonerName={currentSummonerName} searchInput={searchInput} version={version} />
        <PlayerInfo playerData={playerData} version={version} />
        <Dashboard playerData={playerData} />
      </div>

      <div className="bottom-container">
        <RankedInfo rankedData={rankedData} playerData={playerData} />
        <MatchHistory gameList={gameList} rankedData={rankedData} currentSummonerName={currentSummonerName} searchInput={searchInput} version={version} />
      </div>
    </div>
  );
}

export default App;