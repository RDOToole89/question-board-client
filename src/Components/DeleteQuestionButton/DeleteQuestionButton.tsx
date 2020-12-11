import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import io from "socket.io-client";
import { apiUrl } from "../../config/constants";
import { fetchSingleBoard } from "../../store/boards/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
export default function DeleteQuestionButton({
  questionId,
  questionBoardId,
}: {
  questionId: number;
  questionBoardId: number;
}) {
  type SocketRef = { current: any };
  const socketRef: SocketRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    socketRef.current = io.connect(`${apiUrl}`);
  });
  const handleDeleteClick = async (questionIdToDelete: number) => {
    socketRef.current.emit("deleteQuestionById", questionIdToDelete);

    await socketRef.current.on(
      "questionUpdated",
      (updatedQuestion: Question) => {
        dispatch(fetchSingleBoard(questionBoardId));
        // dispatch(fetchSingleBoard(updatedQuestion.questionBoardId));
      }
    );
    history.push(`/boards/${questionBoardId}`);
  };
  return (
    <Button variant="danger" onClick={() => handleDeleteClick(questionId)}>
      Delete question
    </Button>
  );
}
