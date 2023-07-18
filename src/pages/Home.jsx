import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/UserLayout';
import {
  Flex,
  Spinner,
  Image,
  Box,
  Grid,
  GridItem,
  Input,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Text,
} from '@chakra-ui/react';
import logo from '../assets/noimage.png';
import AuthContext from '../context/AuthContext';
// import useAxios from '../utils/useAxios';
import { useQuery } from 'react-query';
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
    <>
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
        <SidebarWithHeader userData={userData.data} loanData={loanData.data} />
      )}
    </>
  );
};

export default Home;
