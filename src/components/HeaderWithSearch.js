import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, clearAll } from "../modules/sumonnersInfo";
import { useNavigate } from "react-router-dom";
function HeaderWithSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  function onChange(e) {
    setUsername(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    dispatch(clearAll());
    // 닉네임이 두 글자일 경우 정상적인 소환사 조회가 불가능하여, 사이에 공백을 넣어서 처리함.
    if (username.length === 2) {
      const usernameRe = `${username[0]} ${username[1]}`;
      dispatch(setUserName(usernameRe));
      navigate(`/summoners/kr/${usernameRe}`);
    } else {
      console.log(username);
      dispatch(setUserName(username));
      navigate(`/summoners/kr/${username}`);
    }
    window.location.reload();
  }

  return (
    <>
      <div className="header-box">
        <Link
          style={{ textDecoration: "none" }}
          to={process.env.PUBLIC_URL + "/"}
        >
          <h1 className="header-logo">OP.GG</h1>
        </Link>
        <form onSubmit={onSubmit}>
          <div className="nav-search-box">
            <div className="nav-search-region">
              <span>KR</span>
            </div>
            <div className="nav-search-input-box">
              <input
                value={username}
                onChange={onChange}
                className="nav-search-input"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default React.memo(HeaderWithSearch);
