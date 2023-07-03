import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Logo } from '../components/Login/Logo';
import { PasswordField } from '../components/Login/PasswordField';
import AuthContext from '../context/AuthContext';
import { useUser } from '../states/User';
const Login = () => {
  const { getUser, user, deleteUser } = useUser((state) => state);
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };
  //className='vh-100 gray-900'
  return (
    <Container
      maxW='lg'
      py={{
        base: '12',
        md: '24',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Logo />
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={useBreakpointValue({
            base: 'transparent',
            sm: 'bg-surface',
          })}
          boxShadow={{
            base: 'none',
            sm: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack as='form' onSubmit={handleLogin} spacing='6'>
            <Stack spacing='5'>
              <FormControl>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  id='username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <PasswordField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
            <Stack spacing='6'>
              <Button type='submit' colorScheme='blue' variant='solid'>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
    // <Layout className="container-height">
    //   <Row className='h-100 justify-content-center align-items-center'>
    //     <Col xs={6}>
    //       <Card className='w-100'>
    //         {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
    //         <Card.Body>
    //           <Form onSubmit={handleLogin}>
    //             <Form.Group className='mb-3' controlId='formBasicUsername'>
    //               <Form.Label>Username</Form.Label>
    //               <Form.Control type='text' name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username' />
    //             </Form.Group>

    //             <Form.Group className='mb-3' controlId='formBasicPassword'>
    //               <Form.Label>Password</Form.Label>
    //               <Form.Control type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
    //             </Form.Group>
    //             <Button variant='primary' type='submit'>
    //               Submit
    //             </Button>
    //           </Form>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Layout>
  );
};

export default Login;
