import React, { Component } from 'react';
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


function csperminute(gameDurationInSeconds) {
  const minutes = Math.floor(gameDurationInSeconds / 60)
  return minutes
}

function formatGold(value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  } else {
    return value.toString();
  }
}

{/*Helps with dropdown container toggle */}
class DropdownContent extends Component {
  render() {
    return 
  }
}

{/*Helps with dropdown container toggle */}
class MatchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDropdownIndex: null,
    };
  }

  toggleDropdown = (index) => {
    this.setState((prevState) => ({
      activeDropdownIndex: prevState.activeDropdownIndex === index ? null : index,
    }));
  };

  render() {
    const { gameList, currentSummonerName, searchInput, version } = this.props;
    const { activeDropdownIndex } = this.state;
    // Match summary rendering for ally team and enemy team
    const renderPlayer = (data, participantIndex) => (
      <div key={participantIndex} className="ally-match-summary-row">
      <div className="ms-champion-face">
            <img
              className="icon"
              src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/champion/${data.championName === 'FiddleSticks' ? 'Fiddlesticks' : data.championName}.png`}
              alt={`${data.championName} Icon`}
            />
            <div className="champion-level">{data.champLevel}</div>
      </div>

      <div className="g2-row-two">
        <div className="summoner-spells-column">
            <>
              <div className="summoner-spell">
                <img
                  className="icon1"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[data.summoner1Id]}.png`}
                  alt={`${summonerSpellMapping[data.summoner1Id]} Icon`}
                />
              </div>
              <div className="summoner-spell">
                <img
                  className="icon2"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[data.summoner2Id]}.png`}
                  alt={`${summonerSpellMapping[data.summoner2Id]} Icon`}
                />
              </div>
            </>
          
        </div>

        <div className="runes-column">
            <>
              <div className="single-rune">
                <img
                  className="icon1"
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/small-perk-images/Styles/${runeStyleMapping[data.perks.styles[0].style]}/${keystoneMapping[data.perks.styles[0].selections[0].perk]}/${keystoneMapping[data.perks.styles[0].selections[0].perk]}${keystoneMapping[data.perks.styles[0].selections[0].perk] === 'LethalTempo' ? 'Temp' : ''}.png`}
                  alt={`${keystoneMapping[data.perks.styles[0].selections[0].perk]} Icon`}
                />
              </div>
              <div className="single-rune">
                <img
                  className="icon2"
                  src={`https://static.bigbrain.gg/assets/lol/runes/${data.perks.styles[1].style}.png`}
                  alt={`${data.perks.styles[1].style} Icon`}
                />
              </div>
            </>
        </div>

      </div>

      <div>
        Name and Rank
      </div>

      <div>
        <div className="ms-kda">
          {data?.kills}/{data?.deaths}/{data?.assists}
        </div>
        <div className="ms-kda-ratio">
          <b>{((data?.kills + data?.assists) / data?.deaths).toFixed(2)}</b>&nbsp;KDA
        </div>
      </div>

      <div>
        {(data?.totalDamageDealtToChampions).toLocaleString()}
      </div>

      <div>
        {formatGold(data?.goldEarned)}
      </div>

      <div>
      {data?.totalMinionsKilled + data?.neutralMinionsKilled} CS
      </div>

      <div>
        {data?.wardsPlaced}
      </div>

      <div className="ms-items">
                    <div className="ms-item-container">
                      <div className="ms-item-row-1">
                        <div className="item-0">
                          {data?.item0 !== 0 && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item0}.png`}
                                  alt={`${data.item0} Icon`}
                                />
                          )}
                        </div>
                        <div className="item-1">
                          {data?.item1 !== 0 && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item1}.png`}
                                  alt={`${data.item1} Icon`}
                                />
                          )}
                        </div>
                        <div className="item-2">
                          {data?.item2 !== 0 && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item2}.png`}
                                  alt={`${data.item2} Icon`}
                                />
                          )}
                        </div>
                        <div className="item-6">
                          {data?.item6 !== 0 && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item6}.png`}
                                  alt={`${data.item6} Icon`}
                                />
                          )}
                        </div>
                      </div>
                      <div className="ms-item-row-2">
                        <div className="item-3">
                          {data?.item3 !== 0 && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item3}.png`}
                                  alt={`${data.item3} Icon`}
                                />
                          )}
                        </div>
                        <div className="item-4">
                          {data?.item4 !== 0 && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item4}.png`}
                                  alt={`${data.item4} Icon`}
                                />
                          )}
                        </div>
                        <div className="item-5">
                          {data?.item5 !== 0 && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item5}.png`}
                                  alt={`${data.item5} Icon`}
                                />
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

    </div>
    );
    return (
      <div class="column">
      {gameList.length !== 0 ? (
        <>
          {gameList.map((gameData, index) => {
            const searchedParticipant = gameData.info.participants.find(participant => participant.summonerName === currentSummonerName);
            const searchedParticipantIndex = gameData.info.participants.findIndex(participant => participant.summonerName === searchInput);
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
                    <div className="g3-kda">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                              {searchedParticipant?.kills}/{searchedParticipant?.deaths}/{searchedParticipant?.assists}
                          </>
                        )}
                    </div>
                    <div className="g3-kda-ratio">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                              {((searchedParticipant?.kills + searchedParticipant?.assists) / searchedParticipant?.deaths).toFixed(2)} KDA
                          </>
                        )}
                    </div>
                    <div className="g3-cs">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                              {searchedParticipant?.totalMinionsKilled + searchedParticipant?.neutralMinionsKilled} CS ({((searchedParticipant?.totalMinionsKilled + searchedParticipant?.neutralMinionsKilled) / csperminute(gameData.info.gameDuration)).toFixed(1)})
                          </>
                        )}
                    </div>
                    <div className="g3-vision-score">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                              {searchedParticipant?.visionScore} Vision
                          </>
                        )}
                    </div>

                  </div>

    

                  <div className="group-four">
                    <div className="item-container">
                      <div className="item-row-1">
                        <div className="item-0">
                          {searchedParticipant && searchedParticipant.item0 !== 0 && (
                            <>
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0 !== 0) && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item0}.png`}
                                  alt={`${searchedParticipant.item0} Icon`}
                                />
                              )}
                            </>
                          )}
                        </div>
                        <div className="item-1">
                          {searchedParticipant && searchedParticipant.item1 !== 0 && (
                            <>
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item1}.png`}
                                  alt={`${searchedParticipant.item1} Icon`}
                                />
                              )}
                            </>
                          )}
                        </div>
                        <div className="item-2">
                          {searchedParticipant && searchedParticipant.item2 !== 0 && (
                            <>
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item2}.png`}
                                  alt={`${searchedParticipant.item2} Icon`}
                                />
                              )}
                            </>
                          )}
                        </div>
                        <div className="item-6">
                          {searchedParticipant && searchedParticipant.item6 !== 0 && (
                            <>
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item6}.png`}
                                  alt={`${searchedParticipant.item6} Icon`}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="item-row-2">
                        <div className="item-3">
                          {searchedParticipant && searchedParticipant.item3 !== 0 && (
                            <>
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item3}.png`}
                                  alt={`${searchedParticipant.item3} Icon`}
                                />
                              )}
                            </>
                          )}
                        </div>
                        <div className="item-4">
                          {searchedParticipant && searchedParticipant.item4 !== 0 && (
                            <>
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item4}.png`}
                                  alt={`${searchedParticipant.item4} Icon`}
                                />
                              )}
                            </>
                          )}
                        </div>
                        <div className="item-5">
                          {searchedParticipant && searchedParticipant.item5 !== 0 && (
                            <>
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                <img
                                  className="item-image"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item5}.png`}
                                  alt={`${searchedParticipant.item5} Icon`}
                                />
                              )}
                            </>
                          )}
                        </div>
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
                              <p className={currentSummonerName === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
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
                              <p className={currentSummonerName === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`dropdown-triangle ${activeDropdownIndex === index ? 'upside-down' : ''}`} onClick={() => this.toggleDropdown(index)}>
                    <p> V </p>
                  </div>

                  {/* Dropdown Content */}
                  {activeDropdownIndex === index && (
                      <>
                        <DropdownContent />
                        <div className="dropdown-box">
                          <div className = "ally-side-container">
                            <div className = "ally-header-container" >
                              <div className = "ally-match-result">
                              {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                              <>
                                <p className={searchedParticipant?.win ? 'win' : 'loss'}>
                                  {searchedParticipant?.win ? 'Victory' : 'Defeat'}
                                </p>
                              </>
                              )}
                              </div>
                              <div>KDA</div>
                              <div>Damage</div>
                              <div>Gold</div>
                              <div>CS</div>
                              <div>Wards</div>
                              <div>Items</div>
                            </div>
                            
                            <div className="ally-match-summary-container">
                              {searchedParticipantIndex < 5 ? (
                                // Output data for ally teammates, index 0,5
                                gameData.info.participants.slice(0, 5).map(renderPlayer)
                              ) : (
                                // Output data for enemy players, 5,10
                                gameData.info.participants.slice(5, 10).map(renderPlayer)
                              )}
                            </div>
                            
                          </div>

                          <div className = "enemy-side-container">
                            <div className= "enemy-header-container">
                              <div className = "enemy-match-result"> 
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                                <>
                                  <p className={searchedParticipant?.win ? 'loss' : 'win'}>
                                    {searchedParticipant?.win ? 'Defeat' : 'Victory'}
                                  </p>
                                </>
                                )}
                              </div>
                              <div>KDA</div>
                              <div>Damage</div>
                              <div>Gold</div>
                              <div>CS</div>
                              <div>Wards</div>
                              <div>Items</div>
                            </div>

                            <div className = "enemy-match-summary-container">
                              {searchedParticipantIndex < 5 ? (
                                // Output data for enemy players, index 0,5
                                gameData.info.participants.slice(5, 10).map(renderPlayer)
                              ) : (
                                // Output data for enemy players, 5,10
                                gameData.info.participants.slice(0, 5).map(renderPlayer)
                              )}
                            </div>            
                          </div>

                        </div>
                      </>
                    )}
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
  }
}

export default MatchHistory;