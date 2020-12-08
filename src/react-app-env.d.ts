/// <reference types="react-scripts" />
interface Action {
  type: string;
  payload: any;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  classNo: number;
  isTeacher: boolean;
}

interface QuestionBoard {
  id: any;
  name: string;
  description: string;
}
interface Question {
  title: string;
  body: string;
  authorId: number;
  questionBoardId: number;
  upVotes: number;
  resolved: boolean;
  solverId: number;
}
