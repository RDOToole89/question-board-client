import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AppNavbar from "./Components/Navbar/AppNavbar";
import Queue from "./Components/Queue/Queue";
import Board from "./Pages/Board/Board";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { getQueue } from "./store/questions/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in the useEffect");
    dispatch(getQueue());
  });
  return (
    <div className="App">
      <AppNavbar />
      <div className="app-body">
        <Queue />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/boards/:id" component={Board} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
