export const selectAllBoards = (reduxState: any) => {
  return reduxState.questionBoards.all;
};

export const selectSingleBoard = (reduxState: any) => {
  return reduxState.questionBoards.single;
};
