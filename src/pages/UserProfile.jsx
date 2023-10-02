import React, { useContext } from 'react';
import {
  Flex,
  useDisclosure,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { ArrowBackIcon } from '@chakra-ui/icons';
import AuthContext from '../context/AuthContext';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../components/UserLayout';

import userImage from '../assets/default_user_image.png';
const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Daily Dues', icon: FiTrendingUp, route: '/dailyDues' },
  // { name: 'Explore', icon: FiCompass },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
];

export default function UserProfile({ children, userData, loanData }) {
  const { getUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });
  console.log('data', data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <UserLayout>
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
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <FormControl isReadOnly={true}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder={data.data.first_name}
              sx={{
                backgroundColor: 'gray.100',
                fontSize: '15px',
                color: 'black',
              }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder={data.data.last_name}
              sx={{
                backgroundColor: 'gray.100',
                color: 'white',
                fontSize: '15px',
              }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Middle Name</FormLabel>
            <Input
              placeholder={data.data.middle_name}
              sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Member Status</FormLabel>
            <Input
              placeholder={data.data.member_status}
              sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Driver Licence #</FormLabel>
            <Input
              placeholder={data.data.driver_license_no}
              sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
            />
          </FormControl>
        </Grid>
      )}
    </UserLayout>
  );
}
