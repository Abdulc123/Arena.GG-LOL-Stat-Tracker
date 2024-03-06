import React, { useState} from 'react';
import { gameModes, summonerSpellMapping, runeStyleMapping, keyStoneMapping, augmentMapping, itemDetails, summonerSpellDescription, summonerSpellNames, runeDescription, keyStoneNames } from '../components/constantData';
import '../css/App.css';


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


/*Helps with dropdown container toggle */
const MatchHistory = ({ gameList, currentSummonerName, version }) => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const handleSummonerNameClick = (summonerName) => {
    const url = `/data/${summonerName}`;
    window.location.href = url;
  };

  const toggleDropdown = (index) => {
    setActiveDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  // Decides data slicing based on if its regular or Arena
  function chooseSlice(datax) {
    if (datax.info && datax.info.queueId) {
      if (determineGameMode(datax.info.queueId) === "Arena") {
        return [0, 4, 8];
      } else {
        return [0, 5, 10];
      }
    } else {
      // Handle the case where datax.info or datax.info.queueId is undefined
      return [0, 5, 10];
    }
  }
  
  function chooseAugmentDropdownHelper(DATA, x) {
    // Check if DATA and DATA.info.queueId are defined, and if playerAugmentX is not undefined
    if (
      DATA &&
      (DATA)['playerAugment' + x] !== undefined
    ) {
      let augmentEntry = augmentMapping[(DATA)['playerAugment' + x]];
  
      if (augmentEntry && augmentEntry.length > 0) { 
        return augmentEntry;
      } 
      else {
        return "Unknown";
      }
    } else {
      return "Unknown";
    }
  }

  // Renders item descriptions
  const renderItemDescription = (itemID) => (
    <div className="tooltip">
      <div className="header-tooltip">
        {itemDetails.data[itemID]?.name || "Unknown Item"}
      </div>
      <div className = "description-tooltip">
        <p>{itemDetails.data[itemID]?.plaintext}</p>
      </div>
      <div className= "description-tooltip" dangerouslySetInnerHTML={{ __html: itemDetails.data[itemID]?.description || "Unknown Item" }}>
      </div>
      <div className ="gold-description">
        <p> <font color='#eec316'>Gold: {itemDetails.data[itemID]?.gold.total} ({itemDetails.data[itemID]?.gold.base}) </font> </p>
      </div>
    </div>
  );

  // Match summary rendering for ally team and enemy team
  const renderPlayer = (data, participantIndex) => (
    <div key={participantIndex} className="match-summary-row"
      style={{ backgroundColor: data?.win ? '#202B5E' : '#3E223B' }}>
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
              <div className="tooltip">
                <div className = "header-tooltip">
                  {summonerSpellNames[data.summoner1Id]}
                </div>
                <div className = "description-tooltip">
                  {summonerSpellDescription[summonerSpellMapping[data?.summoner1Id]]}
                </div>
              </div>
            </div>
            <div className="summoner-spell">
              <img
                className="icon2"
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[data.summoner2Id]}.png`}
                alt={`${summonerSpellMapping[data.summoner2Id]} Icon`}
              />
              <div className="tooltip">
                <div className = "header-tooltip">
                  {summonerSpellNames[data.summoner2Id]}
                </div>
                <div className = "description-tooltip">
                  {summonerSpellDescription[summonerSpellMapping[data?.summoner2Id]]}
                </div>
              </div>
            </div>
          </>

        </div>

        {/*Check if keystone exists in keyStoneMapping, if so output runes, else dont (fixes Arena layout) */}
        {data.perks.styles[0] && data.perks.styles[0].selections[0].perk in keyStoneMapping ? (
          <div className="runes-column">
            <>
              <div className="single-rune">
                <img
                  className="icon1"
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/small-perk-images/Styles/${runeStyleMapping[data.perks.styles[0].style]}/${keyStoneMapping[data.perks.styles[0].selections[0].perk]}/${keyStoneMapping[data.perks.styles[0].selections[0].perk]}${keyStoneMapping[data.perks.styles[0].selections[0].perk] === 'LethalTempo' ? 'Temp' : ''}.png`}
                  alt={`${keyStoneMapping[data.perks.styles[0].selections[0].perk]} Icon`}
                />
                <div className = "tooltip">
                  <div className = "header-tooltip">  
                    {runeDescription[data?.perks.styles[0].selections[0].perk][0]}
                  </div>
                  <div className = "description-tooltip">
                    {runeDescription[data?.perks.styles[0].selections[0].perk][1]}
                  </div>
                </div>
              </div>
              <div className="single-rune">
                <img
                  className="icon2"
                  src={`https://static.bigbrain.gg/assets/lol/runes/${data.perks.styles[1].style}.png`}
                  alt={`${data.perks.styles[1].style} Icon`}
                />
                 <div className = "tooltip">
                    <div className = "header-tooltip">
                      {runeDescription[data.perks.styles[1].style][0]}
                    </div>
                    <div className = "description-tooltip">
                      {runeDescription[data.perks.styles[1].style][1]}
                    </div>
                </div>
              </div>
            </>
          </div>
        ) : (
          <>
          {data.playerAugment1 !== 0 && data.playerAugment2 !== 0 && (
            <div className="runes-column">
              {/* Content for the first case */}
              <div className="ms-augment-container">
                <img
                  className="icon1"
                  src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdownHelper(data, 1)[0]}.png`}
                  alt={`${chooseAugmentDropdownHelper(data, 1)[0]} Augment Icon`}
                />
                <div className="tooltip">
                  <div className = "header-tooltip">
                    {chooseAugmentDropdownHelper(data, 1)[1] || "Unknown Augment"}
                  </div>
                  <div className = "description-tooltip">
                    {chooseAugmentDropdownHelper(data, 1)[2]}
                  </div>
                </div>
              </div>
              <div className="ms-augment-container">
                <img
                  className="icon2"
                  src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdownHelper(data, 2)[0]}.png`}
                  alt={`${chooseAugmentDropdownHelper(data, 2)[0]} Augment Icon`}
                />
                <div className="tooltip">
                  <div className = "header-tooltip">
                    {chooseAugmentDropdownHelper(data, 2)[1] || "Unknown Augment"}
                  </div>
                  <div className = "description-tooltip">
                    {chooseAugmentDropdownHelper(data, 2)[2]}
                  </div>
                </div>
              </div>
            </div>
            )}
        
        {data.playerAugment3 !== 0 && data.playerAugment4 !== 0 && (
            <div className="runes-column">
              {/* Content for the first case */}
              <div className="ms-augment-container">
                <img
                  className="icon1"
                  src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdownHelper(data, 3)[0]}.png`}
                  alt={`${chooseAugmentDropdownHelper(data, 3)[0]} Augment Icon`}
                />
                <div className="tooltip">
                  <div className = "header-tooltip">
                    {chooseAugmentDropdownHelper(data, 3)[1] || "Unknown Augment"}
                  </div>
                  <div className = "description-tooltip">
                    {chooseAugmentDropdownHelper(data, 3)[2]}
                  </div>
                </div>
              </div>
              <div className="ms-augment-container">
                <img
                  className="icon2"
                  src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugmentDropdownHelper(data, 4)[0]}.png`}
                  alt={`${chooseAugmentDropdownHelper(data , 4)[0]} Augment Icon`}
                />
                <div className="tooltip">
                  <div className = "header-tooltip">
                    {chooseAugmentDropdownHelper(data, 4)[1] || "Unknown Augment"}
                  </div>
                  <div className = "description-tooltip">
                    {chooseAugmentDropdownHelper(data, 4)[2]}
                  </div>
                </div>
              </div>
            </div>
            )}
          </>
        )}

      </div>

      <div>
        <div className="ms-rank-and-summonername-row">
          <div className="ms-summoner-name-container" onClick={() => handleSummonerNameClick(data.summonerName)}>
            <p className={currentSummonerName === data.summonerName ? "bold" : ""}>{data.summonerName}</p>
          </div>

        </div>
      </div>

      <div>
        <div className="ms-kda">
          {data?.kills}/<font color = "#ff3e3e">{data?.deaths}</font>/{data?.assists}
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
                <>
                <img
                  className="item-image"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item0}.png`}
                  alt={`${data.item0} Icon`}
                />
                {renderItemDescription(data.item0)}
              </>
              )}
            </div>
            <div className="item-1">
              {data?.item1 !== 0 && (
                <>
                <img
                  className="item-image"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item1}.png`}
                  alt={`${data.item1} Icon`}
                />
                {renderItemDescription(data.item1)}
              </>
              )}
            </div>
            <div className="item-2">
              {data?.item2 !== 0 && (
                <>
                <img
                  className="item-image"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item2}.png`}
                  alt={`${data.item2} Icon`}
                />
                {renderItemDescription(data.item2)}
              </>
              )}
            </div>
            <div className="item-6">
              {data?.item6 !== 0 && (
                <>
                <img
                  className="item-image"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item6}.png`}
                  alt={`${data.item6} Icon`}
                />
                {renderItemDescription(data.item6)}
              </>
              )}
            </div>
          </div>
          <div className="ms-item-row-2">
            <div className="item-3">
              {data?.item3 !== 0 && (
                <>
                <img
                  className="item-image"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item3}.png`}
                  alt={`${data.item3} Icon`}
                />
                {renderItemDescription(data.item3)}
              </>
              )}
            </div>
            <div className="item-4">
              {data?.item4 !== 0 && (
                <>
                <img
                  className="item-image"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item4}.png`}
                  alt={`${data.item4} Icon`}
                />
                {renderItemDescription(data.item4)}
              </>
              )}
            </div>
            <div className="item-5">
              {data?.item5 !== 0 && (
                <>
                <img
                  className="item-image"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${data.item5}.png`}
                  alt={`${data.item5} Icon`}
                />
                {renderItemDescription(data.item5)}
              </>
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
              const searchedParticipantIndex = gameData.info.participants.findIndex(participant => participant.summonerName === currentSummonerName);
              const runePrimaryPath = runeStyleMapping[searchedParticipant?.perks.styles[0].style];
              const runePrimaryKeystone = keyStoneMapping[searchedParticipant?.perks.styles[0].selections[0].perk];
              const dataSlice = chooseSlice(gameData);
              
              function chooseAugment(x) {
                // Check if searchedParticipant is defined and has the property playerAugmentX
                if (
                  searchedParticipant &&
                  searchedParticipant['playerAugment' + x] !== undefined
                ) {
                  let augmentEntry = augmentMapping[searchedParticipant['playerAugment' + x]];
                  
                  if (augmentEntry && augmentEntry.length > 0) {
                    return augmentEntry;
                  } else {
                    return "Unknown"; // Corrected the spelling of 'Unknown'
                  }
                } else {
                  return "Unknown";
                }
              }

              return (
                <div key={index} className="match-summary-box">
                  <div className = "content-container"
                    style={{ backgroundColor: searchedParticipant?.win ? '#202B5E' : '#3E223B' }}>
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
                              <div className="summoner-spell" >
                                <img
                                  className="icon1"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[searchedParticipant?.summoner1Id]}.png`}
                                  alt={`${summonerSpellMapping[searchedParticipant?.summoner1Id]} Icon`}
                                />
                                <div className="tooltip">
                                  <div className = "header-tooltip">
                                    {summonerSpellNames[searchedParticipant?.summoner1Id]}
                                  </div>
                                  <div className = "description-tooltip">
                                  {summonerSpellDescription[summonerSpellMapping[searchedParticipant?.summoner1Id]]}
                                  </div>
                                </div>
                              </div>
                              <div className="summoner-spell" >
                                <img
                                  className="icon2"
                                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellMapping[searchedParticipant?.summoner2Id]}.png`}
                                  alt={`${summonerSpellMapping[searchedParticipant?.summoner2Id]} Icon`}
                                />
                                <div className="tooltip">
                                  <div className = "header-tooltip">
                                    {summonerSpellNames[searchedParticipant?.summoner2Id]}
                                  </div>
                                  <div className = "description-tooltip">
                                    {summonerSpellDescription[summonerSpellMapping[searchedParticipant?.summoner2Id]]}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && determineGameMode(gameData.info.queueId) !== "Arena" ? (
                          <div className="runes-column">
                            <>
                              <div className="single-rune">
                                <img
                                  className="icon1"
                                  src={`https://static.bigbrain.gg/assets/lol/riot_static/${version}/img/small-perk-images/Styles/${runePrimaryPath}/${runePrimaryKeystone}/${runePrimaryKeystone}${runePrimaryKeystone === 'LethalTempo' ? 'Temp' : ''}.png`}
                                  alt={`${runePrimaryKeystone} Icon`}
                                />
                              <div className = "tooltip">
                                <div className = "header-tooltip">  
                                  {runeDescription[searchedParticipant?.perks.styles[0].selections[0].perk][0]}
                                </div>
                                <div className = "description-tooltip">
                                  {runeDescription[searchedParticipant?.perks.styles[0].selections[0].perk][1]}
                                </div>
                              </div>

                              </div>
                              <div className="single-rune">
                                <img
                                  className="icon2"
                                  src={`https://static.bigbrain.gg/assets/lol/runes/${searchedParticipant.perks.styles[1].style}.png`}
                                  alt={`${searchedParticipant.perks.styles[1].style} Icon`}
                                />
                                <div className = "tooltip">
                                  <div className = "header-tooltip">
                                    {runeDescription[searchedParticipant.perks.styles[1].style][0]}
                                  </div>
                                  <div className = "description-tooltip">
                                    {runeDescription[searchedParticipant.perks.styles[1].style][1]}
                                  </div>
                              </div>
                              </div>
                            </>
                          </div>
                        ) : (
                          <>
                        {searchedParticipant?.playerAugment1 !== 0 && searchedParticipant?.playerAugment2 !== 0 &&  (
                          <div className="runes-column">
                            {/* Content for the first case */}
                            <div className="augment-container">
                              <img
                                className="icon1"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(1)[0]}.png`}
                                alt={`${chooseAugment(1)[0]} Augment Icon`}
                              />
                              <div className="tooltip">
                                <div className = "header-tooltip">
                                  {chooseAugment(1)[1] || "Unknown Augment"}
                                </div>
                                <div className = "description-tooltip">
                                  {chooseAugment(1)[2]}
                                </div>
                              </div>
                            </div>
                            <div className="augment-container">
                              <img
                                className="icon2"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(2)[0]}.png`}
                                alt={`${chooseAugment(2)[0]} Augment Icon`}
                              />
                              <div className="tooltip">
                                <div className = "header-tooltip">
                                  {chooseAugment(2)[1] || "Unknown Augment"}
                                </div>
                                <div className = "description-tooltip">
                                  {chooseAugment(2)[2]}
                                </div>
                              </div>
                            </div>
                          </div>
                          )}
                      
                      {searchedParticipant?.playerAugment3 !== 0 && searchedParticipant?.playerAugment4 !== 0 && (
                          <div className="runes-column">
                            {/* Content for the first case */}
                            <div className="augment-container">
                              <img
                                className="icon1"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(3)[0]}.png`}
                                alt={`${chooseAugment(3)[0]} Augment Icon`}
                              />
                              <div className="tooltip">
                                <div className = "header-tooltip">
                                  {chooseAugment(3)[1] || "Unknown Augment"}
                                </div>
                                <div className = "description-tooltip">
                                  {chooseAugment(3)[2]}
                                </div>
                              </div>
                            </div>
                            <div className="augment-container">
                              <img
                                className="icon2"
                                src={`https://opgg-static.akamaized.net/meta/images/arena/augments/large/${chooseAugment(4)[0]}.png`}
                                alt={`${chooseAugment(4)[0]} Augment Icon`}
                              />
                              <div className="tooltip">
                                <div className = "header-tooltip">
                                  {chooseAugment(4)[1] || "Unknown Augment"}
                                </div>
                                <div className = "description-tooltip">
                                  {chooseAugment(4)[2]}
                                </div>
                              </div>
                            </div>
                          </div>
                          )}
                        </>
                      )}
                      </div>

                    </div>

                    <div className="group-three">
                      <div className="g3-kda">
                        {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName) && (
                          <>
                            {searchedParticipant?.kills} / <font color = "#ff3e3e"> {searchedParticipant?.deaths} </font> / {searchedParticipant?.assists}
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
                                  <>
                                    <img
                                      className="item-image"
                                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item0}.png`}
                                      alt={`${searchedParticipant.item0} Icon`}
                                    />
                                    {renderItemDescription(searchedParticipant.item0)}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          <div className="item-1">
                            {searchedParticipant && searchedParticipant.item1 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <>
                                    <img
                                      className="item-image"
                                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item1}.png`}
                                      alt={`${searchedParticipant.item1} Icon`}
                                      />
                                      {renderItemDescription(searchedParticipant.item1)}
                                 </>
                                )}
                              </>
                             )}
                          </div>
                          <div className="item-2">
                            {searchedParticipant && searchedParticipant.item2 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <>
                                    <img
                                      className="item-image"
                                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item2}.png`}
                                      alt={`${searchedParticipant.item2} Icon`}
                                    />
                                    {renderItemDescription(searchedParticipant.item2)}
                                  </>
                                )}
                              </>
                              )}
                          </div>
                          <div className="item-6">
                            {searchedParticipant && searchedParticipant.item6 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <>
                                    <img
                                      className="item-image"
                                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item6}.png`}
                                      alt={`${searchedParticipant.item6} Icon`}
                                    />
                                    {renderItemDescription(searchedParticipant.item6)}
                                  </>
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
                                  <>
                                  <img
                                    className="item-image"
                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item3}.png`}
                                    alt={`${searchedParticipant.item3} Icon`}
                                  />
                                  {renderItemDescription(searchedParticipant.item3)}
                              </>
                              )}
                            </>
                            )}
                          </div>
                          <div className="item-4">
                            {searchedParticipant && searchedParticipant.item4 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <>
                                    <img
                                      className="item-image"
                                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item4}.png`}
                                      alt={`${searchedParticipant.item4} Icon`}
                                    />
                                    {renderItemDescription(searchedParticipant.item4)}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          <div className="item-5">
                            {searchedParticipant && searchedParticipant.item5 !== 0 && (
                              <>
                                {gameData.info.participants.find(participant => participant.summonerName === currentSummonerName && participant.item0) && (
                                  <>
                                    <img
                                      className="item-image"
                                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${searchedParticipant.item5}.png`}
                                      alt={`${searchedParticipant.item5} Icon`}
                                    />
                                    {renderItemDescription(searchedParticipant.item5)}
                                </>
                              )}
                            </>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="group-five">
                      <div className="champion-icon-and-summoner-name-column">
                        {gameData.info.participants.slice(dataSlice[0], dataSlice[1]).map((data, participantIndex) => (
                          <div key={participantIndex} className="champion-icon-and-summoner-name-row" onClick={() => handleSummonerNameClick(data.summonerName)}>
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
                        {gameData.info.participants.slice(dataSlice[1], dataSlice[2]).map((data, participantIndex) => (
                          <div key={participantIndex} className="champion-icon-and-summoner-name-row" onClick={() => handleSummonerNameClick(data.summonerName)}>
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

                    <div className={`dropdown-triangle ${activeDropdownIndex === index ? 'upside-down' : ''}`} onClick={() => toggleDropdown(index)}>
                      <p> V </p>
                    </div>

                    {/* Dropdown Content */}
                    {activeDropdownIndex === index && (
                      <>
                        <div className="dropdown-box">
                          <div className="ally-side-container">
                            <div className="ally-header-container" >
                              <div className="ally-match-result">
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
                                gameData.info.participants.slice(dataSlice[0], dataSlice[1]).map(renderPlayer)
                              ) : (
                                // Output data for enemy players, 5,10
                                gameData.info.participants.slice(dataSlice[1], dataSlice[2]).map(renderPlayer)
                              )}
                            </div>

                          </div>

                          <div className="enemy-side-container">
                            <div className="enemy-header-container">
                              <div className="enemy-match-result">
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

                            <div className="enemy-match-summary-container">
                              {searchedParticipantIndex < 5 ? (
                                // Output data for enemy players, index 5,10
                                gameData.info.participants.slice(dataSlice[1], dataSlice[2]).map(renderPlayer)
                              ) : (
                                // Output data for enemy players, 0,5
                                gameData.info.participants.slice(dataSlice[0], dataSlice[1]).map(renderPlayer)
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
  };

export default MatchHistory;