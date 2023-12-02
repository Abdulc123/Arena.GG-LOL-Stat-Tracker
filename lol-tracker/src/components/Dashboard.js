import React from 'react';
import '../App.css';

const Dashboard = ({ playerData }) => (
  <div className="dashboard-container">
    {playerData ? (
      // Render navigation content when playerData is available
      <>
        <div className="overview-bar">
          <p> Overview | Main Champion Stats</p>
        </div>

        <div className="dashboard-bar">
          <p> Dashboard PlaceHolder</p>
        </div>
        {/* Additional content related to playerData */}
      </>
    ) : (
      // Render alternative content when playerData is not available
      <p></p>
    )}
  </div>
);

export default Dashboard;