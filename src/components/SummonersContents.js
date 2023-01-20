import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSummonersInfo,
  clearSummonersInfo,
  setLoadingTrue,
  setLoadingFalse,
  setLeagueInfo,
} from "../modules/sumonnersInfo";
import "../css/SummonersContents.css";

const SummonersContents = () => {
  const dispatch = useDispatch();
  const { summonersInfo, loading, userName, leagueInfo } = useSelector(
    (state) => ({
      summonersInfo: state.summonersInfo.summonersInfo,
      loading: state.summonersInfo.loading,
      userName: state.summonersInfo.userName,
      leagueInfo: state.summonersInfo.leagueInfo,
    })
  );
  const API_KEY = "RGAPI-4dda0427-4f3b-40e3-bb07-377be7533581";

  useEffect(() => {
    dispatch(setLoadingTrue());
    fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(setSummonersInfo(json));
      });
  }, []);

  useEffect(() => {
    if (Object.keys(summonersInfo).length !== 0) {
      fetch(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonersInfo.id}?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((json) => dispatch(setLeagueInfo(json[0])));
    }
  }, [summonersInfo]);

  useEffect(() => {
    if (
      Object.keys(summonersInfo).length !== 0 &&
      Object.keys(leagueInfo).length !== 0
    ) {
      dispatch(setLoadingFalse());
    }
  }, [leagueInfo]);

  console.log();

  return (
    <>
      {loading === false ? (
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
