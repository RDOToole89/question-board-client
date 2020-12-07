import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  CHANGE_LANGUAGE,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  language: "En-GB",
};
// eslint-disable-next-line
export default (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    case CHANGE_LANGUAGE:
      return { ...state, language: action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
