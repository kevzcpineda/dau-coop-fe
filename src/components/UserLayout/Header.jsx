import React, { useContext } from 'react';
import { Box, Button, ButtonGroup, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext);
  return (
    <Box as='header' bgColor='blue.500' py={2}>
      <Container maxW='container.xl'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='md'>COOP</Heading>
            </Box>
            <Spacer />
              {user && (
                  <Button colorScheme='red' onClick={logoutUser}>Logout</Button>
              )}
        </Flex>
      </Container>
      </Box>
    // <Navbar bg="dark" variant="dark">
    //   <Container fluid>
    //     <Navbar.Brand href='#home'>
    //       <img src='/logo.svg' width='30' height='30' className='d-inline-block align-top' alt='React Bootstrap logo' />
    //     </Navbar.Brand>
    //     <Navbar.Toggle />
    //     <Navbar.Collapse className="justify-content-end">
    //       {user && (
    //         <Navbar.Text>
    //           Signed in as: <a href="#login">kenneth</a>
    //         </Navbar.Text>
    //       )}
    //       {user && (
    //         <Navbar.Brand className='user-select-none'  onClick={logoutUser}>
    //           Logout
    //         </Navbar.Brand>
    //       )}
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default Header;
