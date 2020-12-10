import React, { FunctionComponent } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

import './QuestionDetails.css';

interface editModeProps {
  questionId: number;
  editQuestion: { title: string; body: string };
  setEditQuestion: Function;
}

function EditMode(props: editModeProps) {
  const { editQuestion, setEditQuestion } = props;

  return (
    <div className='edit-mode'>
      <h5>Edit question details...</h5>
      <InputGroup className='mb-1'>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className='las la-map-marker-alt'></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={(e) => setEditQuestion({ ...editQuestion, title: e.target.value })}
          defaultValue={editQuestion.title}
          aria-label='rate'
        />
      </InputGroup>

      <InputGroup>
        <FormControl
          onChange={(e) => setEditQuestion({ ...editQuestion, body: e.target.value })}
          defaultValue={editQuestion.body}
          as='textarea'
          aria-label='description'
          rows={6}
        />
      </InputGroup>
    </div>
  );
}

export default EditMode;
