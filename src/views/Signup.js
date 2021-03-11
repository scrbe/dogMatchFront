import React from "react";
import Form from "../components/form/Form";
import { signup } from "../service/auth.service";
import { useAuth } from "../context/AuthContext.utils";

function Signup() {
  const { handleSignup } = useAuth();
  const handleSubmit = async (data) => {
    const { data: user } = await signup(data);
    console.log("User -->", user);
    if (user) {
      handleSignup(user);
    }
  };
  return <Form buttonText="signup" onSubmit={handleSubmit}></Form>;
}

export default Signup;
