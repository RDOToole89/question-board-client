export function sortQuestionArrayById(
  questionArray: Question[] | QuestionWithAuthorAndSolver[]
) {
  return questionArray.sort((a, b) => a.id - b.id);
}
