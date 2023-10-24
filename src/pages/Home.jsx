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
  Divider,
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
                  sx={{ backgroundColor: '#1d3557' }}
                  p={3}
                  color='gray.200'
                  key={index}
                  boxShadow='xl'
                  h='170'
                  w='100%'
                  borderRadius='15px'
                  onClick={() => navigate(`/user-payments/${item.id}`)}>
                  <Stack>
                    <HStack justify='space-evenly'>
                      <Stack align='center' spacing={0}>
                        <Text>Balance</Text>
                        <Text fontSize='3xl' as='b'>
                          {new Intl.NumberFormat({
                            style: 'currency',
                          }).format(item.balance)}
                        </Text>
                      </Stack>
                      <Stack align='center' spacing={0}>
                        <Text>Penalty</Text>
                        <Text fontSize='3xl' as='b'>
                          {new Intl.NumberFormat({
                            style: 'currency',
                          }).format(item.penalty)}
                        </Text>
                      </Stack>
                    </HStack>
                    <Divider />
                    <HStack justify='space-evenly'>
                      <Stack align='center' spacing={0}>
                        <Text>Granted Loan</Text>
                        <Text as='b'>
                          {' '}
                          {new Intl.NumberFormat({
                            style: 'currency',
                          }).format(item.loan)}
                        </Text>
                      </Stack>
                      <Stack align='center' spacing={0}>
                        <Text>Date</Text>
                        <Text as='b'> {item.date}</Text>
                      </Stack>
                      <Stack align='center' spacing={0}>
                        <Text>Cr</Text>
                        <Text as='b'>
                          {' '}
                          {item.voucher_number ? item.voucher_number : 'none'}
                        </Text>
                      </Stack>
                    </HStack>
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
