import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/UserLayout';
import { Flex, Spinner } from '@chakra-ui/react';
import {
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
  Text,
} from '@chakra-ui/react';
import logo from '../assets/noimage.png';
import AuthContext from '../context/AuthContext';
// import useAxios from '../utils/useAxios';
import { useQuery } from 'react-query';
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { authTokens, logoutUser, getUserInfo, getUserLoan } =
    useContext(AuthContext);

  const { data, status } = useQuery('user', getUserInfo);
  const { data: loanData, status: loanStatus } = useQuery(
    'getUserLoan',
    getUserInfo
  );

  // let api = useAxios();

  // useEffect(() => {
  //   getUserInfos();
  // }, []);

  // const getUserInfos = async () => {
  //   setLoading(true);
  //   const response = await api.get('/user/');

  //   if (response.status === 200) {
  //     if (response.data.is_superuser) {
  //       navigate('/dashboard');
  //     } else {
  //       if (response.data.is_change_password === false) {
  //         navigate('/change-password');
  //         setLoading(false);
  //       } else {
  //         setUserInfo(response.data);
  //         setLoading(false);
  //       }
  //     }
  //   } else if (response.status === 401) {
  //     logoutUser();
  //     setLoading(false);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <Layout showHeader={false}>
  //       <Flex alignItems='center' justifyContent='center' height='100vh'>
  //         <Spinner
  //           thickness='10px'
  //           speed='0.65s'
  //           emptyColor='gray.200'
  //           color='blue.500'
  //           style={{ width: '150px', height: '150px' }}
  //         />
  //       </Flex>
  //     </Layout>
  //   );
  // } else {
  //   return <Layout showHeader={true}></Layout>;
  // }
  return (
    <>
      {status === 'loading' && (
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
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Layout showHeader={true}>
          <Tabs defaultIndex={1}>
            <TabPanels>
              <TabPanel>
                <Text>Chester</Text>
              </TabPanel>
              <TabPanel>
                <Text>kevin</Text>
              </TabPanel>
            </TabPanels>
            <TabList>
              <Tab>Naruto</Tab>
              <Tab>Sasuke</Tab>
            </TabList>
          </Tabs>
        </Layout>
      )}
    </>
    // <Layout showHeader={data}>

    // </Layout>
  );
};

export default Home;
