import React, { useEffect, useState } from 'react';
import { Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewBoard, fetchAllBoards } from '../../store/boards/actions';
import { selectAllBoards } from '../../store/boards/selectors';
import './Homepage.css';

export default function Homepage() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  const [newQuestionBoard, setNewQuestionBoard] = useState<QuestionBoard>({
    id: 0,
    name: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch]);

  const handleCreateBoard = (e: any) => {
    e.preventDefault();
    dispatch(createNewBoard({ ...newQuestionBoard }));
  };

  return (
    <div className='Homepage'>
      <h1 className='header'>Question Boards</h1>
      <div className='Homepage-container'>
        <div className='questionBoard-wrapper'>
          {boards.map((board: QuestionBoard) => {
            return (
              <Card
                className={board.id % 2 ? 'card-blue mb-4' : 'card-red mb-4'}
                key={board.id}
                style={{ width: '16rem' }}
              >
                <Card.Body>
                  <Card.Title className='card-title'>{board.name}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                  <Card.Text className='card-text'>{board.description}</Card.Text>
                  <Link to={`/boards/${board.id}/`}>
                    <Button className={board.id % 2 ? 'button-blue' : 'button-red'}>
                      Go to board
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </div>

        <div className='questionBoard-create-wrapper'>
          <h2 className='header-medium'>Create a new board</h2>
          <Form className='questionBoard-form'>
            <InputGroup className='mb-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className='las la-user-cog'></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className='questionBoard-form-input'
                onChange={(e) => setNewQuestionBoard({ ...newQuestionBoard, name: e.target.value })}
                aria-label='board name'
                placeholder='new board name...'
              />
            </InputGroup>
            <InputGroup>
              <FormControl
                className='questionBoard-form-input mb-3'
                onChange={(e) =>
                  setNewQuestionBoard({ ...newQuestionBoard, description: e.target.value })
                }
                as='textarea'
                aria-label='description'
                placeholder='write a short description...'
                rows={4}
              />
            </InputGroup>
            <Button className='log-btn' variant='danger' onClick={handleCreateBoard}>
              Create Board
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
