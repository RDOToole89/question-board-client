import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import questionBoards from "./boards/reducer";
import questions from "./questions/reducer";

export default combineReducers({
  appState,
  user,
  questionBoards,
  questions,
});
