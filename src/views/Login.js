import React from "react";
import Form from "../components/form/Form";
import { useAuth } from "../context/AuthContext.utils";
import { Link } from "react-router-dom";

function Login() {
  const { handleLogin } = useAuth();
  const handleSubmit = async (userForm) => {
    handleLogin(userForm);
    localStorage.setItem("isLogged", "true");
  };
  return (
    <div>
      <Form buttonText="login" onSubmit={handleSubmit}></Form>
      <p>Don't have an account yet? </p>
      <Link to="/signup">Create an account</Link>
    </div>
  );
}

export default Login;
