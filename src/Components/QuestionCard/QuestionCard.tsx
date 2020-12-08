import React from "react";
import { Button, Card } from "react-bootstrap";
import TagBox from "../TagBox/TagBox";
import UpVotes from "../UpVotes/UpVotes";
import "./QuestionCard.css";

interface cardProps {
  title: string;
  body: string;
  resolved: boolean;
  upVotes: number;
  tags: [];
  author: { firstName: string; lastName: string };
}

function QuestionCard(props: cardProps) {
  const { title, body, resolved, upVotes, tags, author } = props;

  return (
    <Card className="mb-4" style={{ width: "30rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2">{`Author: ${author.firstName} ${author.lastName}`}</Card.Subtitle>
        <Card.Text className="mb-4">{`${body.slice(0, 100)}...`}</Card.Text>
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
        <UpVotes upVotes={upVotes} />
        <Button variant="primary">Go to question</Button>
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
