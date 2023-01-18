import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSummonersInfo,
  clearSummonersInfo,
  setLoadingTrue,
  setLoadingFalse,
} from "../modules/sumonnersInfo";

const SumonnersInfoContainer = () => {
  const dispatch = useDispatch();
  const { summonersInfo, loading, userName } = useSelector((state) => ({
    summonersInfo: state.summonersInfo.summonersInfo,
    loading: state.summonersInfo.loading,
    userName: state.summonersInfo.userName,
  }));
  const API_KEY = "RGAPI-f82d759c-a51d-4ff3-98dc-408f999aff87";

  const onClick = () => {
    dispatch(setLoadingTrue());
    fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userName}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(setSummonersInfo(json));
      })
      .then(console.log(loading));
  };

  useEffect(() => {
    if (Object.keys(summonersInfo).length !== 0) {
      dispatch(setLoadingFalse());
    }
  }, [summonersInfo]);

  console.log("mynameis", userName);

  return (
    <div>
      <button onClick={onClick}>call it</button>
      {loading === false ? <h1>data good</h1> : <h1>data yet</h1>}
    </div>
  );
};

export default SumonnersInfoContainer;
