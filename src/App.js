import React from "react";
import { Switch, Route } from "react-router-dom";
import DogList from "./components/dogs/DogList";
import DogDetails from "./components/dogs/DogDetails";
import AnonRoute from "./routes/AnonRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/profile/Profile";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/dogs">
          <DogList />
        </Route>
        <Route path="/dogs/:dogId">
          <DogDetails />
        </Route>
        <PrivateRoute path="/profile/:userId">
          <Profile />
        </PrivateRoute>
        <AnonRoute exact path="/signup">
          <Signup />
        </AnonRoute>
        <AnonRoute exact path="/login">
          <Login />
        </AnonRoute>
      </Switch>
    </div>
  );
}

export default App;
