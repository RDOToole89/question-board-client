import React from "react";
import { Button, Card } from "react-bootstrap";

interface cardProps {
  title: string;
  body: string;
  resolved: boolean;
  upVotes: number;
}

function QuestionCard(props: cardProps) {
  const { title, body, resolved, upVotes } = props;

  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
