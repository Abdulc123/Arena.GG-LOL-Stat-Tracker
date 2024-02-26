import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchInput = encodeURIComponent(document.getElementById("search-inp").value);
    navigate(`/data/${searchInput}`);
  };

  useEffect(() => {
    document.title = 'Arena.GG';
  }, []);

  return (
    <div className="Home">
      <div className="container">
        <nav className="navbar">
          <ul>
            <Link to="/">
              <img src="../images/FullLogo-White.png" alt="Home" className="navbar-icon" />
            </Link>
            <li><Link to="/data" className="navbar-link">Data</Link></li>
            <li><Link to="/about" className="navbar-link">About Us</Link></li>
          </ul>
        </nav>

        <div className="contenir">
          <input type="text" className="search" id="search-inp" placeholder="Search..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                e.target.blur(); // Blur the input field
              }
            }}
          />
          <button className="search-btn" id="search-inp-btn" onClick={handleSearch}>&#x027A4;</button>

        </div>

        <div className="arena">
          <span className="last-child">Arena.GG</span>
          <img src="../images/Logo.png" alt="Home" className="logo"></img>
        </div>
      </div>
    </div>
  );
};
export default Home;