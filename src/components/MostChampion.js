import { useState, useEffect } from "react";
function MostChampion({ champion }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState({ winRateC: "", kdaC: "" });
  const match = champion[1];
  const gameQty = match.length;
  const totalKills = match.reduce(function add(sum, item) {
    return sum + item.kills;
  }, 0);
  const totalDeaths = match.reduce(function add(sum, item) {
    return sum + item.deaths;
  }, 0);
  const totalAssists = match.reduce(function add(sum, item) {
    return sum + item.assists;
  }, 0);
  const totalMobKills = match.reduce(function add(sum, item) {
    return sum + item.neutralMinionsKilled;
  }, 0);
  const totalCsKills = match.reduce(function add(sum, item) {
    return sum + item.totalMinionsKilled;
  }, 0);
  const cs = totalMobKills + totalCsKills;
  const csAver = (cs / gameQty).toFixed(1);
  const totalKda = (totalKills + totalAssists) / totalDeaths;
  const wins = match.filter((e) => e.win === true).length;
  const winRate = (wins / gameQty) * 100;
  useEffect(() => {
    if (champion[0] === "FiddleSticks") {
      setName((prev) => "Fiddlesticks");
    } else {
      setName(champion[0]);
    }

    if (winRate >= 60) {
      setColor((prev) => {
        return { ...prev, winRateC: "red" };
      });
    }
    if (4 > totalKda && totalKda >= 3) {
      setColor((prev) => {
        return { ...prev, kdaC: "mint" };
      });
    } else if (5 > totalKda && totalKda >= 4) {
      setColor((prev) => {
        return { ...prev, kdaC: "sky" };
      });
    } else if (totalKda >= 5) {
      setColor((prev) => {
        return { ...prev, kdaC: "orange" };
      });
    }
  }, []);
  console.log(totalKda);
  return (
    <>
      {name !== "" ? (
        <div className="champion-box">
          <div className="most-face">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${name}.png`}
            />
          </div>
          <div className="most-info">
            <div className="most-name">{name}</div>
            <div className="cs">CS {csAver}</div>
          </div>
          <div className="most-stats">
            <div className={`${color.kdaC} most-kda`}>
              {totalKda === Infinity ? (
                "Perfect"
              ) : (
                <> {totalKda.toFixed(2)}:1평점</>
              )}
            </div>
            <div className="most-k-d-a">
              {(totalKills / gameQty).toFixed(1)} /{" "}
              {(totalDeaths / gameQty).toFixed(1)} /{" "}
              {(totalAssists / gameQty).toFixed(1)}
            </div>
          </div>
          <div className="played">
            <div className={`${color.winRateC} most-winrate`}>
              {Math.round(winRate)}%
            </div>
            <div className="most-gameqty">{gameQty}게임</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MostChampion;
