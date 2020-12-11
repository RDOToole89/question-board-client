export function sortQuestionArrayById(
  questionArray: Question[] | QuestionWithAuthorAndSolver[]
) {
  return questionArray.sort((a, b) => a.id - b.id);
}
function booleanToInt(bool: boolean | null) {
  return bool ? 1 : 0;
}
export function sortByIsSolution(commentsArray: Comment[]) {
  return commentsArray.sort((a, b) => {
    return booleanToInt(b.isSolution) - booleanToInt(a.isSolution);
  });
}
export function sortByUpVotes(commentsArray: Comment[]) {
  return commentsArray.sort((a, b) => {
    return b.upVotes - a.upVotes;
  });
}
