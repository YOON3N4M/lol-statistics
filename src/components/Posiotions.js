import { useEffect } from "react";
import topIcon from "../img/lane/top.svg";
import jgIcon from "../img/lane/jg.svg";
import midIcon from "../img/lane/mid.svg";
import adcIcon from "../img/lane/adc.svg";
import supIcon from "../img/lane/sup.svg";
function Positions({ currentMatch, setPositions, positions }) {
  useEffect(() => {
    if (currentMatch.length !== 0) {
      const top = currentMatch.filter(
        (e) => e.individualPosition === "TOP"
      ).length;
      const jg = currentMatch.filter(
        (e) => e.individualPosition === "JUNGLE"
      ).length;
      const mid = currentMatch.filter(
        (e) => e.individualPosition === "MIDDLE"
      ).length;
      const adc = currentMatch.filter(
        (e) => e.individualPosition === "BOTTOM"
      ).length;
      const sup = currentMatch.filter(
        (e) => e.individualPosition === "UTILITY"
      ).length;
      setPositions((prev) => {
        return {
          ...prev,
          top: top,
          jungle: jg,
          mid: mid,
          adc: adc,
          sup: sup,
        };
      });
    }
  }, []);
  const topP = `${Math.round((positions.top / currentMatch.length) * 100)}%`;
  const jgP = `${Math.round((positions.jungle / currentMatch.length) * 100)}%`;
  const midP = `${Math.round((positions.mid / currentMatch.length) * 100)}%`;
  const adcP = `${Math.round((positions.adc / currentMatch.length) * 100)}%`;
  const supP = `${Math.round((positions.sup / currentMatch.length) * 100)}%`;

  return (
    <>
      <div style={{ textAlign: "center" }} className="title">
        선호 포지션
      </div>
      <ul className="positions-ul">
        <li>
          <div className="bar">
            <div style={{ height: topP }} className="gauge"></div>
          </div>
          <img src={topIcon} />
        </li>
        <li>
          <div className="bar">
            <div style={{ height: jgP }} className="gauge"></div>
          </div>
          <img src={jgIcon} />
        </li>
        <li>
          <div className="bar">
            <div style={{ height: midP }} className="gauge"></div>
          </div>
          <img src={midIcon} />
        </li>
        <li>
          <div className="bar">
            <div style={{ height: adcP }} className="gauge"></div>
          </div>
          <img src={adcIcon} />
        </li>
        <li>
          <div className="bar">
            <div style={{ height: supP }} className="gauge"></div>
          </div>
          <img src={supIcon} />
        </li>
      </ul>
    </>
  );
}

export default Positions;
