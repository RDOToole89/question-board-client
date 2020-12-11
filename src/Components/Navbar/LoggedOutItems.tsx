import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function LoggedOutItems() {
  const history = useHistory();
  const loginClickHandler = () => {
    history.push('/login');
  };
  const signUpClickHandler = () => {
    history.push('/signup');
  };

  return (
    <div>
      <Button
        className='log-btn'
        style={{ marginRight: '1em' }}
        onClick={() => loginClickHandler()}
      >
        LogIn
      </Button>
      <Button
        className='log-btn'
        style={{ marginRight: '1em' }}
        onClick={() => signUpClickHandler()}
      >
        Sign Up
      </Button>
    </div>
  );
}
