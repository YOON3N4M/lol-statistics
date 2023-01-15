import React from "react";
import Header from "../component/Header";
import "../css/Home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="home-wrap">
        <div className="home-logo-box">
          <span className="home-logo">OP.GG</span>
        </div>
        <div className="search-input-box">
          <form>
            <div className="input-box"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
