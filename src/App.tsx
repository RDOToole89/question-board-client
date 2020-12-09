import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AppNavbar from "./Components/Navbar/AppNavbar";
import Queue from "./Components/Queue/Queue";
import Board from "./Pages/Board/Board";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { getQueue } from "./store/questions/actions";
import { getUserWithStoredToken } from "./store/user/actions";
import { selectToken, selectUserId } from "./store/user/selectors";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(getQueue());
  }, [dispatch]);
  useEffect(() => {
    // if the user reloads the app, we fetch his data from the server.
    if (!userId && token) {
      dispatch(getUserWithStoredToken());
    }
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
