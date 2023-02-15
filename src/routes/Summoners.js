import HeaderWithSearch from "../components/HeaderWithSearch";
import SummonersContents from "../components/SummonersContents";
import { useSelector } from "react-redux";

function Summoners() {
  const { summonersLoading } = useSelector((state) => ({
    summonersLoading: state.summonersInfo.summonersLoading,
  }));
  return (
    <>
      <HeaderWithSearch />
      <SummonersContents />
    </>
  );
}

export default Summoners;
