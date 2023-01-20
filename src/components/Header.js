import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

function Header() {
  return (
    <>
      <div className="header-box">
        <Link
          style={{ textDecoration: "none" }}
          to={process.env.PUBLIC_URL + "/"}
        >
          <h1 className="header-logo">OP.GG</h1>
        </Link>
      </div>
    </>
  );
}

export default Header;
