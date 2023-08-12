import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  InputGroup,
  Input,
  InputRightElement,
  useBreakpointValue,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Logo } from '../components/Login/Logo';
import AuthContext from '../context/AuthContext';
import { useMutation } from 'react-query';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { changePassword, accessToken } = useContext(AuthContext);

  const [showPassword, setShowPassword] = React.useState(false);
  const passwordHandleClick = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const confirmPasswordHandleClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isErrorUsername, SetIsErrorUsername] = useState({
    isError: false,
    message: 'Username is required',
  });
  const [isErrorPassword, setisErrorPassword] = useState({
    isError: false,
    message: 'Password is required',
  });
  const [isErrorConfirmPassword, setisErrorConfirmPassword] = useState({
    isError: false,
    message: 'Confirm Password is required',
  });
  const [isErrorPasswordNotMatch, setisErrorPasswordNotMatch] = useState({
    isError: false,
    message: 'Password Not Match',
  });

  // const isErrorUsername = username === null;
  // const isErrorPassword = password === '';
  // const isErrorConfirmPassword = confirmPassword === '';
  // const isErrorPasswordNotMatch = confirmPassword === password;

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => {
      console.log('accessToken', accessToken);
      const headers = { Authorization: `Bearer ${accessToken}` };
      return axios.put(`${baseURL}/change-password/`, payload, {
        headers: headers,
      });
    },
    onSuccess: (data, variables, context) => {
      toast.success('Successfully Change Password and username');
      navigate('/');
    },
    onError: (error, variables, context) => {
      if (error.response.data.detail) {
        toast.error(`Error ${error.response.data.detail} `);
      }
      if (error.response.data.detail) {
        toast.error(`Error ${error.response.data.message} `);
      }
    },
  });

  const changePasswordSchema = z.object({
    username: z.string(),
    confirmPassword: z.string(),
    password: z.string(),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const changePasswordValidate = changePasswordSchema.safeParse({
      username: username,
      confirmPassword: confirmPassword,
      password: password,
    });
    console.log(changePasswordValidate);
    if (!changePasswordValidate.success) {
      changePasswordValidate.error.issues.map((item) => {
        if (item.path[0] === 'username') {
          SetIsErrorUsername({ isError: true });
        } else {
          SetIsErrorUsername({ isError: false });
        }
        if (item.path[0] === 'confirmPassword') {
          setisErrorConfirmPassword({ isError: true });
        } else {
          setisErrorConfirmPassword({ isError: false });
        }
        if (item.path[0] === 'password') {
          setisErrorPassword({ isError: true });
        } else {
          setisErrorPassword({ isError: false });
        }
        // toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      if (
        changePasswordValidate.data.password !==
        changePasswordValidate.data.confirmPassword
      ) {
        setisErrorPasswordNotMatch({ isError: true });
        // toast.error(`Password and Confirm password must be match`);
      } else {
        mutate(changePasswordValidate.data);
      }
    }
    // if (password === confirmPassword) {
    //   changePassword({ password: password, username: username });
    // } else {
    //   alert('Password and Confirm password must be match');
    // }
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
          }}>
          <Stack as='form' onSubmit={handleLogin} spacing='6'>
            <Stack spacing='5'>
              <InputGroup size='md'>
                <FormControl isInvalid={isErrorUsername.isError}>
                  <Input
                    pr='4.5rem'
                    placeholder='Enter New Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {isErrorUsername.isError && (
                    <FormErrorMessage>Username Is Required</FormErrorMessage>
                  )}
                </FormControl>
              </InputGroup>
              <InputGroup size='md'>
                <FormControl isInvalid={isErrorPassword.isError}>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={passwordHandleClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                  {isErrorPassword.isError && (
                    <FormErrorMessage>Password Is Required</FormErrorMessage>
                  )}
                </FormControl>
              </InputGroup>

              <InputGroup size='md'>
                <FormControl isInvalid={isErrorConfirmPassword.isError}>
                  <Input
                    pr='4.5rem'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Enter Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button
                      h='1.75rem'
                      size='sm'
                      onClick={confirmPasswordHandleClick}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                  {isErrorConfirmPassword.isError && (
                    <FormErrorMessage>
                      Confirm Password Is Required
                    </FormErrorMessage>
                  )}
                </FormControl>
              </InputGroup>
            </Stack>
            <Stack spacing='6'>
              {isLoading ? (
                <Button
                  isLoading
                  loadingText='Submitting'
                  colorScheme='blue'
                  variant='outline'>
                  Submit
                </Button>
              ) : (
                <Button type='submit' colorScheme='blue' variant='solid'>
                  Submit
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ChangePassword;
