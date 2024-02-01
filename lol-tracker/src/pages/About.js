import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeamMember from '../components/TeamMember';
import '../css/About.css';

const About = () => {
  useEffect(() => {
    document.title = 'About Us - Arena.GG';
  }, []);

  return (
    <div>
      <nav className="aboutNav">
        <div className="aboutNav-links">
          <Link to="/" className="aboutNav-link">
            <img src="../images/FullLogo.png" alt="Home" className="aboutNav-icon"/>
          </Link>
          <Link to="/data" className="aboutNav-link">Data</Link>
          <Link to="/about" className="aboutNav-link">About Us</Link>
        </div>
      </nav>

      <section id="introSection">
        <div id="introText">
          <h1>Welcome to Arena.GG</h1>
          <p className="about-plain">
            Explore our journey in providing the ultimate destination for League of Legends statistics and insights.
            Join us in enhancing your gaming experience with valuable information and a vibrant community.
          </p>
        </div>
      </section>

      <section id="ourStory">
        <h2>Our Story</h2>
        <p className="about-plain">
          Arena.GG began as an ambitious project by four Drexel University students. As part of our academic journey,
          this project is the result of our efforts in the courses CI 102 and CI 103. We are excited to share our passion
          for gaming and data analysis with the League of Legends community.
        </p>
      </section>

      <section id="teamMission">
        <h2>Team Mission</h2>
        <p className="about-plain">
          Empowering Valorant players with insightful data and enhanced gameplay, our mission is to provide accurate,
          accessible, and intuitive tracking tools. We are dedicated to elevating the Valorant experience,
          helping gamers of all levels maximize their potential and enjoy the game to the fullest.
        </p>
      </section>

      <section id="meetTheTeam">
        <h2>Meet The Team</h2>
        <p className="about-plain">
          Meet our dedicated team of gamers and developers who work tirelessly to bring you the latest and most accurate data.
          Their diverse skills and shared love for gaming make Arena.GG a unique and reliable platform for all LoL enthusiasts.
        </p>
        <div className="teamMembersContainer">
          <TeamMember
            name="Abdul Chaudhry"
            role="Product Owner & Leader"
            caption="Passionate about creating engaging user experiences."
            imageSrc="../images/AbdulIcon.jpg"
          />
          <TeamMember
            name="Caleb Liang"
            role="Full Stack Developer"
            caption="Loves diving into data to uncover valuable insights for gamers."
            imageSrc="../images/CalebIcon.jpg"
          />
          <TeamMember
            name="Hein Pham"
            role="Backend Developer"
            caption="Enthusiastic about server-side development and database management."
            imageSrc="../images/HeinIcon.jpg"
          />
          <TeamMember
            name="Ubaid Khan"
            role="Frontend Developer"
            caption="Bringing creativity to life through intuitive and visually appealing designs."
            imageSrc="../images/UbaidIcon.jpg"
          />
        </div>
      </section>

      <footer>
        <div id="footerContent">
          <div>
            <h3>Arena.GG</h3>
            <p className="about-plain">&copy; 2023-2024 Arena.GG. This is an academic project and NOT a real company.</p>
            <p className="about-plain">
              This website is not affiliated with or endorsed by Riot Games. Our website doesn’t reflect the views 
              or opinions of Riot Games or anyone officially involved in producing or managing League of Legends.
            </p>
          </div>
          <div id="footerLinks">
            <h3>Navigation</h3>
            <Link to="/">Home</Link>
            <Link to="/data">Data</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
