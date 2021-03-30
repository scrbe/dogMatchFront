import React from "react";
import Logout from "../auth/Logout";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import "./navbar.css";

function Footer() {
  const { user } = useAuth();

  const pawImg = "../../../paw-no-background.png";
  const profileIcon =
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
  const dogIcon =
    "https://pupuphooray.com/wp-content/uploads/2019/03/dog-icon.png";
  return (
    <div className="footer">
      <div>
        <Link to={"/"}>
          <img src={pawImg} alt="logo" id="logo"></img>
        </Link>
      </div>
      <div>
        <Link to={"/dogs"}>
          <img src={dogIcon} alt="logo" id="logo"></img>
        </Link>
      </div>

      {user.isLogged && (
        <div className="footer-int-container">
          <Link to={`/profile/${user.id}`}>
            <img src={profileIcon} alt="logo" id="logo"></img>
          </Link>
          <Logout className="logout-button">Logout</Logout>
        </div>
      )}
      {user.isLogged || (
        <Link to="/login" className="login-button">
          Login
        </Link>
      )}
    </div>
  );
}
export default Footer;
