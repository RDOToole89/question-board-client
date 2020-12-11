import React, { useEffect, useRef } from "react";
import { selectQueue } from "../../store/questions/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { selectShowSidebar } from "../../store/appState/selectors";
import { Button, Card } from "react-bootstrap";
import { toggleSidebar } from "../../store/appState/actions";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import UpVotes from "../UpVotes/UpVotes";
import GoToQuestionButton from "../GoToQuestionButton.tsx/GoToQuestionButton";
import { getQueue } from "../../store/questions/actions";
import { selectUser, selectUserId } from "../../store/user/selectors";
import { sortQuestionArrayById } from "../../globalFunctions";
import io from "socket.io-client";
import { apiUrl } from "../../config/constants";

interface propsButton {
  text: string;
}

function ToggleSidebarButton({ text }: propsButton) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(toggleSidebar())}
      className="sidebar-button"
    >
      {text}
    </Button>
  );
}
interface PropsQuestion {
  question: QuestionWithAuthorAndSolver;
}
function PendingQuestion({ question }: PropsQuestion) {
  const { id, title, author, upVotes, solver } = question;
  const { firstName, lastName, classNo } = author;

  type SocketRef = { current: any };
  const socketRef: SocketRef = useRef();

  const userId = useSelector(selectUserId);
  const isUserATeacher = useSelector(selectUser).isTeacher;
  const dispatch = useDispatch();
  const handleResolvedClick = (questionId: number) => {
    //dispatch(updateQuestion(questionId, "resolved", true));
    socketRef.current.emit("resolveQuestion", questionId);
  };
  const helpClickHandler = (questionId: number, solverId: number | null) => {
    //dispatch(updateQuestion(questionId, "solverId", solverId));
    socketRef.current.emit("updateSolverId", { questionId, solverId });
  };

  useEffect(() => {
    socketRef.current = io.connect(`${apiUrl}`);

    socketRef.current.on("questionUpdated", (updatedQuestion: Question) => {
      dispatch(getQueue());
    });
  }, [dispatch]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${firstName} ${lastName} (${classNo})`}</Card.Title>

        <Card.Text>{title}</Card.Text>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <GoToQuestionButton
            questionId={question.id}
            boardId={question.questionBoardId}
          />
          {solver ? (
            <Button
              disabled={solver.id !== userId}
              variant="warning"
              onClick={() => helpClickHandler(id, null)}
            >{`${solver.firstName} to the rescue`}</Button>
          ) : (
            <Button onClick={() => helpClickHandler(id, userId)}>Help</Button>
          )}

          <UpVotes upVotes={upVotes} messageId={id} />

          <Button
            disabled={!(userId === author.id || isUserATeacher)}
            variant="success"
            onClick={() => handleResolvedClick(id)}
          >
            {<CheckCircleOutlineOutlinedIcon />}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function Queue() {
  const queue: QuestionWithAuthorAndSolver[] = useSelector(selectQueue);
  //@ts-ignore
  const sortedQueue: QuestionWithAuthorAndSolver[] = sortQuestionArrayById(
    queue
  );
  const showSidebar = useSelector(selectShowSidebar);

  if (!showSidebar) {
    return <ToggleSidebarButton text={"< Show question queue"} />;
  }
  return (
    <div className="sidebar">
      <ToggleSidebarButton text={">"} />
      {sortedQueue.map((question) => (
        <PendingQuestion
          question={question}
          //authorInfo={question.author}
          key={question.id}
        />
      ))}
    </div>
  );
}
