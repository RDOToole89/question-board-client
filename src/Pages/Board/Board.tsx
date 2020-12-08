import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleBoard } from "../../store/boards/actions";
import { selectSingleBoard } from "../../store/boards/selectors";
import "./Board.css";

function Board() {
  const params = useParams();
  // @ts-ignore
  const id = params.id;
  const dispatch = useDispatch();
  const board = useSelector(selectSingleBoard);

  console.log(params);

  useEffect(() => {
    dispatch(fetchSingleBoard(id));
  }, [dispatch, id]);

  console.log("BOARD", board);

  return (
    <div className="questionBoard">
      <h1>{board.name}</h1>
      <Container>
        <div className="FORM">
          <h2>Form goes here!</h2>
        </div>
        <div className="QuestionCard-wrapper"></div>
      </Container>
    </div>
  );
}

export default Board;
