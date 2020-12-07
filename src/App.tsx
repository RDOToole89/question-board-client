import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AppNavbar from "./Components/Navbar/AppNavbar";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      question board app
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        {/* <Route path="/signup" component={SignUp} /> */}
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
