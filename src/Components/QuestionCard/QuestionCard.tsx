import React, { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import TagBox from "../TagBox/TagBox";
import UpVotes from "../UpVotes/UpVotes";
import "./QuestionCard.css";
import moment from "moment";

interface cardProps {
  title: string;
  body: string;
  resolved: boolean;
  upVotes: number;
  messageId: number;
  tags: [];
  createdAt: string;
  author: { firstName: string; lastName: string; classNo: number };
}

function QuestionCard(props: cardProps) {
  const { title, body, resolved, upVotes, tags, author, messageId, createdAt } = props;

  const [openMessages, setOpenMessages] = useState([]);

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
              <Card.Text className="mb-2">{`${body.slice(0, 100)}...`}</Card.Text>
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
            <i className="QuestionCard-icon text-success las la-check-circle la-2x"></i>
          </div>
        ) : (
          <div className="QuestionCard-pending">
            Status: pending
            <i className="QuestionCard-icon text-danger las la-times-circle la-2x"></i>
          </div>
        )}
        <Card.Text>{`${moment(createdAt).calendar()} - ${moment(createdAt)
          .startOf("hour")
          .fromNow()}  `}</Card.Text>
        <UpVotes messageId={messageId} upVotes={upVotes} />
        <Button variant="primary">Go to question</Button>
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
