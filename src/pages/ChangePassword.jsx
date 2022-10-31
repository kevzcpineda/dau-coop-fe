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
} from '@chakra-ui/react'
import { Logo } from '../components/Login/Logo'
import AuthContext from '../context/AuthContext';

const ChangePassword = () => {
  const {changePassword} = useContext(AuthContext);

  const [showPassword, setShowPassword] = React.useState(false)
  const passwordHandleClick  = () => setShowPassword(!showPassword)

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const confirmPasswordHandleClick  = () => setShowConfirmPassword(!showConfirmPassword)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        changePassword(password)
    } else {
        alert('Password and Confirm password must be match')
    }
  }
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
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter New Password'
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={passwordHandleClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Enter Confirm Password'
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={confirmPasswordHandleClick}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Stack spacing='6'>
              <Button type='submit' colorScheme='blue' variant='solid'>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ChangePassword;