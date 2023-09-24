import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/UserLayout';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  StackDivider,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import logo from '../assets/noimage.png';
import AuthContext from '../context/AuthContext';
// import useAxios from '../utils/useAxios';
import { useQuery } from 'react-query';
import UserLayout from '../components/UserLayout';
import SidebarWithHeader from '../components/Home/SidebarWithHeader';
const Home = () => {
  const navigate = useNavigate();
  const { authTokens, logoutUser, getUserInfo, getUserLoan } =
    useContext(AuthContext);

  const { data: userData, status } = useQuery('user', getUserInfo);
  const { data: loanData, status: loanStatus } = useQuery(
    'getUserLoan',
    getUserLoan
  );

  return (
    <UserLayout>
      {status === 'loading' && loanStatus === 'loading' && (
        <Flex alignItems='center' justifyContent='center' height='100vh'>
          <Spinner
            thickness='10px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            style={{ width: '150px', height: '150px' }}
          />
        </Flex>
      )}
      {status === 'error' && loanStatus === 'error' && <div>error...</div>}
      {status === 'success' && loanStatus === 'success' && (
        <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4}>
          {loanData &&
            loanData.data.map((item, index) => {
              return (
                <Box
                  key={index}
                  boxShadow='xl'
                  h='150'
                  w='90%'
                  borderRadius='15px'
                  onClick={() => navigate(`/user-payments/${item.id}`)}>
                  <Stack p='20px' spacing={3} h='150' direction='row'>
                    <Stack w='100%' spacing='4'>
                      <Flex align='center'>
                        <Heading as='h5' size='sm' pr='3px'>
                          Loan:
                        </Heading>
                        <Text fontSize='md'>{item.loan}</Text>
                      </Flex>
                      <Flex align='center'>
                        <Heading as='h5' size='sm' pr='3px'>
                          Balance:
                        </Heading>
                        <Text>{item.balance}</Text>
                      </Flex>
                      <Flex align='center'>
                        <Heading as='h5' size='sm' pr='3px'>
                          Penalty:
                        </Heading>
                        <Text>{item.penalty}</Text>
                      </Flex>
                    </Stack>
                    <Stack w='100%' spacing='4'>
                      <Flex align='center'>
                        <Heading as='h5' size='sm'>
                          Date:
                        </Heading>
                        <Text>{item.date}</Text>
                      </Flex>{' '}
                      <Flex align='center'>
                        <Heading as='h5' size='sm'>
                          Voucher # :
                        </Heading>
                        <Text>{item.voucher_number}</Text>
                      </Flex>{' '}
                      <Flex align='center'>
                        <Heading as='h5' size='sm'>
                          Status:
                        </Heading>
                        <Text>{item.status}</Text>
                      </Flex>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
        </VStack>
      )}
    </UserLayout>
  );
};

export default Home;
