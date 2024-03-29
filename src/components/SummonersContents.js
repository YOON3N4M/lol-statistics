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
import MatchHistory from "./MatchHistory";
import Summary from "./Summary";
import Positions from "./Posiotions";
import MostChampion from "./MostChampion";

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
  const [debug, setDebug] = useState(false);
  const API_KEY = "RGAPI-8a9b5d19-a835-4cfe-b16e-fc119d59e7a0";
  const params = useParams();
  const [sortMatch, setSortMatch] = useState([]);
  const matchQty = 15;
  const [alarm, setAlarm] = useState(false); // 미구현 알림
  const [currentMatch, setCurrentMatch] = useState([]);
  const [byChampion, setByChampion] = useState({});
  const [byChampionArr, setByChampionArr] = useState([]);
  const [err, setErr] = useState(false);
  const [totalInfo, setTotalInfo] = useState({
    totalKills: 0,
    totalDeaths: 0,
    totalAssists: 0,
  });
  const [totalKillPart, setTotalKillPart] = useState([]);
  const [totalKillPartNum, setTotalKillPartNum] = useState(0);
  const [currentWins, setCurrentWins] = useState(-1);
  const [positions, setPositions] = useState({
    top: 0,
    jungle: 0,
    mid: 0,
    adc: 0,
    sup: 0,
  });
  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  function alarmFn() {
    setAlarm(true);
    setTimeout(() => setAlarm(false), 3000);
  }

  async function fetchAPI() {
    dispatch(clearAll());
    const summonersRes = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summonersName}?api_key=${API_KEY}`
    ).catch(() => setErr(true)); // summonerV4 기본 소환사 정보를 불러오는 API

    const summonersResJson = await summonersRes.json();
    dispatch(setSummonersInfo(summonersResJson));
    dispatch(setUserName(summonersResJson.name)); // 이 부분이 없으면 대소문자를 구분 할 수 없음
    const leagueRes = await fetch(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonersResJson.id}?api_key=${API_KEY}`
    ); // leagueV4 소환사 정보에서 불러온 id로 해당 소환사의 리그 정보를 불러오는 API
    const LeagueResJson = await leagueRes.json();
    dispatch(setLeagueInfo(LeagueResJson));
    const matchRes = await fetch(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonersResJson.puuid}/ids?start=0&count=${matchQty}&api_key=${API_KEY}`
    ); // matchV5 소환사 정보에서 불러온 puuid로 해당 소환사의 경기 코드를 불러오는 API rate limit에 걸리는 관계로 0~15로 설정
    const matchResArr = await matchRes.json();
    dispatch(setMatchIdArr(matchResArr));

    function getMatchInfo(item, index) {
      fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchResArr[index]}?api_key=${API_KEY}`
      ) // 각 경기코드로 경기의 상세 정보를 가져오는 API
        .then((res) => res.json())
        .then((json) => {
          dispatch(setMatchData(json));

          //console.log(json.info.participants);
        });
    }

    const eachMatchRes = await matchResArr.map((item, index) =>
      setTimeout(getMatchInfo(item, index), 900)
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

  useEffect(() => {
    setCurrentWins(-1);
    setTotalKillPartNum(0);
    setSortMatch([]);
    ifRefresh();
    fetchAPI();
  }, [params]);

  useEffect(() => {
    if (matchData.length === matchQty && leagueLoading === false) {
      setSortMatch(
        matchData.sort(function (a, b) {
          return b.info.gameCreation - a.info.gameCreation;
        })
      );
    }
  }, [matchData]);

  useEffect(() => {
    setByChampion(groupBy(currentMatch, "championName"));
    const kills = currentMatch.reduce(function add(sum, item) {
      return sum + item.kills;
    }, 0);
    const deaths = currentMatch.reduce(function add(sum, item) {
      return sum + item.deaths;
    }, 0);
    const assists = currentMatch.reduce(function add(sum, item) {
      return sum + item.assists;
    }, 0);
    setTotalInfo((prev) => {
      return { ...prev, totalKills: kills / matchQty };
    });
    setTotalInfo((prev) => {
      return { ...prev, totalDeaths: deaths / matchQty };
    });
    setTotalInfo((prev) => {
      return { ...prev, totalAssists: assists / matchQty };
    });
    setCurrentWins(currentMatch.filter((e) => e.win === true).length);
  }, [currentMatch]);

  useEffect(() => {
    setByChampionArr(
      Object.entries(byChampion).sort(function (a, b) {
        return b[1].length - a[1].length;
      })
    );
  }, [byChampion]);
  useEffect(() => {
    if (totalKillPart.length !== 0) {
      const withoutNaN = totalKillPart.filter((item) => isNaN(item) === false);
      const a = withoutNaN.reduce(function add(sum, item) {
        return sum + item;
      }, 0);
      setTotalKillPartNum(a);
    }
  }, [totalKillPart]);

  return (
    <>
      {err ? (
        <>
          <div className="err-box">
            <span>
              검색 가능한 소환사가 아닙니다. 오타를 확인 후 다시 검색해주세요.
            </span>
          </div>
        </>
      ) : null}
      {summonersLoading === false && leagueLoading === false ? (
        <>
          {" "}
          <div className="contents-header">
            {alarm ? (
              <div className="alarm fadein">현재 지원되지 않는 기능입니다.</div>
            ) : null}

            <div className="wrapper">
              <div className="profile-icon-container">
                <img
                  className="profile-icon"
                  src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summonersInfo.profileIconId}.png`}
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
                <button onClick={alarmFn} className="refresh-button">
                  전적 갱신
                </button>
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
                <span onClick={alarmFn} className="info-list-item-green">
                  인게임 정보
                </span>
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
                      <div className="win-rate">
                        승률{` ${Math.ceil(winRate)}`}%
                      </div>
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
                  <li className="most-played-tab-item selected">최근게임</li>
                  <li onClick={alarmFn} className="most-played-tab-item">
                    솔로랭크
                  </li>
                  <li onClick={alarmFn} className="most-played-tab-item">
                    자유랭크
                  </li>
                </ul>
                <div className="champion-box-container">
                  {byChampionArr.length !== 0
                    ? byChampionArr
                        .slice(0, 7)
                        .map((champion) => <MostChampion champion={champion} />)
                    : null}
                  <div onClick={alarmFn} className="more">
                    더 보기 + 다른 시즌 보기{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-contents">
              <div className="match-history-tab">
                <ul>
                  <li className="match-history-tab-item selected">전체</li>
                  <li onClick={alarmFn} className="match-history-tab-item">
                    솔로랭크
                  </li>
                  <li onClick={alarmFn} className="match-history-tab-item">
                    자유랭크
                  </li>
                  <li onClick={alarmFn} className="match-history-tab-item">
                    큐 타입
                  </li>
                </ul>
                <div className="검색창"></div>
              </div>
              <div className="match-history-summary">
                {totalKillPart.length !== 0 ? (
                  <>
                    <div className="sum-stats">
                      <div className="sum-win-lose">
                        {matchQty}전 {currentWins}승 {matchQty - currentWins}패
                      </div>
                      <div className="ratio-kda">
                        <div className="chart">
                          {currentWins !== -1 ? (
                            <>
                              <div className="text">
                                <strong>
                                  {Math.round((currentWins / matchQty) * 100)}%
                                </strong>
                              </div>
                              <div style={{ width: "88px", height: "88px" }}>
                                <svg viewBox="0 0 200 200">
                                  <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#E84057"
                                    strokeWidth="30"
                                  />
                                  <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#5383E8"
                                    strokeWidth="30"
                                    strokeDasharray={`${
                                      (2 * Math.PI * 80 * currentWins) /
                                      matchQty
                                    } ${
                                      2 *
                                      Math.PI *
                                      80 *
                                      (1 - currentWins / matchQty)
                                    }`}
                                    strokeDashoffset={2 * Math.PI * 90 * 0.22}
                                  />
                                </svg>
                              </div>
                            </>
                          ) : null}
                        </div>

                        <div className="sum-info">
                          <div className="k-d-a">
                            <span>{totalInfo.totalKills.toFixed(1)} </span>/
                            <span className="death">
                              {` ${totalInfo.totalDeaths.toFixed(1)} `}
                            </span>
                            /<span> {totalInfo.totalAssists.toFixed(1)}</span>
                          </div>
                          <div className="sum-ratio">
                            {(
                              (totalInfo.totalKills + totalInfo.totalAssists) /
                              totalInfo.totalDeaths
                            ).toFixed(2)}
                            :1
                          </div>
                          <div className="kill-participantion">
                            킬관여 {Math.round(totalKillPartNum / matchQty)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="champions">
                      <div className="title">
                        플레이한 챔피언 (최근 {matchQty}게임)
                      </div>
                      <ul style={{ marginTop: "8px" }}>
                        {byChampionArr.length !== 0
                          ? byChampionArr
                              .slice(0, 3)
                              .map((champion) => (
                                <Summary champion={champion} />
                              ))
                          : null}
                      </ul>
                    </div>
                    <div className="positions">
                      <Positions
                        positions={positions}
                        setPositions={setPositions}
                        currentMatch={currentMatch}
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="match-history-container">
                {sortMatch.length === matchQty //sortMatch의 길이가 원본인 marchData의 길이(matchQty)와 같을때 렌더링 시작
                  ? sortMatch.map((match, index) => (
                      <MatchHistory
                        currentMatch={currentMatch}
                        setCurrentMatch={setCurrentMatch}
                        match={match}
                        key={index}
                        debug={debug}
                        setTotalKillPart={setTotalKillPart}
                      />
                    ))
                  : null}
              </div>
              {/*  디버그용 버튼들
                <button onClick={() => console.log(matchData)}>
                get matchData
              </button>
              <button onClick={() => setDebug((prev) => !prev)}>Debug</button>
              <button onClick={() => console.log(currentWins / 15)}>
                test
              </button>
              */}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SummonersContents;
