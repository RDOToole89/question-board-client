import { RootState } from "../types";

export const selectQueue = (state: RootState) => state.questions.queue;
