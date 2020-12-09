import React from "react";
import { useDispatch } from "react-redux";
import { incrementUpvote } from "../../store/boards/actions";
import "./UpVotes.css";

interface UpVoteProps {
  upVotes: number;
  messageId: number;
}

function UpVotes(props: UpVoteProps) {
  const dispatch = useDispatch();
  const { upVotes, messageId } = props;

  const increment = () => {
    dispatch(incrementUpvote(messageId));
  };

  return (
    <div className="UpVotes mb-3">
        <i onClick={increment} className="upvote-icon las la-thumbs-up">
          {upVotes}
        </i>
    </div>
  );
}

export default UpVotes;
