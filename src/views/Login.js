import React from "react";
import Form from "../components/form/Form";
import { useAuth } from "../context/AuthContext.utils";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const { handleLogin, errorMessage } = useAuth();
  const handleSubmit = async (userForm) => {
    handleLogin(userForm);
    localStorage.setItem("isLogged", "true");
  };
  console.log("errorMessage :>> ", errorMessage);
  return (
    <div className="log-container">
      <h2>Log in</h2>
      <p>
        New to DogMatch ? <Link to="/signup">Sign up for free!</Link>
      </p>
      <div className="form-fields">
        <Form buttonText="login" onSubmit={handleSubmit}></Form>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}

export default Login;
