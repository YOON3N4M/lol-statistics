import { useEffect, useState } from "react";

function Test() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerInfo, setSummonerInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const API_KEY = "RGAPI-6199f0c4-e65b-48f8-bc98-4251a1a801ff";

  function onChange(event) {
    setSummonerName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    fetch(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        setSummonerInfo(json);
        setLoading((prev) => !prev);
      });
  }

  console.log(summonerInfo);
  return (
    <div>
      <h1>이름 입력해</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={summonerName}></input>
      </form>

      {loading ? null : (
        <div>
          {" "}
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${summonerInfo.profileIconId}.png`}
          />
          <h1>{summonerInfo.name}</h1> <h3>puuid : {summonerInfo.puuid}</h3>
          <h3>레벨 : {summonerInfo.summonerLevel}</h3>
        </div>
      )}
    </div>
  );
}

export default Test;
