import { RootState } from '../types';

export const selectQueue = (state: RootState) => state.questions.queue;

export const selectQuestion = (state: RootState) => state.questions.single;
