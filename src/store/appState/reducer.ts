import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  TOGGLE_SIDEBAR,
} from "./actions";

const initialState = {
  loading: false,
  message: null,
  today: new Date(),
  showSidebar: false,
};
// eslint-disable-next-line
export default (state = initialState, action: Action) => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_MESSAGE:
      return { ...state, message: null };
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };

    default:
      return state;
  }
};
