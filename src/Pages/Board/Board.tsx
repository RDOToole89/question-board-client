import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import QuestionForm from "../../Components/QuestionForm/QuestionForm";
import { fetchSingleBoard } from "../../store/boards/actions";
import {
  selectQuestions,
  selectSingleBoard,
} from "../../store/boards/selectors";
import "./Board.css";

function Board() {
  const params = useParams();
  // @ts-ignore
  const id = params.id;
  const dispatch = useDispatch();
  const board = useSelector(selectSingleBoard);
  const questions = useSelector(selectQuestions);
  const [modalShow, setModalShow] = useState(false);

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
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Post a new question
          </Button>

          <QuestionForm show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <div className="QuestionCard-wrapper">
          {questions?.map((x: Question) => {
            return (
              // @ts-ignore
              <QuestionCard
                key={x.id}
                messageId={x.id}
                title={x.title}
                body={x.body}
                resolved={x.resolved}
                upVotes={x.upVotes}
                tags={x.tags}
                createdAt={x.createdAt}
                // @ts-ignore
                author={x.author}
                boardId={id}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Board;
