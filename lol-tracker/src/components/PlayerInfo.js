import React from 'react';
import '../css/App.css';

const PlayerInfo = ({ playerData, version }) => (
  <div class="top-container">
    {playerData ? (
      <>
        <div className="summoner-image-overall-container">
          <div className="image-container">
            <img width="100" height="100"
              src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/profileicon/${playerData.profileIconId}.png`}
              alt={`${playerData.profileIconId}'s Profile Icon`}>
            </img>
            <div className="summoner-level-header">
              {playerData.summonerLevel}
            </div>
          </div>
        </div>
        <div class="heading-summoner-text-container">
          {playerData.name} <br />
        </div>
      </>
    ) : (
      <p>No player data available</p>
    )}
  </div>
);

export default PlayerInfo;