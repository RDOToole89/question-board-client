import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementCommentUpvote } from '../../store/boards/actions';

import './UpVotes.css';

interface UpVoteProps {
  upVotes: number;
  commentId: number;
  questionId: number;
}

function UpVotesComments(props: UpVoteProps) {
  const dispatch = useDispatch();
  const { upVotes, commentId, questionId } = props;

  const increment = () => {
    dispatch(incrementCommentUpvote(questionId, commentId));
  };

  return (
    <div className='UpVotes mb-3'>
      <i onClick={increment} className='upvote-icon las la-thumbs-up'>
        {upVotes}
      </i>
    </div>
  );
}

export default UpVotesComments;
