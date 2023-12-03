import React from 'react';
import '../css/App.css';

function getWinRate(wins, losses) {
  const winRate = (wins / (wins + losses)) * 100
  return Math.round(winRate);
}

const RankedInfo = ({ rankedData, playerData }) => (
  <div class="column">
    {rankedData ? (
      <>
        {/* Display Solo/Duo ranked data */}
        {rankedData[0] ? (
          <div class="rank-content">
            <div class="queue-container">
              <div class="rank-content-header">
                <div class="title">
                  <div class="bluebar"></div>
                  <div class="queue-type"> Ranked Solo/Duo</div>
                </div>
                <div class="button-placeholder"> <p> v </p> </div>
              </div>
            </div>

            <div class="rank-sub-content">
              <div class="rank-image-container">
                <img
                  className="icon"
                  src={`https://static.bigbrain.gg/assets/lol/ranks/s13/${rankedData[0]?.tier.toLowerCase()}.png`}
                  alt={`${rankedData[0]?.tier} Icon`}
                />
              </div>

              <div class="rank-text-container">
                <div class="rank-row">
                  <div class="rank-type-box">
                    <p>{rankedData[0]?.tier.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())} {rankedData[0].rank} </p>
                  </div>

                  <div class="rank-win-loss-box">
                    <p> {rankedData[0].wins}W {rankedData[0].losses}L </p>
                  </div>
                </div>

                <div class="lp-and-win-rate-row">
                  <div class="lp-box">
                    <p>{rankedData[0].leaguePoints} LP </p>
                  </div>

                  <div class="win-rate-box">
                    <p> {getWinRate(rankedData[0].wins, rankedData[0].losses)}% </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          //Error Handling Output if no solo/duo rank available
          <div class="rank-content">
            <div class="queue-container">
              <div class="rank-content-header">
                <div class="title">
                  <div class="bluebar"></div>
                  <div class="queue-type"> Ranked Solo/Duo </div>
                </div>
                <div class="unranked-box"> <p> Unranked </p> </div>
              </div>
            </div>
          </div>
        )}
        {/* Display Flex ranked data */}
        {rankedData[1] ? (
          <div class="rank-content">
            <div class="queue-container">
              <div class="rank-content-header">
                <div class="title">
                  <div class="bluebar"></div>
                  <div class="queue-type"> Ranked Flex</div>
                </div>
                <div class="button-placeholder"> <p> v </p> </div>
              </div>
            </div>

            <div class="rank-sub-content">
              <div class="rank-image-container">
                <img
                  className="icon"
                  src={`https://static.bigbrain.gg/assets/lol/ranks/s13/${rankedData[1]?.tier.toLowerCase()}.png`}
                  alt={`${rankedData[1]?.tier} Icon`}
                />
              </div>

              <div class="rank-text-container">
                <div class="rank-row">
                  <div class="rank-type-box">
                    <p>{rankedData[1]?.tier.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())} {rankedData[1].rank} </p>
                  </div>

                  <div class="rank-win-loss-box">
                    <p> {rankedData[1].wins}W {rankedData[1].losses}L </p>
                  </div>
                </div>

                <div class="lp-and-win-rate-row">
                  <div class="lp-box">
                    <p>{rankedData[1].leaguePoints} LP </p>
                  </div>

                  <div class="win-rate-box">
                    <p> {getWinRate(rankedData[1].wins, rankedData[1].losses)}% </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          //Error Handling Output if no flex rank available
          <div class="rank-content">
            <div class="queue-container">
              <div class="rank-content-header">
                <div class="title">
                  <div class="bluebar"></div>
                  <div class="queue-type"> Ranked Flex</div>
                </div>
                <div class="unranked-box"> <p> Unranked </p> </div>
              </div>
            </div>
          </div>
        )}
      </>
    ) : (
      <>
      </>
    )
    }

    {playerData ? (
      // Render navigation content when playerData is available
      <>
        <div className="champion-stats-side-container">
          <p>Champion Stats Placeholder</p>
        </div>

        <div className="recently-played-with-container">
          <p>Recently Played with ____ in Past 20 Games Placeholder </p>
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