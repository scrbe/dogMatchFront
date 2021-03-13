import React from "react";
import Profile from "../components/profile/Profile";
import { useAuth } from "../context/AuthContext.utils";

function ProfileView() {
  const { handleLogin } = useAuth();
  const handleSubmit = async (userForm) => {
    handleLogin(userForm);
    localStorage.setItem("isLogged", "true");
  };
  return <Profile buttonText="login" onSubmit={handleSubmit}></Profile>;
}

export default ProfileView;
