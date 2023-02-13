import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function MatchHistory({ match, debug }) {
  const { userName } = useSelector((state) => ({
    userName: state.summonersInfo.userName,
  }));
  const currentPlayer = match.info.participants.filter(
    (player) => player.summonerName === userName
  )[0];
  const teamA = match.info.participants.filter(
    (player) => player.teamId === currentPlayer.teamId
  ); // 현재 검색된 플레이어의 팀
  const teamTotalKills =
    teamA[0].kills +
    teamA[1].kills +
    teamA[2].kills +
    teamA[3].kills +
    teamA[4].kills;
  function testFn() {
    console.log(teamTotalKills);
  }

  const isWin = currentPlayer.win;
  const [gameType, setGameType] = useState("");
  const [fixChampion, setFixChampion] = useState("");
  const [kda, setKda] = useState("");
  const [itemList, setItemList] = useState({
    item0: false,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false, // 장신구
  });
  const [spellA, setSpellA] = useState("");
  const [spellB, setSpellB] = useState("");
  const [runeA, setRuneA] = useState("");
  const [runeB, setRuneB] = useState("");

  useEffect(() => {
    /*
  이상하게 피들스틱만 machData의 championName을 그대로 이용하면 API 오류가 발생 대문에 아래와 같은 변경 요망
  추후같은 문제가 발생 할 경우 아래에 else if를 통해 챔피언 이름을 수정해주는 과정이 필요함.
  */
    if (currentPlayer.championName === "FiddleSticks") {
      setFixChampion("Fiddlesticks");
    } else {
      setFixChampion(currentPlayer.championName);
    }
    // kda
    if (
      currentPlayer.kills === 0 &&
      currentPlayer.assists === 0 &&
      currentPlayer.deaths === 0
    ) {
      setKda("0.00");
    } else if (currentPlayer.deaths === 0) {
      setKda("Perfect");
    } else {
      setKda(
        (
          (currentPlayer.kills + currentPlayer.assists) /
          currentPlayer.deaths
        ).toFixed(2)
      );
    }
    // 아이템
    if (currentPlayer.item0 > 0) {
      setItemList((prev) => {
        return { ...prev, item0: true };
      });
    }
    if (currentPlayer.item1 > 0) {
      setItemList((prev) => {
        return { ...prev, item1: true };
      });
    }
    if (currentPlayer.item2 > 0) {
      setItemList((prev) => {
        return { ...prev, item2: true };
      });
    }
    if (currentPlayer.item3 > 0) {
      setItemList((prev) => {
        return { ...prev, item3: true };
      });
    }
    if (currentPlayer.item4 > 0) {
      setItemList((prev) => {
        return { ...prev, item4: true };
      });
    }
    if (currentPlayer.item5 > 0) {
      setItemList((prev) => {
        return { ...prev, item5: true };
      });
    }
    if (currentPlayer.item6 > 0) {
      setItemList((prev) => {
        return { ...prev, item6: true };
      });
    }
    // 스펠
    switch (currentPlayer.summoner1Id) {
      case 11:
        setSpellA("SummonerSmite");
        break;
      case 4:
        setSpellA("SummonerFlash");
        break;
      case 6:
        setSpellA("SummonerHaste");
        break;
      case 7:
        setSpellA("SummonerHeal");
        break;
      case 12:
        setSpellA("SummonerTeleport");
        break;
      case 21:
        setSpellA("SummonerBarrier");
        break;
      case 14:
        setSpellA("SummonerDot");
        break;
      case 3:
        setSpellA("SummonerExhaust");
        break;
      case 13:
        setSpellA("SummonerMana");
        break;
      case 1:
        setSpellA("SummonerBoost");
        break;
      case 39:
        setSpellA("SummonerSnowURFSnowball_Mark");
        break;
      default:
        break;
    }
    switch (currentPlayer.summoner2Id) {
      case 11:
        setSpellB("SummonerSmite");
        break;
      case 4:
        setSpellB("SummonerFlash");
        break;
      case 6:
        setSpellB("SummonerHaste");
        break;
      case 7:
        setSpellB("SummonerHeal");
        break;
      case 12:
        setSpellB("SummonerTeleport");
        break;
      case 21:
        setSpellB("SummonerBarrier");
        break;
      case 14:
        setSpellB("SummonerDot");
        break;
      case 3:
        setSpellB("SummonerExhaust");
        break;
      case 13:
        setSpellB("SummonerMana");
        break;
      case 1:
        setSpellB("SummonerBoost");
        break;
      case 39:
        setSpellB("SummonerSnowURFSnowball_Mark");
        break;
      default:
        break;
    }
    //메인룬 이미지
    switch (currentPlayer.perks.styles[0].selections[0].perk) {
      case 8005:
        setRuneA("Precision/PressTheAttack/PressTheAttack");
        break;
      case 8008:
        setRuneA("Precision/LethalTempo/LethalTempoTemp");
        break;
      case 8021:
        setRuneA("Precision/FleetFootwork/FleetFootwork");
        break;
      case 8010:
        setRuneA("Precision/Conqueror/Conqueror");
        break;
      case 8112:
        setRuneA("Domination/Electrocute/Electrocute");
      case 8124:
        setRuneA("Domination/Predator/Predator");
        break;
      case 8128:
        setRuneA("Domination/DarkHarvest/DarkHarvest");
        break;
      case 9923:
        setRuneA("Domination/HailOfBlades/HailOfBlades");
        break;
      case 8214:
        setRuneA("Sorcery/SummonAery/SummonAery");
        break;
      case 8229:
        setRuneA("Sorcery/ArcaneComet/ArcaneComet");
        break;
      case 8230:
        setRuneA("Sorcery/PhaseRush/PhaseRush");
        break;
      case 8437:
        setRuneA("Resolve/GraspOfTheUndying/GraspOfTheUndying");
        break;
      case 8439:
        setRuneA("Resolve/VeteranAftershock/VeteranAftershock");
        break;
      case 8465:
        setRuneA("Resolve/Guardian/Guardian");
        break;
      case 8351:
        setRuneA("Inspiration/GlacialAugment/GlacialAugment");
        break;
      case 8360:
        setRuneA("Inspiration/UnsealedSpellbook/UnsealedSpellbook");
        break;
      case 8369:
        setRuneA("Inspiration/FirstStrike/FirstStrike");
        break;
    }
    //서브룬 이미지
    switch (currentPlayer.perks.styles[1].style) {
      case 8000:
        setRuneB("7201_Precision");
        break;
      case 8100:
        setRuneB("7200_Domination");
        break;
      case 8200:
        setRuneB("7202_Sorcery");
        break;
      case 8300:
        setRuneB("7203_Whimsy");
        break;
      case 8400:
        setRuneB("7204_Resolve");
        break;
      default:
        break;
    }
    //큐 타입 (게임 타입)
    switch (match.info.queueId) {
      case 400:
        setGameType("일반");
        break;
      case 420:
        setGameType("솔랭");
        break;
      case 430:
        setGameType("일반");
        break;
      case 440:
        setGameType("자유 5:5 랭크");
        break;
      case 450:
        setGameType("무작위 총력전");
        break;
      case 700:
        setGameType("격전");
        break;
      case 830:
        setGameType("입문");
        break;
      case 840:
        setGameType("초보");
        break;
      case 850:
        setGameType("중급");
        break;
      case 900:
        setGameType("모두 무작위 U.R.F.");
        break;
      case 920:
        setGameType("포로왕");
        break;
      case 1020:
        setGameType("단일 챔피언");
        break;
      case 1300:
        setGameType("돌격 넥서스");
        break;
      case 1400:
        setGameType("궁극기 주문서");
        break;
      case 2000:
      case 2010:
      case 2020:
        setGameType("튜토리얼");
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      {debug ? (
        <>
          {" "}
          <button
            onClick={() =>
              console.log(
                match.info.participants.filter(
                  (player) => player.summonerName === userName
                )[0]
              )
            }
          >
            current
          </button>
          <button onClick={() => console.log(match)}>matchData</button>
          <button onClick={testFn}>test</button>
        </>
      ) : null}

      <li className={"match" + (isWin ? " win" : " lose")}>
        <div className="game-container">
          <div className="game">
            <div className={"type" + (isWin ? "" : " red")}>{gameType}</div>
            <div className="time-stamp">-시간 전</div>
            <div className="small-border"></div>
            <div className="result">{isWin ? "승리" : "패배"}</div>
            <div className="length">
              {(match.info.gameDuration / 60).toFixed(0) + "분"}
            </div>
          </div>
          <div className="game-info">
            <div className="top-row">
              <div className="champion">
                <div className="icon-box">
                  <div>
                    <img
                      className="icon"
                      src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${fixChampion}.png`}
                    />
                    <span className="champion-level">
                      {currentPlayer.champLevel}
                    </span>
                  </div>
                </div>
                <div className="spells">
                  <div className="spell">
                    <img
                      className="spell"
                      src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/spell/${spellA}.png`}
                    />
                  </div>
                  <div className="spell">
                    <img
                      className="spell"
                      src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/spell/${spellB}.png`}
                    />
                  </div>
                </div>
                <div className="runes">
                  <div className="rune-main">
                    <img
                      className="rune"
                      src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeA}.png`}
                    />
                  </div>
                  <div className="rune">
                    <img
                      className="rune"
                      src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${runeB}.png`}
                    />
                  </div>
                </div>
              </div>
              <div className="kda">
                <div className="k-d-a">
                  <span>{currentPlayer.kills}</span>/
                  <span className="death">{currentPlayer.deaths}</span>/
                  <span>{currentPlayer.assists}</span>
                </div>
                <div className="ratio">
                  <span>{`${kda} `}</span>
                  평점
                </div>
              </div>
              <div className="stats">
                <div className="p-kill">
                  킬관여{" "}
                  {Math.round(
                    ((currentPlayer.kills + currentPlayer.assists) /
                      teamTotalKills) *
                      100
                  )}
                  %
                </div>
                <div className="ward">
                  제어와드 {currentPlayer.visionWardsBoughtInGame}
                </div>
                <div className="cs">
                  cs{" "}
                  {currentPlayer.neutralMinionsKilled +
                    currentPlayer.totalMinionsKilled}
                  (
                  {(
                    (currentPlayer.neutralMinionsKilled +
                      currentPlayer.totalMinionsKilled) /
                    (match.info.gameDuration / 60)
                  ).toFixed(1)}
                  )
                </div>
                <div className="average-tier">Gold 3</div>
              </div>
            </div>
            <div className="bottom-row">
              <div className="items">
                <ul>
                  <li>
                    <div
                      className={
                        "item-box" + (isWin ? " blue-item" : " red-item")
                      }
                    >
                      {itemList.item0 ? (
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${currentPlayer.item0}.png`}
                        />
                      ) : null}
                    </div>
                  </li>
                  <li>
                    <div
                      className={
                        "item-box" + (isWin ? " blue-item" : " red-item")
                      }
                    >
                      {itemList.item1 ? (
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${currentPlayer.item1}.png`}
                        />
                      ) : null}
                    </div>
                  </li>
                  <li>
                    <div
                      className={
                        "item-box" + (isWin ? " blue-item" : " red-item")
                      }
                    >
                      {itemList.item2 ? (
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${currentPlayer.item2}.png`}
                        />
                      ) : null}
                    </div>
                  </li>
                  <li>
                    <div
                      className={
                        "item-box" + (isWin ? " blue-item" : " red-item")
                      }
                    >
                      {itemList.item3 ? (
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${currentPlayer.item3}.png`}
                        />
                      ) : null}
                    </div>
                  </li>
                  <li>
                    <div
                      className={
                        "item-box" + (isWin ? " blue-item" : " red-item")
                      }
                    >
                      {itemList.item4 ? (
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${currentPlayer.item4}.png`}
                        />
                      ) : null}
                    </div>
                  </li>
                  <li>
                    <div
                      className={
                        "item-box" + (isWin ? " blue-item" : " red-item")
                      }
                    >
                      {itemList.item5 ? (
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${currentPlayer.item5}.png`}
                        />
                      ) : null}
                    </div>
                  </li>
                </ul>
                <div className="ward">
                  <div
                    className={
                      "ward-box" + (isWin ? " blue-item" : " red-item")
                    }
                  >
                    {itemList.item6 ? (
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/item/${currentPlayer.item6}.png`}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="participants">
            <ul>
              <li>
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[0].championName}.png`}
                    alt={match.info.participants[0].championName}
                  />
                </div>
                <div className="part-name">
                  <a>
                    {match.info.participants[0].summonerName === userName ? (
                      <b>{match.info.participants[0].summonerName}</b>
                    ) : (
                      match.info.participants[0].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[1].championName}.png`}
                    alt={match.info.participants[1].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {match.info.participants[1].summonerName === userName ? (
                      <b>{match.info.participants[1].summonerName}</b>
                    ) : (
                      match.info.participants[1].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[2].championName}.png`}
                    alt={match.info.participants[2].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {match.info.participants[2].summonerName === userName ? (
                      <b>{match.info.participants[2].summonerName}</b>
                    ) : (
                      match.info.participants[2].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[3].championName}.png`}
                    alt={match.info.participants[3].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {match.info.participants[3].summonerName === userName ? (
                      <b>{match.info.participants[3].summonerName}</b>
                    ) : (
                      match.info.participants[3].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[4].championName}.png`}
                    alt={match.info.participants[4].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {" "}
                    {match.info.participants[4].summonerName === userName ? (
                      <b>{match.info.participants[4].summonerName}</b>
                    ) : (
                      match.info.participants[4].summonerName
                    )}
                  </a>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[5].championName}.png`}
                    alt={match.info.participants[5].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {" "}
                    {match.info.participants[5].summonerName === userName ? (
                      <b>{match.info.participants[5].summonerName}</b>
                    ) : (
                      match.info.participants[5].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[6].championName}.png`}
                    alt={match.info.participants[6].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {" "}
                    {match.info.participants[6].summonerName === userName ? (
                      <b>{match.info.participants[6].summonerName}</b>
                    ) : (
                      match.info.participants[6].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[7].championName}.png`}
                    alt={match.info.participants[7].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {" "}
                    {match.info.participants[7].summonerName === userName ? (
                      <b>{match.info.participants[7].summonerName}</b>
                    ) : (
                      match.info.participants[7].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[8].championName}.png`}
                    alt={match.info.participants[8].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {" "}
                    {match.info.participants[8].summonerName === userName ? (
                      <b>{match.info.participants[8].summonerName}</b>
                    ) : (
                      match.info.participants[8].summonerName
                    )}
                  </a>
                </div>
              </li>
              <li>
                {" "}
                <div className="part-icon">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${match.info.participants[9].championName}.png`}
                    alt={match.info.participants[9].championName}
                  />{" "}
                </div>
                <div className="part-name">
                  <a>
                    {" "}
                    {match.info.participants[9].summonerName === userName ? (
                      <b>{match.info.participants[9].summonerName}</b>
                    ) : (
                      match.info.participants[9].summonerName
                    )}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="detail">
          <button
            className={"detail-btn" + (isWin ? " blue-btn" : " red-btn")}
          ></button>
        </div>
      </li>
    </>
  );
}

export default MatchHistory;
