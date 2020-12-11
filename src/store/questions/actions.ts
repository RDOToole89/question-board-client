import Axios from 'axios';
import { apiUrl } from '../../config/constants';
import { AppThunk } from '../types';
import { fetchSingleBoard } from '../boards/actions';
import { selectToken } from '../user/selectors';
export const SET_QUEUE = 'SET_QUEUE';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_COMMENT = 'SAVE_COMMENT';

export const saveQuestion = (question: {}) => {
  return {
    type: SAVE_QUESTION,
    payload: { ...question },
  };
};

export const saveComment = (comment: {}) => {
  return {
    type: SAVE_COMMENT,
    payload: { ...comment },
  };
};

export const getQueue = (): AppThunk => async (dispatch, getState) => {
  const serverResponse = await Axios.get(`${apiUrl}/questions/unresolved`);
  dispatch({
    type: SET_QUEUE,
    payload: serverResponse.data,
  });
  return serverResponse.data;
};

export const getQuestion = (questionId: number): AppThunk => async (dispatch, getState) => {
  try {
    const response = await Axios.get(`${apiUrl}/questions/${questionId}`);

    if (response) {
      dispatch(saveQuestion(response.data));
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateComment = (
  commentId: number,
  questionId: number,
  key: string,
  newValue: any
): AppThunk => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const serverResponse = await Axios.put(
      `${apiUrl}/questions/${questionId}/comments/${commentId}/`,
      {
        key,
        newValue,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(serverResponse);
    dispatch(getQuestion(questionId));
  };
};

export const updateQuestion = (questionId: number, key: string, newValue: any): AppThunk => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const serverResponse = await Axios.put(
      `${apiUrl}/questions/${questionId}`,
      {
        key,
        newValue,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(serverResponse);
    dispatch(getQueue());
  };
};

export const uploadNewQuestion = (
  title: string,
  body: string,
  questionBoardId: number,
  base64EncodedImage: string,
  tags: string[]
): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      const answer = await Axios.post(
        `${apiUrl}/questions`,
        {
          image: base64EncodedImage,
          title,
          questionBoardId,
          body,
          tags,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await dispatch(getQueue());
      await dispatch(fetchSingleBoard(questionBoardId));
      return answer;
    } catch (error) {
      console.log(error);
    }
  };
};
