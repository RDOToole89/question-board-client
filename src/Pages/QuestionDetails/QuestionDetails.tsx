import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UpVotes from '../../Components/UpVotes/UpVotes';
import { getQuestion } from '../../store/questions/actions';
import { selectQuestion } from '../../store/questions/selectors';
import './QuestionDetails.css';

interface Params {
	id: string;
}

function QuestionDetails() {
	const [ screenshotActive, setScreenshotActive ] = useState(false);
	const params: Params = useParams();
	const questionId = parseInt(params.id);
	const dispatch = useDispatch();
	const question = useSelector(selectQuestion);

	console.log('WHAT IS IN QUESTION', question);

	useEffect(
		() => {
			dispatch(getQuestion(questionId));
		},
		[ dispatch ]
	);

	return (
		<div className="QuestionDetails">
			<div className="question-wrapper">
				<div className="question-content">
					<h2>{question.title}</h2>
					<h4>{`${question.author.firstName} ${question.author.lastName} (${question
						.author.classNo})`}</h4>
					<p className="question-body">{question.body}</p>
					<UpVotes upVotes={question.upVotes} messageId={question.id} />
				</div>
				<div className="question-screenshot">
					<img src={question.screenshotURL} />
				</div>
			</div>
		</div>
	);
}

export default QuestionDetails;
