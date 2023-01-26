import React from "react";
import Header from "../components/Header";
import "../css/Home.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../modules/sumonnersInfo";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName } = useSelector((state) => ({
    userName: state.summonersInfo.userName,
  }));
  const [username, setUsername] = useState("");

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(setUserName(username));
    navigate(`summoners/kr/${username}`);
    //window.location.href = `/${userName}`;
  }

  return (
    <>
      <Header />
      <div className="home-wrap">
        <div className="home-logo-box">
          <span className="home-logo">OP.GG</span>
        </div>
        <div className="search-container">
          <form onSubmit={onSubmit}>
            <div className="search-box">
              <div className="region-option">
                <small className="label">Region</small>
                <span className="selected-region">Korea</span>
              </div>
              <div className="line"></div>
              <div className="input-box">
                <small className="label">Search</small>
                <input
                  onChange={onChange}
                  className="search-input"
                  placeholder="소환사명..."
                  value={username}
                ></input>
              </div>
              <span className="search-btn">.GG</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
