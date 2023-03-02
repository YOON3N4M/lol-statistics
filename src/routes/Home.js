import React from "react";
import Header from "../components/Header";
import "../css/Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, clearAll } from "../modules/sumonnersInfo";
import { useNavigate } from "react-router-dom";
import topIcon from "../img/lane/top.svg";
import jgIcon from "../img/lane/jg.svg";
import midIcon from "../img/lane/mid.svg";
import adcIcon from "../img/lane/adc.svg";
import supIcon from "../img/lane/sup.svg";
import geng from "../img/team/geng.png";
import t1 from "../img/team/t1.png";
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
    if (username.trim() === "") {
    } else if (username.length === 2) {
      const usernameRe = `${username[0]} ${username[1]}`;
      dispatch(setUserName(usernameRe));
      navigate(`summoners/kr/${usernameRe}`);
    } else {
      dispatch(setUserName(username));
      navigate(`summoners/kr/${username}`);
    }
  }

  useEffect(() => {
    dispatch(clearAll());
  }, []);

  function onClick(name) {
    dispatch(setUserName(name));
    navigate(`summoners/kr/${name}`);
  }
  const sktMember = {
    top: "2U35",
    jg: "쇼호쿠 정대만",
    mid: "Hide on bush",
    adc: "T1 Gumayusi",
    sup: "역천괴",
  };

  const gengMember = {
    top: "어리고싶다",
    jg: "XiaoHuaSheng7",
    mid: "GOOD GAME GG XD",
    adc: "으끄으끄",
    sup: "빨간머리 강백호",
  };

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

        <div className="pro-container">
          <div className="pro-header">
            <span>프로게이머 전적 바로가기</span>
          </div>
          <div className="team-container">
            <div className="team-left">
              <div className="team-header">
                <div>
                  <img className="t-one" src={t1} />
                </div>
              </div>
              <div onClick={() => onClick(sktMember.top)} className="pro">
                <div className="pro-lane">
                  <img src={topIcon} />
                </div>
                <div className="pro-nick">Zeus</div>
                <div className="pro-name">최우제</div>
              </div>
              <div onClick={() => onClick(sktMember.jg)} className="pro">
                <div className="pro-lane">
                  <img src={jgIcon} />
                </div>
                <div className="pro-nick">Oner</div>
                <div className="pro-name">문현준</div>
              </div>{" "}
              <div onClick={() => onClick(sktMember.mid)} className="pro">
                <div className="pro-lane">
                  <img src={midIcon} />
                </div>
                <div className="pro-nick">Faker</div>
                <div className="pro-name">이상혁</div>
              </div>{" "}
              <div onClick={() => onClick(sktMember.adc)} className="pro">
                <div className="pro-lane">
                  {" "}
                  <img src={adcIcon} />
                </div>
                <div className="pro-nick">Gumayusi</div>
                <div className="pro-name">이민형</div>
              </div>{" "}
              <div onClick={() => onClick(sktMember.sup)} className="pro">
                <div className="pro-lane">
                  <img src={supIcon} />
                </div>
                <div className="pro-nick">Keria</div>
                <div className="pro-name">류민석</div>
              </div>
            </div>
            <div className="team-right">
              <div className="team-header">
                {" "}
                <div>
                  <img className="geng" src={geng} />
                </div>
              </div>
              <div onClick={() => onClick(gengMember.top)} className="pro">
                <div className="pro-lane">
                  <img src={topIcon} />
                </div>
                <div className="pro-nick">Doran</div>
                <div className="pro-name">최현준</div>
              </div>
              <div onClick={() => onClick(gengMember.jg)} className="pro">
                <div className="pro-lane">
                  <img src={jgIcon} />
                </div>
                <div className="pro-nick">Peanut</div>
                <div className="pro-name">한왕호</div>
              </div>{" "}
              <div onClick={() => onClick(gengMember.mid)} className="pro">
                <div className="pro-lane">
                  <img src={midIcon} />
                </div>
                <div className="pro-nick">Chovy</div>
                <div className="pro-name">정지훈</div>
              </div>{" "}
              <div onClick={() => onClick(gengMember.adc)} className="pro">
                <div className="pro-lane">
                  {" "}
                  <img src={adcIcon} />
                </div>
                <div className="pro-nick">Payz</div>
                <div className="pro-name">김수환</div>
              </div>{" "}
              <div onClick={() => onClick(gengMember.sup)} className="pro">
                <div className="pro-lane">
                  <img src={supIcon} />
                </div>
                <div className="pro-nick">Delight</div>
                <div className="pro-name">유환중</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
