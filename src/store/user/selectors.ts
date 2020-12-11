import { RootState } from "../types";
export const selectToken = (state: RootState) => {
  return state.user.token;
};

export const selectUser = (state: RootState) => state.user;

export const selectUserLanguage = (state: RootState) => state.user.language;
export const selectUserId = (state: RootState): number => state.user.id;
