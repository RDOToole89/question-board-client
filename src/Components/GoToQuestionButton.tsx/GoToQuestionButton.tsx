import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ButtonProps {
	questionId: number;
	boardId: number;
}

export default function GoToQuestionButton(props: ButtonProps) {
	const { questionId, boardId } = props;

	return (
		<Link to={`/boards/${boardId}/questions/${questionId}`}>
			<Button variant="primary">Go to question</Button>
		</Link>
	);
}
