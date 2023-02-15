import React from "react";
import Header from "../components/Header";
import "../css/Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, clearAll } from "../modules/sumonnersInfo";
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
    // 닉네임이 두 글자일 경우 정상적인 소환사 조회가 불가능하여, 사이에 공백을 넣어서 처리함.
    if (username.length === 2) {
      const usernameRe = `${username[0]} ${username[1]}`;
      dispatch(setUserName(usernameRe));
      navigate(`summoners/kr/${usernameRe}`);
    } else {
      console.log(username);
      dispatch(setUserName(username));
      navigate(`summoners/kr/${username}`);
    }
  }

  useEffect(() => {
    dispatch(clearAll());
  }, []);

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
              <span onClick={onSubmit} className="search-btn">
                .GG
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
