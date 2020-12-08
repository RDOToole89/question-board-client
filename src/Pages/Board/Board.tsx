import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import { fetchSingleBoard } from "../../store/boards/actions";
import { selectQuestions, selectSingleBoard } from "../../store/boards/selectors";
import "./Board.css";

function Board() {
  const params = useParams();
  // @ts-ignore
  const id = params.id;
  const dispatch = useDispatch();
  const board = useSelector(selectSingleBoard);
  const questions = useSelector(selectQuestions);

  useEffect(() => {
    dispatch(fetchSingleBoard(id));
  }, [dispatch, id]);

  console.log(board);
  console.log(questions);

  return (
    <div className="QuestionBoard">
      <div className="QuestionBoard-title-wrapper">
        <h1>{board.name}</h1>
        <p>{board.description}</p>
      </div>
      <Container>
        <div className="FORM">
          <h2 className="text-center">Form goes here!</h2>
        </div>
        <div className="QuestionCard-wrapper">
          {questions?.map((x: Question) => {
            return <QuestionCard />;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Board;
