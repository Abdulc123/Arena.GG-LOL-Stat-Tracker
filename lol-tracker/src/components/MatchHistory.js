import React from 'react';
import '../css/App.css';

// queueIDS for determining what type of match
const gameModes = {
  420: 'Ranked Solo/Duo',
  440: 'Ranked Flex',
  430: 'Normal Blind Pick',
  450: 'ARAM',
  400: 'Normal Draft Pick',
  490: 'Quickplay',
  700: 'Clash',
  830: 'Co-op vs AI Intro Bots',
  840: 'Co-op vs AI Beginner Bots',
  850: 'Co-op vs AI Intermediate Bots',
  900: 'ARURF',
  1020: 'One for All',
  1300: 'Nexus Blitz',
  1700: 'Arena'
  // Add more if needed
};

const summonerSpellMapping = {
  21: 'SummonerBarrier',
  1: 'SummonerBoost',
  2202: 'SummonerCherryFlash',
  2201: 'SummonerCherryHold',
  14: 'SummonerDot',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  13: 'SummonerMana',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  11: 'SummonerSmite',
  39: 'SummonerSnowURFSnowball_Mark',
  32: 'SummonerSnowball',
  12: 'SummonerTeleport',
  54: 'Summoner_UltBookPlaceholder',
  55: 'Summoner_UltBookSmitePlaceholder',
  // Add more mappings as needed
};

const runeStyleMapping = {
  8000: 'Precision',
  8100: 'Domination',
  8200: 'Sorcery',
  8400: 'Resolve',
  8300: 'Inspiration',
};

const keystoneMapping = {
  8005: 'PressTheAttack',
  8008: 'LethalTempo', // good 1/2 LethalTempoTemp
  8021: 'FleetFootwork',
  8010: 'Conqueror',
  8112: 'Electrocute',
  8124: 'Predator',
  8128: 'DarkHarvest',
  9923: 'HailOfBlades',
  8214: 'SummonAery',
  8229: 'ArcaneComet',
  8230: 'PhaseRush',
  8437: 'GraspOfTheUndying',
  8439: 'VeteranAftershock',
  8465: 'Guardian',
  8351: 'GlacialAugment',
  8360: 'UnsealedSpellbook',
  8369: 'FirstStrike',
};

// Determines the game mode type based on unique queueID
function determineGameMode(queueId) {
  return gameModes[queueId] || 'Unknown Mode';
}

// Determines how long match took place based on current time
function calculateTimeAgo(gameCreationTimestamp) {
  const currentTimestamp = Date.now();
  const gameCreationDate = new Date(gameCreationTimestamp);

  const timeDifference = currentTimestamp - gameCreationDate.getTime();
  const secondsAgo = Math.floor(timeDifference / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);

  if (monthsAgo > 0) {
    return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
  } else if (daysAgo > 0) {
    return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
}

function formatGameDuration(gameDurationInSeconds) {
  const minutes = Math.floor(gameDurationInSeconds / 60)
  const seconds = gameDurationInSeconds % 60

  const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return formattedDuration
}

const MatchHistory = ({ gameList, currentSummonerName, searchInput, version }) => (
  <div class="column">
    {gameList.length !== 0 ? (
      <>
        {gameList.map((gameData, index) => {
          const searchedParticipant = gameData.info.participants.find(participant => participant.summonerName === currentSummonerName);
          const runePrimaryPath = runeStyleMapping[searchedParticipant?.perks.styles[0].style];
          const runePrimaryKeystone = keystoneMapping[searchedParticipant?.perks.styles[0].selections[0].perk];

          return (
            <div key={index} className="match-summary-box">

              <div className="content-container">

                <div className="group-one">
                  <div className="g1-row-one">
                    <div className="queue-type-box">
                      <p>{determineGameMode(gameData.info.queueId)}</p>
                    </div>

                    <div className="date-box">
                      <p>{calculateTimeAgo(gameData.info.gameCreation)}</p>
                    </div>
                  </div>

                  <div className="g1-row-two">
                    <p> ? LP * </p>
                  </div>

                  <div className="g1-row-three">
                    <div className="win-or-loss-box">
                      {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                        <>
                          <p className={searchedParticipant?.win ? 'win' : 'loss'}>
                            {searchedParticipant?.win ? 'Win' : 'Loss'}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="match-duration-box">
                      <p>{formatGameDuration(gameData.info.gameDuration)}</p>
                    </div>
                  </div>
                </div>

                <div className="group-two">
                  <div className="g2-row-one">
                    <div className="g2-champion-container">
                      <div className="g2-champion-face">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                            <img
                              className="icon"
                              src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${searchedParticipant?.championName === 'FiddleSticks' ? 'Fiddlesticks' : searchedParticipant?.championName}.png`}
                              alt={`${searchedParticipant?.championName} Icon`}
                            />
                            <div className="champion-level">
                              {searchedParticipant?.champLevel}
                            </div>
                          </>

                        )}
                      </div>
                    </div>
                  </div>

                  <div className="g2-row-two">
                    <div className="summoner-spells-column">
                      {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                        <>
                          <div className="summoner-spell">
                            <img
                              className="icon1"
                              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[searchedParticipant?.summoner1Id]}.png`}
                              alt={`${summonerSpellMapping[searchedParticipant?.summoner1Id]} Icon`}
                            />
                          </div>
                          <div className="summoner-spell">
                            <img
                              className="icon2"
                              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[searchedParticipant?.summoner2Id]}.png`}
                              alt={`${summonerSpellMapping[searchedParticipant?.summoner2Id]} Icon`}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="runes-column">
                      {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                        <>
                          <div className="single-rune">
                            <img
                              className="icon1"
                              src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/small-perk-images/Styles/${runePrimaryPath}/${runePrimaryKeystone}/${runePrimaryKeystone}${runePrimaryKeystone === 'LethalTempo' ? 'Temp' : ''}.png`}
                              alt={`${runePrimaryKeystone} Icon`}
                            />
                          </div>
                          <div className="single-rune">
                            <img
                              className="icon2"
                              src={`https://static.bigbrain.gg/assets/lol/runes/${searchedParticipant.perks.styles[1].style}.png`}
                              alt={`${searchedParticipant.perks.styles[1].style} Icon`}
                            />
                          </div>
                        </>
                      )}
                    </div>

                  </div>

                </div>

                <div className="group-three">
                  <div className="kda">K/D/A</div>
                  <div className="kda-ratio">KDA</div>
                  <div className="cs">CS</div>
                  <div className="vision-score">Vision</div>
                </div>

                <div className="group-four">
                  <div className="item-container">
                    <div className="item-row-1">
                      <div className="item-0"></div>
                      <div className="item-1"></div>
                      <div className="item-2"></div>
                      <div className="item-6"></div>
                    </div>
                    <div className="item-row-2">
                      <div className="item-3"></div>
                      <div className="item-4"></div>
                      <div className="item-5"></div>
                    </div>

                  </div>
                </div>

                <div className="group-five">
                  <div className="champion-icon-and-summoner-name-column">
                    {gameData.info.participants.slice(0, 5).map((data, participantIndex) => (
                      <div key={participantIndex} className="champion-icon-and-summoner-name-row">
                        <div className="champion-img-container">
                          <img
                            className="icon"
                            src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${data.championName === 'FiddleSticks' ? 'Fiddlesticks' : data.championName}.png`}
                            alt={`${data.championName} Icon`}
                          />
                          <div className="summoner-name-container">
                            <p className={searchInput === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="champion-icon-and-summoner-name-column">
                    {gameData.info.participants.slice(5, 10).map((data, participantIndex) => (
                      <div key={participantIndex} className="champion-icon-and-summoner-name-row">
                        <div className="champion-img-container">
                          <img
                            className="icon"
                            src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${data.championName === 'FiddleSticks' ? 'Fiddlesticks' : data.championName}.png`}
                            alt={`${data.championName} Icon`}
                          />
                          <div className="summoner-name-container">
                            <p className={searchInput === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dropdown-container">
                  <p> V </p>
                </div>

              </div>
            </div>
          );
        })}
      </>
    ) : (
      <p>We have no data!</p>
    )}
  </div>
);

export default MatchHistory;