import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSummonersInfo,
  clearSummonersInfo,
  setSummonersLoadingTrue,
  setSummonersLoadingFalse,
  setLeagueInfo,
  setLeagueLoadingTrue,
  setLeagueLoadingFalse,
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
  } = useSelector((state) => ({
    summonersInfo: state.summonersInfo.summonersInfo,
    summonersLoading: state.summonersInfo.summonersLoading,
    userName: state.summonersInfo.userName,
    leagueInfo: state.summonersInfo.leagueInfo,
    leagueLoading: state.summonersInfo.leagueLoading,
  }));
  const API_KEY = "RGAPI-8a9b5d19-a835-4cfe-b16e-fc119d59e7a0";

  useEffect(() => {
    dispatch(setSummonersLoadingTrue());
    dispatch(setLeagueLoadingTrue());
    fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(setSummonersInfo(json));
        dispatch(setSummonersLoadingFalse());
      });
  }, []);

  useEffect(() => {
    if (summonersLoading === false) {
      fetch(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonersInfo.id}?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => dispatch(setLeagueInfo(json[0])))
        .then(() => {
          setTimeout(() => {
            dispatch(setLeagueLoadingFalse());
          }, 500);
        });
    }
  }, [summonersLoading]);

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
          <div className="contents-body">
            <div className="contents-container"></div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SummonersContents;
