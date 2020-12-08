import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { AppThunk } from "../types";
export const SET_QUEUE = "SET_QUEUE";

export const getQueue = (): AppThunk => async (dispatch, getState) => {
  const serverResponse = await Axios.get(`${apiUrl}/questions/queue`);
  dispatch({
    type: SET_QUEUE,
    payload: serverResponse.data,
  });
};
