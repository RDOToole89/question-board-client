import { SAVE_ALL_BOARDS, SAVE_SINGLE_BOARD } from "./actions";

const initialState = {
  loading: false,
  all: [],
  single: {},
};

const boardsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SAVE_ALL_BOARDS: {
      return { ...state, all: [...action.payload] };
    }
    case SAVE_SINGLE_BOARD: {
      return {
        ...state,
        single: { ...action.payload },
      };
    }

    default:
      return state;
  }
};

export default boardsReducer;
