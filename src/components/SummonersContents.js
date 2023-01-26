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
} from "../modules/sumonnersInfo";
import "../css/SummonersContents.css";

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
  } = useSelector((state) => ({
    summonersInfo: state.summonersInfo.summonersInfo,
    summonersLoading: state.summonersInfo.summonersLoading,
    userName: state.summonersInfo.userName,
    leagueInfo: state.summonersInfo.leagueInfo,
    leagueLoading: state.summonersInfo.leagueLoading,
    winRate: state.summonersInfo.winRate,
    rank: state.summonersInfo.rank,
  }));
  const API_KEY = "RGAPI-8a9b5d19-a835-4cfe-b16e-fc119d59e7a0";

  const params = useParams();

  async function fetchAPI() {
    dispatch(setLeagueInfo({}));
    dispatch(setSummonersInfo({}));
    dispatch(setSummonersLoadingTrue());
    dispatch(setLeagueLoadingTrue());

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
    dispatch(
      setWinRate(
        (LeagueResJson[0].wins /
          (LeagueResJson[0].wins + LeagueResJson[0].losses)) *
          100
      )
    );
    dispatch(setSummonersLoadingFalse());
    dispatch(setLeagueLoadingFalse());
    console.log(LeagueResJson, "이건  리그 리스폰스 입니다.");
    console.log(summonersResJson, "이건  서머너 리스폰스 입니다.");
    console.log(summonersInfo, "이건 리덕스 입니다.");
    console.log(typeof LeagueResJson[0].wins);
    if (LeagueResJson[0].rank === "I") {
      dispatch(setRank(1));
    } else if (LeagueResJson[0].rank === "II") {
      dispatch(setRank(2));
    } else if (LeagueResJson[0].rank === "III") {
      dispatch(setRank(3));
    } else if (LeagueResJson[0].rank === "IV") {
      dispatch(setRank(4));
    }
  }
  function ifRefresh() {
    if (userName === "") {
      dispatch(setUserName(params.summonersName));
    }
  }

  useEffect(() => {
    ifRefresh();
    console.log(params.summonersName);
    fetchAPI();
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
                      <span className="year">S2022</span>
                      <span className="tier"> {leagueInfo.tier}</span>
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
                  {leagueInfo.length === 0 ? (
                    <span className="unranked">Unranked</span>
                  ) : null}
                </div>
                {leagueInfo.length !== 0 ? (
                  <div className="current-rank-contents">
                    <div>이미지</div>
                    <div className="current-tier-box">
                      <div className="current-tier">
                        {leagueInfo[0].tier}
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
                  {leagueInfo.length === 0 ? (
                    <span className="unranked">Unranked</span>
                  ) : null}
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
