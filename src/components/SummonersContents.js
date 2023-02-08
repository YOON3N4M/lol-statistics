import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setSummonersInfo,
  clearSummonersInfo,
  setSummonersLoadingTrue,
  setSummonersLoadingFalse,
  setLeagueInfo,
  setLeagueLoadingTrue,
  setLeagueLoadingFalse,
  setWinRate,
  setRank,
  setUserName,
  setTier,
  setTierCap,
  clearAll,
  setMatchIdArr,
  setMatchData,
} from "../modules/sumonnersInfo";
import "../css/SummonersContents.css";
import IRON from "../img/tier/iron.png";
import BRONZE from "../img/tier/bronze.png";
import SILVER from "../img/tier/silver.png";
import GOLD from "../img/tier/gold.png";
import PLATINUM from "../img/tier/platinum.png";
import DIAMOND from "../img/tier/diamond.png";
import MASTER from "../img/tier/master.png";
import GRANDMASTER from "../img/tier/grandmaster.png";
import CHALLENGER from "../img/tier/challenger.png";

const SummonersContents = () => {
  const dispatch = useDispatch();
  const {
    summonersInfo,
    summonersLoading,
    userName,
    leagueInfo,
    leagueLoading,
    winRate,
    rank,
    tier,
    tierCap,
    matchIdArr,
    matchData,
  } = useSelector((state) => ({
    summonersInfo: state.summonersInfo.summonersInfo,
    summonersLoading: state.summonersInfo.summonersLoading,
    userName: state.summonersInfo.userName,
    leagueInfo: state.summonersInfo.leagueInfo,
    leagueLoading: state.summonersInfo.leagueLoading,
    winRate: state.summonersInfo.winRate,
    rank: state.summonersInfo.rank,
    tier: state.summonersInfo.tier,
    tierCap: state.summonersInfo.tierCap,
    matchIdArr: state.summonersInfo.matchIdArr,
    matchData: state.summonersInfo.matchData,
  }));
  const API_KEY = "RGAPI-8a9b5d19-a835-4cfe-b16e-fc119d59e7a0";
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  async function fetchAPI() {
    dispatch(clearAll());
    const summonersRes = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summonersName}?api_key=${API_KEY}`
    ); // summonerV4 기본 소환사 정보를 불러오는 API
    const summonersResJson = await summonersRes.json();
    dispatch(setSummonersInfo(summonersResJson));
    const leagueRes = await fetch(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonersResJson.id}?api_key=${API_KEY}`
    ); // leagueV4 소환사 정보에서 불러온 id로 해당 소환사의 리그 정보를 불러오는 API
    const LeagueResJson = await leagueRes.json();
    dispatch(setLeagueInfo(LeagueResJson));
    const matchRes = await fetch(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonersResJson.puuid}/ids?start=0&count=2&api_key=${API_KEY}`
    ); // matchV5 소환사 정보에서 불러온 puuid로 해당 소환사의 경기 코드를 불러오는 API rate limit에 걸리는 관계로 0~15로 설정
    const matchResArr = await matchRes.json();
    dispatch(setMatchIdArr(matchResArr));

    function getMatchInfo(item, index) {
      fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchResArr[index]}?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          dispatch(setMatchData(json));
          //console.log(json.info.participants);
        });
    }

    const eachMatchRes = await matchResArr.map((item, index) =>
      setTimeout(getMatchInfo(item, index), 500)
    ); // 이 Res를 활용해야 하는지?

    //마지막 단계
    dispatch(setSummonersLoadingFalse());
    dispatch(setLeagueLoadingFalse());

    // api를 불러온 후 LeagueResJson[0].tier를 검사해 각 티어에 맞는 이미지 디스패치와 cap적용 티어 디스패치
    switch (LeagueResJson[0].tier) {
      case "IRON":
        dispatch(setTier(IRON));
        dispatch(setTierCap("Iron"));
        break;
      case "BRONZE":
        dispatch(setTier(BRONZE));
        dispatch(setTierCap("Bronze"));
        break;
      case "SILVER":
        dispatch(setTier(SILVER));
        dispatch(setTierCap("Silver"));
        break;
      case "GOLD":
        dispatch(setTier(GOLD));
        dispatch(setTierCap("Gold"));
        break;
      case "PLATINUM":
        dispatch(setTier(PLATINUM));
        dispatch(setTierCap("Platinum"));
        break;
      case "DIAMOND":
        dispatch(setTier(DIAMOND));
        dispatch(setTierCap("Diamond"));
        break;
      case "MASTER":
        dispatch(setTier(MASTER));
        dispatch(setTierCap("Master"));
        break;
      case "GRANDMASTER":
        dispatch(setTier(GRANDMASTER));
        dispatch(setTierCap("Grandmaster"));
        break;
      case "CHALLENGER":
        dispatch(setTier(CHALLENGER));
        dispatch(setTierCap("Challenger"));
        break;
      default:
        console.log("unranked");
    }

    // 티어를 숫자로 표현하기 위해 leagurInfo[0] 객체 내 I,II 식의 방식을 숫자로 바꾸는 IF 문
    if (
      LeagueResJson[0].rank === "I" &&
      LeagueResJson[0].tier !== "CHALLENGER" &&
      LeagueResJson[0].tier !== "GRANDMASTER" &&
      LeagueResJson[0].tier !== "MASTER"
    ) {
      dispatch(setRank(1));
    } else if (LeagueResJson[0].rank === "II") {
      dispatch(setRank(2));
    } else if (LeagueResJson[0].rank === "III") {
      dispatch(setRank(3));
    } else if (LeagueResJson[0].rank === "IV") {
      dispatch(setRank(4));
    }
    // 받아온 LeagueResJson의 길이가 1 이상이면 (언랭이 아니면) 승률 계산후 디스패치
    if (LeagueResJson.length > 0) {
      dispatch(
        setWinRate(
          (LeagueResJson[0].wins /
            (LeagueResJson[0].wins + LeagueResJson[0].losses)) *
            100
        )
      );
    }
  }

  function ifRefresh() {
    if (userName === "") {
      dispatch(setUserName(params.summonersName));
    }
  }
  function check() {
    const aaa = [2, 1];
    console.log(Array.isArray(matchData), "잉");
    console.log(Array.isArray(matchData), "잉");
    console.log(matchData);
  }
  useEffect(() => {
    ifRefresh();
    fetchAPI();
    check();
  }, []);

  return (
    <>
      {summonersLoading === false && leagueLoading === false ? (
        <>
          {" "}
          <div className="contents-header">
            <div className="wrapper">
              <div className="profile-icon-container">
                <img
                  className="profile-icon"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${summonersInfo.profileIconId}.png`}
                  alt=""
                />
                <div className="level">
                  <span>{summonersInfo.summonerLevel}</span>
                </div>
              </div>
              <div className="info">
                <div className="tier-container">
                  <ul>
                    <li className="tier-li">
                      <div className="year">
                        <b>S2023</b>
                        {` ${tierCap}`}
                        {` ${rank}`}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="name">{summonersInfo.name}</div>
                <button className="refresh-button">전적 갱신</button>
                <div className="last-update">
                  <span>최근 업데이트: 방금 전</span>
                </div>
              </div>
            </div>
          </div>
          <div className="info-list-tab">
            <ul className="info-list">
              <li>
                <span className="info-list-item-blue">종합</span>
              </li>
              <li>
                <span className="info-list-item-green">인게임 정보</span>
              </li>
            </ul>
          </div>
          <div className="contents-container">
            <div className="left-contents">
              <div className="current-rank-container">
                <div className="current-rank-header">
                  <span>솔로랭크</span>
                  {leagueInfo.length === 0 ||
                  leagueInfo[0].queueType !== "RANKED_SOLO_5x5" ? (
                    <span className="unranked">Unranked</span>
                  ) : null}
                </div>
                {leagueInfo.length > 0 &&
                leagueInfo[0].queueType === "RANKED_SOLO_5x5" ? (
                  <div className="current-rank-contents">
                    <div>
                      <img className="current-tier-img" src={tier} />
                    </div>
                    <div className="current-tier-box">
                      <div className="current-tier">
                        {tierCap}
                        {` ${rank}`}
                      </div>
                      <div className="current-lp">
                        {leagueInfo[0].leaguePoints} LP
                      </div>
                    </div>
                    <div className="win-lose-container">
                      <div className="win-lose">
                        {leagueInfo[0].wins}승 {leagueInfo[0].losses}패
                      </div>
                      <div className="win-rate">승률{Math.ceil(winRate)}%</div>
                    </div>
                  </div>
                ) : null}

                <div className="current-rank-header">
                  <span>자유랭크</span>
                  <span className="unranked">미지원</span>
                </div>
              </div>
              <div className="most-played">
                <ul className="most-played-tab">
                  <li className="most-played-tab-item">S2023 전체</li>
                  <li className="most-played-tab-item">솔로랭크</li>
                  <li className="most-played-tab-item">자유랭크</li>
                </ul>
                <div className="champion-box-container">
                  <div className="champion-box"></div>
                  <div className="champion-box"></div>
                  <div className="champion-box"></div>
                  <div className="champion-box"></div>
                  <div className="champion-box"></div>
                  <div className="champion-box"></div>
                  <div className="champion-box"></div>
                  <div className="more">더 보기 + 다른 시즌 보기 </div>
                </div>
              </div>
            </div>
            <div className="right-contents">
              <div className="match-history-tab">
                <ul>
                  <li className="match-history-tab-item">전체</li>
                  <li className="match-history-tab-item">솔로랭크</li>
                  <li className="match-history-tab-item">자유랭크</li>
                  <li className="match-history-tab-item">큐 타입</li>
                </ul>
                <div className="검색창"></div>
              </div>
              <div className="match-history-summary">
                <button onClick={() => console.log(matchData)}>aaa</button>
              </div>
              <div className="match-history-container">
                {matchData.length !== 0
                  ? matchData.map((match, index) => (
                      <li
                        className={
                          "match" +
                          (match.info.participants.filter(
                            (player) =>
                              player.summonerName === matchData.userName
                          ).win
                            ? " win"
                            : " lose")
                        }
                      >
                        <div className="game-container">
                          <div className="game">
                            <div className="type">
                              {match.info.gameMode === "CLASSIC"
                                ? "솔랭"
                                : "일반"}
                            </div>
                            <div className="time-stamp">-시간 전</div>
                            <div className="small-border"></div>
                            <div className="result">승리</div>
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
                                    src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Amumu.png"
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
                                  <span>3</span>/
                                  <span className="death">6</span>/
                                  <span>1</span>
                                </div>
                                <div className="ratio">
                                  <span>0.75:1 </span>
                                  평점
                                </div>
                              </div>
                              <div className="stats">
                                <div className="p-kill">킬관여 20%</div>
                                <div className="ward">제어와드 0</div>
                                <div className="cs">cs 130(5.5)</div>
                                <div className="average-tier">Gold 3</div>
                              </div>
                            </div>
                            <div className="bottom-row">
                              <div className="items">
                                <ul>
                                  <li>
                                    <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3108.png" />
                                  </li>
                                  <li>
                                    <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3108.png" />
                                  </li>
                                  <li>
                                    <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3108.png" />
                                  </li>
                                  <li>
                                    <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3108.png" />
                                  </li>
                                  <li>
                                    <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3108.png" />
                                  </li>
                                  <li>
                                    <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3108.png" />
                                  </li>
                                </ul>
                                <div className="ward">
                                  <img src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/3108.png" />
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
                                    alt={
                                      match.info.participants[0].championName
                                    }
                                  />
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[0].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[1].championName}.png`}
                                    alt={
                                      match.info.participants[1].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[1].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[2].championName}.png`}
                                    alt={
                                      match.info.participants[2].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[2].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[3].championName}.png`}
                                    alt={
                                      match.info.participants[3].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[3].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[4].championName}.png`}
                                    alt={
                                      match.info.participants[4].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[4].summonerName}
                                  </a>
                                </div>
                              </li>
                            </ul>
                            <ul>
                              <li>
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[5].championName}.png`}
                                    alt={
                                      match.info.participants[5].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[5].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[6].championName}.png`}
                                    alt={
                                      match.info.participants[6].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[6].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[7].championName}.png`}
                                    alt={
                                      match.info.participants[7].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[7].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[8].championName}.png`}
                                    alt={
                                      match.info.participants[8].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[8].summonerName}
                                  </a>
                                </div>
                              </li>
                              <li>
                                {" "}
                                <div className="part-icon">
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${match.info.participants[9].championName}.png`}
                                    alt={
                                      match.info.participants[9].championName
                                    }
                                  />{" "}
                                </div>
                                <div className="part-name">
                                  <a>
                                    {match.info.participants[9].summonerName}
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
                    ))
                  : null}

                <li className="match lose"></li>

                <li className="match win">
                  {matchData.length !== 0 ? (
                    <span>
                      {" "}
                      {matchData[0].info.participants[0].championName}
                    </span>
                  ) : null}
                </li>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SummonersContents;
