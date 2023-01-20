import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSummonersInfo,
  clearSummonersInfo,
  setLoadingTrue,
  setLoadingFalse,
} from "../modules/sumonnersInfo";
import "../css/SummonersContents.css";

const SummonersContents = () => {
  const dispatch = useDispatch();
  const { summonersInfo, loading, userName } = useSelector((state) => ({
    summonersInfo: state.summonersInfo.summonersInfo,
    loading: state.summonersInfo.loading,
    userName: state.summonersInfo.userName,
  }));
  const API_KEY = "RGAPI-a5f9cba4-8e73-4503-8698-db1230444cac";
  /* 테스트 버튼 
  const onClick = () => {
    // 이 부분을 useEffect로 변경 해야함
    dispatch(setLoadingTrue());
    fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(setSummonersInfo(json));
        console.log(summonersInfo);
      });
  };
*/
  useEffect(() => {
    dispatch(setLoadingTrue());
    fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(setSummonersInfo(json));
        console.log(summonersInfo);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(summonersInfo).length !== 0) {
      dispatch(setLoadingFalse());
    }
  }, [summonersInfo]);

  console.log("mynameis", userName);

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
                <div className="level"></div>
              </div>
              <div className="info">
                <div className="tier"></div>
                <div className="name">{summonersInfo.name}</div>
                <button className="refresh-button">전적 갱신</button>
                <div className="last-update">
                  <span>최근 업데이트: 방금 전</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contents-container"></div>
        </>
      ) : null}
    </>
  );
};

export default SummonersContents;
