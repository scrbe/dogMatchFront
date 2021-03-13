import React from "react";
import Form from "../components/form/Form";
import { useAuth } from "../context/AuthContext.utils";

function Login() {
  const { handleLogin } = useAuth();
  const handleSubmit = async (userForm) => {
    handleLogin(userForm);
    localStorage.setItem("isLogged", "true");
  };
  return <Form buttonText="login" onSubmit={handleSubmit}></Form>;
}

export default Login;
