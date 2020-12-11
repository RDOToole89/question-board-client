import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

interface ButtonProps {
  questionId: number;
  boardId: number;
}

export default function GoToQuestionButton(props: ButtonProps) {
  const { questionId, boardId } = props;
  const history = useHistory();
  const handleClickToQuestion = (fnBoardId: number, fnQuestionId: number) => {
    history.push(`/boards/${fnBoardId}/questions/${fnQuestionId}`);
  };
  return (
    <Button
      className='queue-button'
      onClick={() => handleClickToQuestion(boardId, questionId)}
      variant='primary'
    >
      Go to question
    </Button>
  );
}
