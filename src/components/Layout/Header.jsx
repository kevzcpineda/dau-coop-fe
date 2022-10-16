import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href='#home'>
          <img src='/logo.svg' width='30' height='30' className='d-inline-block align-top' alt='React Bootstrap logo' />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* {user && (
            <Navbar.Text>
              Signed in as: <a href="#login">kenneth</a>
            </Navbar.Text>
          )} */}
          {user && (
            <Navbar.Text onClick={logoutUser}>
              Logout
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
