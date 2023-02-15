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

    /* 연속된 검색 동작에서 버그가 생겨서 일단 주석처리
         dispatch(clearAll());
    if (username.length === 2) {
      const usernameRe = `${username[0]} ${username[1]}`;
      dispatch(setUserName(usernameRe));
      navigate(`${process.env.PUBLIC_URL}/summoners/kr/${usernameRe}`);
    } else {
      console.log(username);
      dispatch(setUserName(username));
      navigate(`${process.env.PUBLIC_URL}/summoners/kr/${username}`);
    }
    //window.location.reload(); 깃허브 페이지에서 해당 부분 에러가 남
    */
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
