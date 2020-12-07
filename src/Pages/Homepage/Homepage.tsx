import React, { useEffect, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllBoards } from "../../store/boards/actions";
import { selectAllBoards } from "../../store/boards/selectors";
import "./Homepage.css";

export default function Homepage() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  const [newQuestionBoard, setNewQuestionBoard] = useState<QuestionBoard>({
    id: 0,
    name: "",
    description: "",
  });

  console.log("NEWBOARD", newQuestionBoard);
  console.log("BOARDS", boards);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  const handleCreateBoard = (e: any) => {
    e.preventDefault();
    console.log("CLICK CLICK CREATE");
  };

  return (
    <div className="Homepage">
      <h1 className="header">Question Boards</h1>
      <div className="Homepage-container">
        <div className="questionBoard-wrapper">
          {boards.map((board: QuestionBoard) => {
            return (
              <Card className="mb-4" key={board.id} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{board.name}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                  <Card.Text>{board.description}</Card.Text>
                  <Link to={`/boards/${board.id}/`}>
                    <Card.Link>Go to board</Card.Link>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div className="questionBoard-create-wrapper">
          <h2 className="header-medium">Create a new board</h2>
          <Form className="questionBoard-form">
            <InputGroup className="mb-1">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="las la-user-cog"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="questionBoard-form-input"
                onChange={(e) => setNewQuestionBoard({ ...newQuestionBoard, name: e.target.value })}
                aria-label="board name"
                placeholder="group name..."
              />
            </InputGroup>
            <InputGroup>
              <FormControl
                className="questionBoard-form-input"
                onChange={(e) =>
                  setNewQuestionBoard({ ...newQuestionBoard, description: e.target.value })
                }
                as="textarea"
                aria-label="description"
                rows={4}
              />
            </InputGroup>
            <Button variant="success" onClick={handleCreateBoard}>
              Create Board
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
