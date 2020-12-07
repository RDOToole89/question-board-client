import { SAVE_ALL_BOARDS } from "./actions";

const initialState = {
  loading: false,
  all: [],
};

const boardsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SAVE_ALL_BOARDS: {
      return { ...state, all: [...action.payload] };
    }

    default:
      return state;
  }
};

export default boardsReducer;
