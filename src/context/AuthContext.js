import React from "react";
import { login, logout, signup } from "../service/auth.service";
import {
  getLocalUser,
  saveUser,
  removeUser,
  defaultUser,
} from "./AuthContext.utils";

export const AuthContext = React.createContext({});

const initialState = {
  user: getLocalUser(),
};

function AuthProvider({ children }) {
  const [state, setState] = React.useState(initialState);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = React.useCallback(async (user) => {
    try {
      setErrorMessage("");
      const { data: loggedUser } = await login(user);
      saveUser(loggedUser);
      setState({ user: { ...loggedUser, isLogged: true } });
    } catch (e) {
      console.error(e);
      if (e.response.data.message === "user does not exist") {
        setErrorMessage("User does not exist... Please sign up :)");
      }
      if (e.response.data.message === "unauthorize") {
        setErrorMessage("Wrong password. Try again !");
      }
      if (e.response.data.message === "incorrect email format") {
        setErrorMessage("Incorrect email format :(");
      }
    }
  }, []);

  const handleSignup = React.useCallback(async (user) => {
    try {
      setErrorMessage("");
      const { data: loggedUser } = await signup(user);
      saveUser(loggedUser);
      setState({ user: { ...loggedUser, isLogged: true } });
    } catch (e) {
      console.error(e);
      if (e.response.data.message === "user alredy exists") {
        setErrorMessage("User alredy exists. Log in instead !");
      }
      if (e.response.data.message === "incorrect email format") {
        setErrorMessage("Incorrect email format... Please try again.");
      }
    }
  }, []);

  const handleLogout = React.useCallback(async () => {
    try {
      await logout();
      removeUser();
      setState({ user: defaultUser() });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        handleLogin,
        handleLogout,
        handleSignup,
        setUser: setState,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
