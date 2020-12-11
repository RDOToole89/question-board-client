import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { selectToken } from '../../store/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { signUp } from '../../store/user/actions';
import './SignUp.css';

export default function Login() {
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    classNo: 0,
    isTeacher: false,
  });
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push('/');
    }
  }, [token, history]);

  function submitForm(event: any) {
    event.preventDefault();

    dispatch(signUp(newUser));
  }

  return (
    <Container className='signup'>
      <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
        <h1 className='mt-5 mb-5'>Sign up</h1>
        <Form.Group controlId='formBasicFirstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={newUser.firstName}
            onChange={(event) => setNewUser({ ...newUser, firstName: event.target.value })}
            placeholder={'Enter your first name'}
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicFirstName'>
          <Form.Label>{'Last name'}</Form.Label>
          <Form.Control
            value={newUser.lastName}
            onChange={(event) => setNewUser({ ...newUser, lastName: event.target.value })}
            placeholder={'Enter your last name'}
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={newUser.email}
            onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
            type='email'
            placeholder={'Enter your email address'}
            required
          />
        </Form.Group>

        <Form.Group controlId='formBasicFirstName'>
          <Form.Label>Class number</Form.Label>
          <Form.Control
            value={newUser.classNo || ''}
            onChange={(event) => setNewUser({ ...newUser, classNo: parseInt(event.target.value) })}
            placeholder={'Enter your classNo'}
            required
          />
        </Form.Group>

        <Form.Group controlId='formBasicLanguage'>
          <Form.Label>Are you a teacher</Form.Label>
          <Form.Control
            as='select'
            value={newUser.classNo}
            onChange={(event) =>
              setNewUser({
                ...newUser,
                isTeacher: event.target.value === 'true',
              })
            }
            required
          >
            <option value='false'>No</option>
            <option value='true'>yes</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={newUser.password}
            onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
            type='password'
            placeholder={'Enter a password'}
            required
          />
        </Form.Group>
        <Form.Group className='mt-5'>
          <Button variant='primary' type='submit' onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
