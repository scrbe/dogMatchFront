import React from "react";
import Form from "../components/form/Form";
import { useAuth } from "../context/AuthContext.utils";
import "./login.css";

function Signup() {
  const { handleSignup, errorMessage } = useAuth();
  const handleSubmit = async (user) => {
    handleSignup(user);
    localStorage.setItem("isLogged", "true");
  };
  return (
    <div className="log-container">
      <h2>Sign up</h2>
      <Form buttonText="Signup" onSubmit={handleSubmit}></Form>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Signup;
