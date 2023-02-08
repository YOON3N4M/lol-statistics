import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function MatchHistory({ match, debug }) {
  const { userName } = useSelector((state) => ({
    userName: state.summonersInfo.userName,
  }));
  const currentPlayer = match.info.participants.filter(
    (player) => player.summonerName === userName
  )[0];
  const isWin = currentPlayer.win;
  console.log(currentPlayer.championName);
  const [fixChampion, setFixChampion] = useState("");
  const [kda, setKda] = useState();
  const [itemList, setItemList] = useState({
    item0: false,
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false, // 장신구
  });

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
                )
              )
            }
          >
            current
          </button>
          <button onClick={() => console.log(match)}>matchData</button>
        </>
      ) : null}

      <li className={"match" + (isWin ? " win" : " lose")}>
        <div className="game-container">
          <div className="game">
            <div className={"type" + (isWin ? "" : " red")}>
              {match.info.gameMode === "CLASSIC" ? "솔랭" : "일반"}
            </div>
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
                <div className="">
                  <img
                    className="icon"
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${fixChampion}.png`}
                  />
                </div>
                <div className="spells">
                  <div className="spell">
                    <img
                      className="spell"
                      src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/SummonerBoost.png"
                    />
                  </div>
                  <div className="spell">
                    <img
                      className="spell"
                      src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/SummonerBoost.png"
                    />
                  </div>
                </div>
                <div className="runes">
                  <div className="rune-main">
                    <img
                      className="rune"
                      src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png"
                    />
                  </div>
                  <div className="rune">
                    <img
                      className="rune"
                      src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png"
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
                <div className="p-kill">킬관여 20%</div>
                <div className="ward">
                  제어와드 {currentPlayer.detectorWardsPlaced}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${currentPlayer.item0}.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${currentPlayer.item1}.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${currentPlayer.item2}.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${currentPlayer.item3}.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${currentPlayer.item4}.png`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${currentPlayer.item5}.png`}
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
                        src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${currentPlayer.item6}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[0].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[1].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[2].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[3].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[4].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[5].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[6].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[7].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[8].championName}.png`}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[9].championName}.png`}
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
          <button className="detail-btn"></button>
        </div>
      </li>
    </>
  );
}

export default MatchHistory;
