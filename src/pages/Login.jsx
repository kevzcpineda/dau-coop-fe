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
    <>
      <Layout>
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
    </>
    // <div className='container bg-secondary'>
    //   <div className='card p-3' style={{ width: '35rem' }}>
    //     <form>
    //       {/* <!-- Email input --> */}
    //       <div className='form-outline mb-4'>
    //         <label className='form-label' htmlFor='form2Example1'>
    //           Email address
    //         </label>
    //         <input type='email' id='form2Example1' className='form-control' />
    //       </div>

    //       {/* <!-- Password input --> */}
    //       <div className='form-outline mb-4'>
    //         <label className='form-label' htmlFor='form2Example2'>
    //           Password
    //         </label>
    //         <input type='password' id='form2Example2' className='form-control' />
    //       </div>

    //       {/* <!-- 2 column grid layout for inline styling --> */}
    //       {/* <div className='row mb-4'>
    //       <div className='col d-flex justify-content-center'>
    //         <div className='form-check'>
    //           <input className='form-check-input' type='checkbox' value='' id='form2Example31' checked />
    //           <label className='form-check-label' htmlFor='form2Example31'>
    //             Remember me
    //           </label>
    //         </div>
    //       </div>
    //     </div> */}

    //       {/* <!-- Submit button --> */}
    //       <button type='button' className='btn btn-primary btn-block mb-4'>
    //         Sign in
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Login;
