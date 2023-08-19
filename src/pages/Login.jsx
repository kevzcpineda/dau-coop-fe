import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
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
import { useMutation } from 'react-query';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Image } from '@chakra-ui/react';
import logo from '../assets/logo.png';
const Login = () => {
  const navigate = useNavigate();
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { getUser, user, deleteUser } = useUser((state) => state);
  const { setAccessToken, setRefreshToken, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post(`${baseURL}/token/`, payload);
      return response;
    },
    onSuccess: (data) => {
      console.log('dataasdasd', data);
      setAccessToken(data.data.access);
      setRefreshToken(data.data.refresh);
      setUser(jwt_decode(data.data.access));
      localStorage.setItem('accessToken', JSON.stringify(data.data.access));
      localStorage.setItem('refreshToken', JSON.stringify(data.data.refresh));
      const { is_superuser, is_change_password, user_id, exp } = jwt_decode(
        data.data.access
      );
      localStorage.setItem('tokenExp', JSON.stringify(exp));
      if (!is_superuser) {
        if (is_change_password) {
          navigate('/');
        } else {
          navigate('/change-password');
        }
      } else {
        return navigate('/dashboard');
      }
    },
    onError: (error) => {
      toast.error(`Error ${error} `);
    },
  });
  const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const handleLogin = () => {
    const loginValidate = loginSchema.safeParse({
      username: username,
      password: password,
    });
    if (!loginValidate.success) {
      loginValidate.error.issues.map((item) => {
        toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      console.log('murare');
      mutate(loginValidate.data);
    }
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
      }}>
      <Toaster position='top-right' reverseOrder={false} />
      <Stack spacing='8'>
        <Stack spacing='6'>
          {/* <Logo /> */}
          <Center>
            <Image src={logo} alt='logo' boxSize='100px' align='center' />
          </Center>
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
          }}>
          <Stack as='form' spacing='6'>
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
              {isLoading ? (
                <Button
                  isLoading
                  colorScheme='blue'
                  variant='solid'
                  loadingText='Submitting'>
                  Sign in
                </Button>
              ) : (
                <Button
                  colorScheme='blue'
                  variant='solid'
                  onClick={() => handleLogin()}>
                  Sign in
                </Button>
              )}
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
