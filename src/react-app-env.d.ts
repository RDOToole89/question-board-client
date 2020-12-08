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
  id: number;
  authorId: number;
  title: string;
  body: string;
  resolved: boolean;
  upVotes: number;
  solvedId: number | null;
}
