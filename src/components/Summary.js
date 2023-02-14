import React, { useState, useEffect } from "react";

function Summary({ champion }) {
  const [color, setColor] = useState({ winRateC: "", kdaC: "" });
  const name = champion[0];
  const match = champion[1];
  const win = match.filter((e) => e.win === true).length;
  const lose = match.filter((e) => e.win === false).length;
  const kills = match.reduce(function add(sum, item) {
    return sum + item.kills;
  }, 0);
  const deaths = match.reduce(function add(sum, item) {
    return sum + item.deaths;
  }, 0);
  const assists = match.reduce(function add(sum, item) {
    return sum + item.assists;
  }, 0);
  const winRate = (win / (win + lose)) * 100;
  const kda = ((kills + assists) / deaths).toFixed(2);
  useEffect(() => {
    if (winRate >= 60) {
      setColor((prev) => {
        return { ...prev, winRateC: "red" };
      });
      if (4 > kda >= 3) {
        setColor((prev) => {
          return { ...prev, kdaC: "mint" };
        });
      } else if (5 > kda >= 4) {
        setColor((prev) => {
          return { ...prev, kdaC: "sky" };
        });
      } else if (kda >= 5) {
        setColor((prev) => {
          return { ...prev, kdaC: "orange" };
        });
      }
    }
  }, []);

  return (
    <>
      <li className="sum-li">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${name}.png`}
        ></img>
        <div className="win-lose">
          <span className={color.winRateC}>{winRate}% </span>({win}승 {lose}패)
          <span className={color.kdaC}> {kda} 평점</span>
        </div>
      </li>
    </>
  );
}
export default Summary;
