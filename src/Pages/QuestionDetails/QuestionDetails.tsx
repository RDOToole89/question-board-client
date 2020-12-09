import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TagBox from '../../Components/TagBox/TagBox';
import UpVotes from '../../Components/UpVotes/UpVotes';
import { getQuestion } from '../../store/questions/actions';
import { selectQuestion } from '../../store/questions/selectors';
import moment from 'moment';
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

	const { tags, resolved, createdAt } = question;

	useEffect(
		() => {
			dispatch(getQuestion(questionId));
		},
		[ dispatch ]
	);

	const openScreenshot = () => {
		setScreenshotActive(!screenshotActive);
	};

	return (
		<div className="QuestionDetails">
			<div className="question-wrapper">
				<div className="question-content">
					<h2>{question.title}</h2>
					<h4>{`${question.author.firstName} ${question.author.lastName} (${question
						.author.classNo})`}</h4>
					<p className="question-body">{question.body}</p>
					<p>{`${moment(createdAt).calendar()} - ${moment(createdAt)
						.startOf('hour')
						.fromNow()}  `}</p>
					<TagBox tags={tags} />
					{resolved ? (
						<div className="QuestionCard-pending">
							Status: resolved
							<i className="QuestionCard-icon text-success las la-check-circle la-2x" />
						</div>
					) : (
						<div className="QuestionCard-pending">
							Status: pending
							<i className="QuestionCard-icon text-danger las la-times-circle la-2x" />
						</div>
					)}
					<div onClick={openScreenshot} className="screenshot">
						<i className="las la-image" /> Screenshot
					</div>
					<UpVotes upVotes={question.upVotes} messageId={question.id} />
				</div>
				{screenshotActive && (
					<div className="question-screenshot">
						<img src={question.screenshotURL} />
					</div>
				)}
			</div>
		</div>
	);
}

export default QuestionDetails;
