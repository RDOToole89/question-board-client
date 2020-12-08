import React from "react";
import { Button, Card } from "react-bootstrap";
import TagBox from "../TagBox/TagBox";
import UpVotes from "../UpVotes/UpVotes";

interface cardProps {
  title: string;
  body: string;
  resolved: boolean;
  upVotes: number;
  tags: [];
}

function QuestionCard(props: cardProps) {
  const { title, body, resolved, upVotes, tags } = props;

  return (
    <Card className="mb-4" style={{ width: "30rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title style={resolved ? { background: "green" } : { background: "red" }}>
          {title}
        </Card.Title>
        <Card.Subtitle className="mb-2">Roibin O'Toole</Card.Subtitle>
        <Card.Text className="mb-4">{`${body.slice(0, 100)}...`}</Card.Text>
        <TagBox tags={tags} />
        <UpVotes upVotes={upVotes} />
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
