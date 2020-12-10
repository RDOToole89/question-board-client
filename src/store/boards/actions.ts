import Axios from 'axios';
import { apiUrl } from '../../config/constants';
import { getQuestion, getQueue } from '../questions/actions';
import { AppThunk } from '../types';

export const SAVE_ALL_BOARDS = 'SAVE_ALL_BOARDS';
export const SAVE_SINGLE_BOARD = 'SAVE_SINGLE_BOARD';

export const saveSingleBoard = (board: {}) => {
  return {
    type: SAVE_SINGLE_BOARD,
    payload: { ...board },
  };
};

export const saveAllBoards = (boards: []) => {
  return {
    type: SAVE_ALL_BOARDS,
    payload: [...boards],
  };
};

export const fetchAllBoards = (): AppThunk => async (dispatch, getState) => {
  try {
    const response = await Axios.get(`${apiUrl}/boards`);

    if (response) {
      dispatch(saveAllBoards(response.data));
      // console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchSingleBoard = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    const response = await Axios.get(`${apiUrl}/boards/${id}`);

    if (response) {
      dispatch(saveSingleBoard({ ...response.data }));
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const createNewBoard = (board: QuestionBoard): AppThunk => async (dispatch, getState) => {
  try {
    const response = await Axios.post(`${apiUrl}/boards`, { ...board });

    if (response) {
      dispatch(fetchAllBoards());
    }
  } catch (e) {
    console.log(e);
  }
};

export const incrementUpvote = (questionId: number): AppThunk => async (dispatch, getState) => {
  try {
    const response = await Axios.put(`${apiUrl}/questions/upvote/${questionId}`);

    console.log(response);

    if (response) {
      dispatch(fetchSingleBoard(1));
      dispatch(getQueue());
    }
  } catch (e) {
    console.log(e);
  }
};

export const incrementCommentUpvote = (questionId: number, commentId: number): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const response = await Axios.put(
      `${apiUrl}/questions/${questionId}/comments/${commentId}/upvotes`
    );

    if (response) {
      dispatch(getQuestion(questionId));
    }
  } catch (e) {
    console.log(e);
  }
};
