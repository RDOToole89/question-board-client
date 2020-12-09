import React, { useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { uploadNewQuestion } from "../../store/questions/actions";
import { useDispatch } from "react-redux";
// import { selectUserId } from "../../store/user/selectors";
// import { useSelector } from "react-redux";

interface NewQuestion {
  title: string;
  body: string;

  questionBoardId: number;
  tags: [];
}
interface BoardParams {
  id?: string | undefined;
}
export default function QuestionForm(props: any) {
  const params: BoardParams = useParams();

  const questionBoardId = params.id;

  const [newQuestion, setNewQuestion] = useState<NewQuestion>({
    title: "",
    body: "",
    //@ts-ignore
    questionBoardId,
    tags: [],
  });
  const [fileInputState, setFileInputState] = useState<any>("");
  const [previewSource, setPreviewSource] = useState<any>();
  const handleFileUpload = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      previewFile(file);
    }
  };
  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (previewSource) {
      console.log("submiting");
      const reader = new FileReader();
      const { title, body, questionBoardId, tags } = newQuestion;
      dispatch(
        uploadNewQuestion(title, body, questionBoardId, previewSource, tags)
      );
    }
  };
  console.log(newQuestion);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Post a new question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, title: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              Please choose a descriptive title
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>

            <FormControl
              as="textarea"
              aria-label="With textarea"
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, body: e.target.value })
              }
            />
          </Form.Group>
          <Form.File id="formcheck-api-regular">
            <Form.File.Label>Add a screenshot</Form.File.Label>
            <Form.File.Input
              value={fileInputState}
              onChange={handleFileUpload}
            />
            {previewSource && (
              <img
                src={previewSource}
                alt="preview"
                style={{ height: "300px" }}
              />
            )}
          </Form.File>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
