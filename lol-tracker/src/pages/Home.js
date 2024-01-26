import {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchInput = document.getElementById("search-inp").value;
    navigate(`/data/${searchInput}`);
  };

  useEffect(() => {
    document.title = 'Arena.GG';
}, []);

  return (
    <div className="Home">
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>
              <Link to="/about">About</Link>
              <ul>
                <li><Link to="/about#ourStory">Our Story</Link></li>
                <li><Link to="/about#teamMission">Team Mission</Link></li>
                <li><Link to="/about#meeTheTeam">Meet The Team</Link></li>
              </ul>
            </li>
            <li><Link to="/data">Service</Link></li>
          </ul>
        </nav>

        <div className="contenir">
          <input type="text" className="search" id="search-inp" placeholder="Search..." />
          <button className="search-btn" id="search-inp-btn" onClick={handleSearch}>&#x027A4;</button>
        </div>

        <div className="text">
          <span className="first-child">League <span className="mid">of</span></span>
          <span className="last-child">Legends</span>
        </div>
      </div>
    </div>
  );
};
export default Home;