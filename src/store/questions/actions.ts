import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { AppThunk } from "../types";
import { selectToken } from "../user/selectors";
export const SET_QUEUE = "SET_QUEUE";

export const getQueue = (): AppThunk => async (dispatch, getState) => {
  const serverResponse = await Axios.get(`${apiUrl}/questions/unresolved`);
  dispatch({
    type: SET_QUEUE,
    payload: serverResponse.data,
  });
};

export const updateQuestion = (
  questionId: number,
  key: string,
  newValue: any
): AppThunk => {
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
  console.log("in upload func");
  return async (dispatch, getState) => {
    console.log("in the thunk");
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
          // headers: { "Content-type": "application/json" },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("uploadNewQuestion answer", answer);
      dispatch(getQueue());
    } catch (error) {
      console.log(error);
    }
  };
};
