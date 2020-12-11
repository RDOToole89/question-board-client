import { RootState } from '../types';

export const selectQueue = (state: RootState) => state.questions.queue;

export const selectQuestion = (state: RootState) => state.questions.single;

export const selectSortedComments = (state: RootState) => {
  interface Date {
    createdAt: string;
  }

  return state.questions.single.comments.sort(
    // @ts-ignore
    (a: Date, b: Date) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};
