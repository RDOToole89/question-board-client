import React from "react";
import { useDispatch } from "react-redux";
import { incrementUpvote } from "../../store/boards/actions";

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
    <div className="UpVotes">
      <div>
        <i onClick={increment} className="las la-thumbs-up">
          {upVotes}
        </i>
      </div>
    </div>
  );
}

export default UpVotes;
