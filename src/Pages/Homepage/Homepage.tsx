import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

export default function Homepage() {
  const [newQuestionBoard, setNewQuestionBoard] = useState<QuestionBoard>({
    name: "",
    description: "",
  });

  useEffect(() => {}, []);

  return (
    <div className="Homepage">
      <h1 className="header">Question Boards</h1>
      <div className="questionBoard-wrapper">
        <div className="questionBoard">
          <h3 className="questionBoard-title">Board 1</h3>
          <p className="questionBoard-description">Description text</p>
        </div>
      </div>
      <div className="questionBoard-create-wrapper">
        <Form className="questionBoard-form">
          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className="las la-user-cog"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => setNewQuestionBoard({ ...newQuestionBoard, name: e.target.value })}
              aria-label="board name"
              placeholder="group name..."
            />
          </InputGroup>
          <InputGroup>
            <FormControl
              onChange={(e) =>
                setNewQuestionBoard({ ...newQuestionBoard, description: e.target.value })
              }
              as="textarea"
              aria-label="description"
              rows={6}
            />
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}
