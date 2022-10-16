import React, { useState, useContext } from 'react';
import Layout from '../components/Layout/Index';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const {loginUser} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(username, password)
  }
  //className='vh-100 gray-900'
  return (
      <Layout className="container-height">
        <Row className='h-100 justify-content-center align-items-center'>
          <Col xs={6}>
            <Card className='w-100'>
              {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Form.Group className='mb-3' controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username' />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                  </Form.Group>
                  <Button variant='primary' type='submit'>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Layout>
  );
};

export default Login;
