import React, { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import TagBox from "../TagBox/TagBox";
import UpVotes from "../UpVotes/UpVotes";
import "./QuestionCard.css";
import moment from "moment";
import GoToQuestionButton from "../GoToQuestionButton.tsx/GoToQuestionButton";
import ScreenshotModal from "../ScreenshotModal/ScreenshotModal";

interface cardProps {
  title: string;
  body: string;
  resolved: boolean;
  upVotes: number;
  messageId: number;
  tags: [];
  createdAt: string;
  author: { firstName: string; lastName: string; classNo: number };
  boardId: number;
  screenshotURL?: string;
}

function QuestionCard(props: cardProps) {
  const {
    title,
    body,
    resolved,
    upVotes,
    tags,
    author,
    messageId,
    createdAt,
    boardId,
    screenshotURL,
  } = props;
  const [openMessages, setOpenMessages] = useState([]);
  //const [ screenshotActive, setScreenshotActive ] = useState(false);

  const openMessageToggle = (messageId: number) => {
    // @ts-ignore
    if (openMessages.includes(messageId)) {
      // @ts-ignore
      const updatedMessages = openMessages.filter((x) => x.id === messageId);
      setOpenMessages([...updatedMessages]);
    } else {
      // @ts-ignore
      setOpenMessages([...openMessages, messageId]);
    }
  };

  return (
    <Card className="mb-4 mr-4" style={{ width: "30rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2">{`${author.firstName} ${author.lastName} (${author.classNo})`}</Card.Subtitle>

        {
          // @ts-ignore
          !openMessages.includes(messageId) ? (
            <div>
              <Card.Text className="mb-2">{`${body.slice(
                0,
                100
              )}...`}</Card.Text>
              <Badge
                variant="light"
                className="mt-0"
                style={{ cursor: "pointer" }}
                onClick={() => openMessageToggle(messageId)}
              >
                Read more...
              </Badge>
            </div>
          ) : (
            <div>
              <Card.Text className="mb-2">{body}</Card.Text>
              <Badge
                variant="light"
                className="mt-0"
                style={{ cursor: "pointer" }}
                onClick={() => openMessageToggle(messageId)}
              >
                Close
              </Badge>
            </div>
          )
        }

        <TagBox tags={tags} />
        {resolved ? (
          <div className="QuestionCard-pending">
            Status: resolved
            <i className="QuestionCard-icon text-success las la-check-circle la-2x" />
          </div>
        ) : (
          <div className="QuestionCard-pending">
            Status: pending
            <i className="QuestionCard-icon text-danger las la-times-circle la-2x" />
          </div>
        )}
        <Card.Text>{`${moment(createdAt).calendar()} - ${moment(createdAt)
          .startOf("hour")
          .fromNow()}  `}</Card.Text>
        <ScreenshotModal screenshotURL={screenshotURL} />
        <UpVotes messageId={messageId} upVotes={upVotes} />
        <GoToQuestionButton questionId={messageId} boardId={boardId} />
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
