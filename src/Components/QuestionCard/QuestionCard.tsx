import React from "react";
import { Button, Card } from "react-bootstrap";
import TagBox from "../TagBox/TagBox";

interface cardProps {
  title: string;
  body: string;
  resolved: boolean;
  upVotes: number;
}

function QuestionCard(props: cardProps) {
  const { title, body, resolved, upVotes } = props;

  return (
    <Card className="mb-4" style={{ width: "28rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2">Roibin O'Toole</Card.Subtitle>
        <Card.Text className="mb-4">{`${body.slice(0, 100)}...`}</Card.Text>
        <TagBox />
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
