import React from "react";
import Form from "../components/form/Form";
import { login } from "../service/auth.service";
import { useAuth } from "../context/AuthContext.utils";

function Login() {
  const { handleLogin } = useAuth();
  const handleSubmit = async (userForm) => {
    const { data: user } = await login(userForm);
    console.log("User -->", user);
    if (user) {
      handleLogin(userForm);
      localStorage.setItem("isLogged", "true");
    }
  };
  return <Form buttonText="login" onSubmit={handleSubmit}></Form>;
}

export default Login;
