import { SET_QUEUE } from "./actions";

interface QuestionState {
  queue: Question[];
}

const initialState: QuestionState = {
  queue: [],
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case SET_QUEUE:
      return { ...state, queue: [...payload] };

    default:
      return state;
  }
};
