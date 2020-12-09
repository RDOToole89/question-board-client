import { SAVE_QUESTION, SET_QUEUE } from './actions';

interface QuestionState {
	queue: Question[];
	single: {};
}

const initialState: QuestionState = {
	queue: [],
	single: { author: {}, comments: [] }
};
// eslint-disable-next-line
export default (state = initialState, { type, payload }: Action) => {
	switch (type) {
		case SET_QUEUE:
			return { ...state, queue: [ ...payload ] };

		case SAVE_QUESTION: {
			return {
				...state,
				single: { ...payload }
			};
		}

		default:
			return state;
	}
};
