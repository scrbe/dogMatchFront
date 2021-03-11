import React from "react";
import Logout from "../auth/Logout";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const pawImg =
    "https://www.kindpng.com/picc/m/195-1951786_purple-dog-paw-print-hd-png-download.png";
  const profileIcon =
    "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg";

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={pawImg} alt="logo" id="logo"></img>
      </Link>
      <Link to={"/profile"}>
        <img src={profileIcon} alt="logo" id="logo"></img>
      </Link>
      <Logout>Logout</Logout>
    </div>
  );
}
export default Navbar;
