import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AppNavbar from "./Components/Navbar/AppNavbar";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <AppNavbar />

      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
