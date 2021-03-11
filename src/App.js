import React from "react";
import { Switch } from "react-router-dom";
import DogList from "./components/dogs/DogList";
import DogDetails from "./components/dogs/DogDetails";
import AnonRoute from "./routes/AnonRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Switch>
        <PrivateRoute exact path="/dogs">
          <DogList />
        </PrivateRoute>
        <PrivateRoute path="/dogs/:dogId">
          <DogDetails />
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
