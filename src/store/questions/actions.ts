import Axios from 'axios';
import { apiUrl } from '../../config/constants';
import { AppThunk } from '../types';
import { selectToken } from '../user/selectors';
export const SET_QUEUE = 'SET_QUEUE';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export const saveQuestion = (question: {}) => {
	return {
		type: SAVE_QUESTION,
		payload: { ...question }
	};
};

export const getQueue = (): AppThunk => async (dispatch, getState) => {
	const serverResponse = await Axios.get(`${apiUrl}/questions/unresolved`);
	dispatch({
		type: SET_QUEUE,
		payload: serverResponse.data
	});
};

export const getQuestion = (questionId: number): AppThunk => async (dispatch, getState) => {
	try {
		const response = await Axios.get(`${apiUrl}/questions/${questionId}`);

		if (response) {
			console.log(response);
			dispatch(saveQuestion(response.data));
		}
	} catch (e) {
		console.log(e);
	}
};

export const updateQuestion = (questionId: number, key: string, newValue: any): AppThunk => {
	return async (dispatch, getState) => {
		const token = selectToken(getState());
		const serverResponse = await Axios.put(
			`${apiUrl}/questions/${questionId}`,
			{
				key,
				newValue
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		console.log(serverResponse);
		dispatch(getQueue());
	};
};
