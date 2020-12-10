import { SAVE_COMMENT, SAVE_QUESTION, SET_QUEUE } from "./actions";

interface QuestionState {
  queue: QuestionWithAuthorAndSolver[];
  single: { author: {}; comments: []; tags: [] };
}

const initialState: QuestionState = {
  queue: [],
  single: { author: {}, comments: [], tags: [] },
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case SET_QUEUE:
      return { ...state, queue: [...payload] };

    case SAVE_QUESTION: {
      return {
        ...state,
        single: { ...payload },
      };
    }
    case SAVE_COMMENT: {
      return {
        ...state,

        single: { ...state.single, comments: [{ ...payload }, ...state.single.comments] },

      };
    }

    default:
      return state;
  }
};
