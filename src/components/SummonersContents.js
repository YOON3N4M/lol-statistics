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
  const matchQty = 10;
  const [alarm, setAlarm] = useState(false); // 미구현 알림

  function alarmFn() {
    setAlarm(true);
    setTimeout(() => setAlarm(false), 3000);
  }

  async function fetchAPI() {
    dispatch(clearAll());
    const summonersRes = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summonersName}?api_key=${API_KEY}`
    ); // summonerV4 기본 소환사 정보를 불러오는 API
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

    console.log(sortMatch);
    console.log(sortMatch);
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
    ifRefresh();
    fetchAPI();
  }, []);

  useEffect(() => {
    if (matchData.length !== 0) {
      setSortMatch(
        matchData.sort(function (a, b) {
          return b.info.gameCreation - a.info.gameCreation;
        })
      );
    }
  }, [matchData]);
  return (
    <>
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
                <div className="sum-stats">
                  <div className="sum-win-lose">20전 7승 13패</div>
                  <div className="ratio-kda">
                    <div className="chart"></div>
                    <div className="sum-info">
                      <div className="k-d-a">
                        <span>7.8 </span>/<span className="death"> 6.3 </span>/
                        <span> 8.5</span>
                      </div>
                      <div className="sum-ratio">2.59:1</div>
                      <div className="kill-participantion">킬관여 49%</div>
                    </div>
                  </div>
                </div>
                <div className="champions">
                  <div className="title">
                    플레이한 챔피언 (최근 {matchQty}게임)
                  </div>
                  <ul>
                    <li className="sum-li">
                      <img src="https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/Ivern.png"></img>
                      <div className="win-lose">75% (3승1패) 8.4 평점</div>
                    </li>
                    <li className="sum-li">
                      <img src="https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/Ivern.png"></img>
                      <div className="win-lose">75% (3승1패) 8.4 평점</div>
                    </li>
                    <li className="sum-li">
                      <img src="https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/Ivern.png"></img>
                      <div className="win-lose">75% (3승1패) 8.4 평점</div>
                    </li>
                  </ul>
                </div>
                <div className="positions"></div>
              </div>
              <div className="match-history-container">
                {sortMatch.length === matchQty //sortMatch의 길이가 원본인 marchData의 길이(matchQty)와 같을때 렌더링 시작
                  ? sortMatch.map((match, index) => (
                      <MatchHistory match={match} key={index} debug={debug} />
                    ))
                  : null}
              </div>
              <button onClick={() => console.log(matchData)}>
                get matchData
              </button>
              <button onClick={() => setDebug((prev) => !prev)}>Debug</button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SummonersContents;
