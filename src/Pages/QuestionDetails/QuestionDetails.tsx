import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import TagBox from '../../Components/TagBox/TagBox';
import UpVotes from '../../Components/UpVotes/UpVotes';
import { getQuestion, saveComment } from '../../store/questions/actions';
import { selectQuestion, selectSortedComments } from '../../store/questions/selectors';
import moment from 'moment';
import './QuestionDetails.css';
import io from 'socket.io-client';
import { apiUrl } from '../../config/constants';
import { Button, Col, Form, FormControl, InputGroup } from 'react-bootstrap';
import { selectToken, selectUser } from '../../store/user/selectors';
import UpVotesComments from '../../Components/UpVotesComments/UpVotesComments';

interface Params {
  id: string;
}

interface Author {
  firstName: string;
  lastName: string;
}

interface Comment {
  id: number;
  questionId: number;
  body: string;
  authorId: number;
  upVotes: number;
  isSolution: boolean | null;
  author: Author;
  createdAt?: string | null | number | {};
}

function QuestionDetails() {
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const params: Params = useParams();
  const questionId = parseInt(params.id);
  const comments = useSelector(selectSortedComments);
  const dispatch = useDispatch();
  const question = useSelector(selectQuestion);
  const [screenshotActive, setScreenshotActive] = useState(false);
  const [socketId, setSocketId] = useState(0);
  // @ts-ignore
  const [comment, setComment] = useState<Comment>({
    questionId: 0,
    body: '',
    authorId: user.id,
    upVotes: 0,
    isSolution: null,
    author: { firstName: '', lastName: '' },
    createdAt: moment(new Date()).format('YYYY-MM-DD, h:mm:ss a'),
  });

  console.log('COMMENT', comment);

  console.log(comments);

  const { tags, resolved, createdAt } = question;

  type SocketRef = { current: any };
  const socketRef: SocketRef = useRef();

  useEffect(() => {
    if (!token) {
      history.push('/');
    }

    dispatch(getQuestion(questionId));

    socketRef.current = io.connect(`${apiUrl}`);

    socketRef.current.on('socketId', (id: number) => {
      setSocketId(id);
    });

    socketRef.current.on('comment', (commentBody: Comment) => {
      console.log(commentBody);

      dispatch(saveComment(commentBody));
    });
  }, [dispatch]);

  const sendComment = (comment: Comment) => (e: any) => {
    if (e.keyCode === 13 || e.type === 'click') {
      // @ts-ignore
      socketRef.current.emit('comment', {
        questionId: questionId,
        body: comment.body,
        authorId: user.id,
        upVotes: 0,
        isSolution: null,
        author: { firstName: user.firstName, lastName: user.lastName },
        createdAt: moment(new Date()).format('YYYY-MM-DD, h:mm:ss a'),
      });
      // @ts-ignore
      setComment({
        questionId: questionId,
        body: '',
        authorId: user.id,
        upVotes: 0,
        isSolution: null,
        author: { firstName: '', lastName: '' },
        createdAt: moment(new Date()).format('YYYY-MM-DD, h:mm:ss a'),
      });
    }
  };

  const openScreenshot = () => {
    setScreenshotActive(!screenshotActive);
  };

  return (
    <div>
      <div className='QuestionDetails'>
        <div className='question-wrapper'>
          <div className='question-content'>
            <h2>{question.title}</h2>
            <h4>{`${question.author.firstName} ${question.author.lastName} (${question.author.classNo})`}</h4>
            <p className='question-body'>{question.body}</p>
            <p>{`${moment(createdAt).calendar()} - ${moment(createdAt)
              .startOf('hour')
              .fromNow()}  `}</p>
            <TagBox tags={tags} />
            {resolved ? (
              <div className='QuestionCard-pending'>
                Status: resolved
                <i className='QuestionCard-icon text-success las la-check-circle la-2x' />
              </div>
            ) : (
              <div className='QuestionCard-pending'>
                Status: pending
                <i className='QuestionCard-icon text-danger las la-times-circle la-2x' />
              </div>
            )}
            <div onClick={openScreenshot} className='screenshot'>
              <i className='las la-image' /> Screenshot
            </div>
            <UpVotes upVotes={question.upVotes} messageId={question.id} />
          </div>
          {screenshotActive && (
            <div className='question-screenshot'>
              <img src={question.screenshotURL} />
            </div>
          )}
        </div>
      </div>
      <div className='comment-section'>
        <InputGroup className='mb-3 mt-2'>
          <FormControl
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
            onKeyPress={sendComment(comment)}
            placeholder='write a reply...'
            value={comment.body}
            aria-label='add tag'
            aria-describedby='basic-addon'
          />
          <InputGroup.Append>
            <Button onClick={sendComment(comment)} variant='outline-secondary'>
              <i className='las la-check'></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <div className='comments'>
          {comments.map((x: Comment, i: number) => {
            return (
              <div key={i} className='comment'>
                <h5>{`${x.author.firstName} ${x.author.lastName}`}</h5>
                <p className='timestamp'>{`${moment(createdAt).calendar()} - ${moment(createdAt)
                  .startOf('hour')
                  .fromNow()}  `}</p>
                <p>{x.body}</p>
                <UpVotesComments questionId={questionId} upVotes={x.upVotes} commentId={x.id} />
                <hr></hr>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetails;
