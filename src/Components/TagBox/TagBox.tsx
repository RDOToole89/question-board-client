import React from "react";
import { Badge } from "react-bootstrap";

function TagBox() {
  const tags = [
    { id: 1, tagName: "TAGTEST!" },
    { id: 1, tagName: "TAGTEST!" },
    { id: 1, tagName: "TAGTEST!" },
  ];

  return (
    <div className="tagbox mb-2">
      {tags.map((x) => (
        <Badge key={x.id} variant="success" className="m-1 tag">
          {x.tagName}
        </Badge>
      ))}
    </div>
  );
}

export default TagBox;
