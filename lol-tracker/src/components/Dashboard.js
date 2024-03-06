import React from 'react';
import '../css/App.css';

const Dashboard = ({ playerData }) => (
  <div className="dashboard-container">
    {playerData ? (
      // Render navigation content when playerData is available
      <>
        <div className="overview-bar">
          <p></p>
        </div>

        <div className="dashboard-bar">
          <p></p>
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