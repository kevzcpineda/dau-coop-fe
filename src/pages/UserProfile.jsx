import React, { useContext } from 'react';
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
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  TableContainer,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
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
            <Input placeholder={data.data.first_name} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder={data.data.last_name} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Middle Name</FormLabel>
            <Input placeholder={data.data.middle_name} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Member Status</FormLabel>
            <Input placeholder={data.data.member_status} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Driver Licence #</FormLabel>
            <Input placeholder={data.data.driver_license_no} />
          </FormControl>
        </Grid>
      )}
    </UserLayout>
  );
}
