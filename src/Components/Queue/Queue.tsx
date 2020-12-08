import React from "react";
import { selectQueue } from "../../store/questions/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { selectShowSidebar } from "../../store/appState/selectors";
import { Button, Card } from "react-bootstrap";
import { toggleSidebar } from "../../store/appState/actions";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import UpVotes from "../UpVotes/UpVotes";
import GoToQuestionButton from "../GoToQuestionButton.tsx/GoToQuestionButton";

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
  question: Question;
  authorInfo: User;
}
function PendingQuestion({ question, authorInfo }: PropsQuestion) {
  const {
    id,
    title,
    //authorId,
    upVotes,
  } = question;
  const { firstName, lastName, classNo } = authorInfo;
  //const dispatch = useDispatch();
  const handleResolvedClick = (questionId: number) => {
    // dispatch(updateQuestion())
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${firstName} ${lastName} (${classNo})`}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text>{title}</Card.Text>

        <GoToQuestionButton />
        <Button>Help</Button>

        <UpVotes upVotes={upVotes} messageId={id} />

        <Button variant="success" onClick={() => handleResolvedClick(id)}>
          {<CheckCircleOutlineOutlinedIcon />}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default function Queue() {
  const queue = useSelector(selectQueue);
  const sortedQueue = queue.sort((a, b) => a.createdAt - b.createdAt);
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
          authorInfo={question.author}
          key={question.id}
        />
      ))}
    </div>
  );
}
