import React from 'react';
import '../css/App.css';

function getWinRate(wins, losses) {
  const winRate = (wins / (wins + losses)) * 100
  return Math.round(winRate);
}

function generateRankedContent(data, index, rankType) {
  if (data[index]) {

    return (
      <div className="rank-content">
        <div className="queue-container">
          <div className="rank-content-header">
            <div className="title">
              <div className="bluebar"></div>
              <div className="queue-type"> Ranked {rankType}</div>
            </div>
            <div className="button-placeholder"> <p> v </p> </div>
          </div>
        </div>

        <div className="rank-sub-content">
          <div className="rank-image-container">
            <img
              className="icon"
              src={`https://static.bigbrain.gg/assets/lol/ranks/s13/${data[index]?.tier.toLowerCase()}.png`}
              alt={`${data[index]?.tier} Icon`}
            />
          </div>

          <div className="rank-text-container">
            <div className="rank-row">
              <div className="rank-type-box">
                <p>{data[index]?.tier.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())} {data[index].rank} </p>
              </div>

              <div className="rank-win-loss-box">
                <p> {data[index].wins}W {data[index].losses}L </p>
              </div>
            </div>

            <div className="lp-and-win-rate-row">
              <div className="lp-box">
                <p>{data[index].leaguePoints} LP </p>
              </div>

              <div className="win-rate-box">
                <p> {getWinRate(data[index].wins, data[index].losses)}% </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }}

function generateUnrankedContent(rankType) {
    return (
      <div className="rank-content">
        <div className="queue-container">
          <div className="rank-content-header">
            <div className="title">
              <div className="bluebar"></div>
              <div className="queue-type"> Ranked {rankType} </div>
            </div>
            <div className="ms-rank-image-container">
                <>
                  <img
                    className="icon"
                    src={`https://static.bigbrain.gg/assets/lol/ranks/s13/mini/unranked.svg`}
                    alt={`Unranked Icon`}
                  />
                </>
            </div>
            <div className="unranked-box"> <p> Unranked </p> 
            </div>
          </div>
        </div>
      </div>
    );
}
const RankedInfo = ({ rankedData, playerData }) => (
  <div className="column">
    {rankedData && rankedData.length > 0 ? (
      <>
        {rankedData[0] && rankedData[1] ? (
          <>
            {generateRankedContent(rankedData, 1, "Solo/Duo")}
            {generateRankedContent(rankedData, 0, "Flex")}
          </>
        ) : (
          <>
            {rankedData[0] && rankedData[0].queueType === "RANKED_SOLO_5x5" ? (
              <>
                {generateRankedContent(rankedData, 0, "Solo/Duo")}
                {generateUnrankedContent("Flex")}
              </>
            ) : (
              <>
                {generateUnrankedContent("Solo/Duo")}
                {generateRankedContent(rankedData, 0, "Flex")}
              </>
            )}
          </>
        )}
      </>
    ) : (
      // Handle the case when rankedData is not available
      <>
        {generateUnrankedContent("Solo/Duo")}
        {generateUnrankedContent("Flex")}
      </>
    )}

    {playerData ? (
      // Render navigation content when playerData is available
      <>
        <div className="champion-stats-side-container">
          <p>Champion Stats Placeholder</p>
        </div>

        <div className="rpw-title">
          Recently Played With
        </div>
        <div className="recently-played-with-container">
          <div className="rpw-subheader">
            Summoner
          </div>
          <div className="rpw-subheader">
            Played
          </div>
          <div className="rpw-subheader">
            W-L
          </div>
          <div className="rpw-subheader">
            Win Ratio
          </div>
        </div>

        <div className="rpw-row-container">
          <div className="rpw-row">
            Riyen
          </div>
          <div className="rpw-row">
            13
          </div>
          <div className="rpw-row">
            
          </div>
          <div className="rpw-row">
            
          </div>
        </div>
        <div className="rpw-row-container">
          <div className="rpw-row">
            Plastique
          </div>
          <div className="rpw-row">
            9
          </div>
          <div className="rpw-row">
            
          </div>
          <div className="rpw-row">
            
          </div>
        </div>
        <div className="rpw-row-container">
          <div className="rpw-row">
            dirty willy
          </div>
          <div className="rpw-row">
            9
          </div>
          <div className="rpw-row">
            
          </div>
          <div className="rpw-row">
            
          </div>
        </div>
        <div className="rpw-row-container">
          <div className="rpw-row">
            SOJU
          </div>
          <div className="rpw-row">
            8
          </div>
          <div className="rpw-row">
            
          </div>
          <div className="rpw-row">
            
          </div>
        </div>

        

        
        {/* Additional content related to playerData */}
      </>
    ) : (
      // Render alternative content when playerData is not available
      <p></p>
    )}
  </div>
);

export default RankedInfo;