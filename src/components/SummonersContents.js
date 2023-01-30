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
  }));
  const API_KEY = "RGAPI-8a9b5d19-a835-4cfe-b16e-fc119d59e7a0";
  const params = useParams();

  async function fetchAPI() {
    dispatch(clearAll());
    const summonersRes = await fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summonersName}?api_key=${API_KEY}`
    );
    const summonersResJson = await summonersRes.json();
    dispatch(setSummonersInfo(summonersResJson));
    const leagueRes = await fetch(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonersResJson.id}?api_key=${API_KEY}`
    );
    const LeagueResJson = await leagueRes.json();
    dispatch(setLeagueInfo(LeagueResJson));

    dispatch(setSummonersLoadingFalse());
    dispatch(setLeagueLoadingFalse());
    console.log(LeagueResJson, "이건  리그 리스폰스 입니다.");
    console.log(summonersResJson, "이건  서머너 리스폰스 입니다.");
    console.log(summonersInfo, "이건 리덕스 입니다.");
    console.log(leagueInfo.length);

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
  console.log(leagueInfo.length);
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
                        {leagueInfo[0].wins}승{leagueInfo[0].losses}패
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
              <div className="match-history-summary"></div>
              <div className="match-history-container">
                <li className="match"></li>
                <li className="match"></li>
                <li className="match"></li>
                <li className="match"></li>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SummonersContents;
