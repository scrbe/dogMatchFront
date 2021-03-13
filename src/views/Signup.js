import React from "react";
import Form from "../components/form/Form";
import { useAuth } from "../context/AuthContext.utils";

function Signup() {
  const { handleSignup } = useAuth();
  const handleSubmit = async (user) => {
    handleSignup(user);
    localStorage.setItem("isLogged", "true");
  };
  return <Form buttonText="signup" onSubmit={handleSubmit}></Form>;
}

export default Signup;
