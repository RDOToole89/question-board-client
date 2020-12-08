import React from "react";
import { selectQueue } from "../../store/questions/selectors";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { selectShowSidebar } from "../../store/appState/selectors";
import { Button, Card } from "react-bootstrap";
import { toggleSidebar } from "../../store/appState/actions";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

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
  const { title, authorId, upVotes } = question;
  const { id, firstName, lastName, classNo } = authorInfo;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${firstName} ${lastName} (${classNo})`}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        <Card.Text>{title}</Card.Text>
        <Card.Link href="#">see question</Card.Link>
        <Button>Help</Button>
        <Button>
          {" "}
          <ArrowDropUpOutlinedIcon /> {`(${upVotes})`}
        </Button>
        <Button> {<CheckCircleOutlineOutlinedIcon />}</Button>
      </Card.Body>
    </Card>
  );
}

export default function Queue() {
  const queue = useSelector(selectQueue);
  const dispatch = useDispatch();
  const showSidebar = useSelector(selectShowSidebar);

  if (!showSidebar) {
    return <ToggleSidebarButton text={"< Show question queue"} />;
  }
  return (
    <div className="sidebar">
      <ToggleSidebarButton text={">"} />
      {queue.map((question) => (
        <PendingQuestion
          question={question}
          authorInfo={question.author}
          key={question.id}
        />
      ))}
    </div>
  );
}
