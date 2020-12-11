import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { LoggedInLinks, LogOutButton } from './LoggedInItems';
import LoggedOutItems from './LoggedOutItems';
import './Navbar.css';

export default function AppNavbar() {
  const token = useSelector(selectToken);

  const history = useHistory();
  return (
    <div>
      <Navbar className='Nav' bg='light' expand='lg'>
        <Navbar.Brand onClick={() => history.push('/')}>
          <img
            style={{ width: '200px' }}
            src='https://d33wubrfki0l68.cloudfront.net/b812d66a8b265bece81f104ecc1396180c332522/cc883/assets/icons/logo.svg'
          />
          &nbsp;&nbsp;Question Board
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
            {token ? <LoggedInLinks /> : ''}
          </Nav>
          {token ? <LogOutButton /> : <LoggedOutItems />}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
