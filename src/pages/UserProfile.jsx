import React, { useContext, useState, useRef } from 'react';
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
  Image,
  Center,
  VStack,
  HStack,
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
  const [isEdit, setIsEdit] = useState(true);
  const { data, status } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });
  console.log('data', data);
  const phoneNo = useRef();
  const address = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleEditProfile = () => {
    setIsEdit(false);
    // phoneNo.current.focus();
  };
  const handleCancel = () => {
    setIsEdit(true);
    phoneNo.current.value = data.data.phone_no;
    address.current.value = data.data.home_address;
  };
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
        <>
          <VStack>
            <Image src={userImage} borderRadius='full' boxSize='100px' />
            <Button
              display={isEdit ? 'block' : 'none'}
              size='sm'
              onClick={() => handleEditProfile()}>
              Edit Profile
            </Button>
            <HStack display={isEdit ? 'none' : 'flex'} gap={5}>
              <Button
                colorScheme='red'
                size='sm'
                onClick={() => handleCancel()}>
                Cancel
              </Button>
              <Button
                colorScheme='whatsapp'
                size='sm'
                onClick={() => handleEditProfile()}>
                Save
              </Button>
            </HStack>
          </VStack>
          <Grid templateColumns='repeat(2, 1fr)' gap={6} pt={5} pb={100}>
            <FormControl isReadOnly={true}>
              <FormLabel>First Name</FormLabel>
              <Input
                // value={data.data.first_name}
                placeholder={data.data.first_name}
                sx={{
                  backgroundColor: 'gray.100',
                  fontSize: '15px',
                }}
                _placeholder={{ color: 'black' }}
              />
            </FormControl>
            <FormControl isReadOnly={true}>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder={data.data.last_name}
                sx={{
                  backgroundColor: 'gray.100',

                  fontSize: '15px',
                }}
                _placeholder={{ color: 'black' }}
              />
            </FormControl>
            <FormControl isReadOnly={true}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                placeholder={data.data.middle_name}
                sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
                _placeholder={{ color: 'black' }}
              />
            </FormControl>
            <FormControl isReadOnly={true}>
              <FormLabel>Member Status</FormLabel>
              <Input
                placeholder={data.data.member_status}
                sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
                _placeholder={{ color: 'black' }}
              />
            </FormControl>
            <FormControl isReadOnly={true}>
              <FormLabel mr={0}>Driver Licence No.</FormLabel>
              <Input
                placeholder={data.data.driver_license_no}
                sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
                _placeholder={{ color: 'black' }}
              />
            </FormControl>
            <FormControl isReadOnly={isEdit}>
              <FormLabel>Phone No.</FormLabel>
              <Input
                ref={phoneNo}
                placeholder={data.data.phone_no}
                sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
                _placeholder={{ color: 'black' }}
              />
            </FormControl>
            <FormControl isReadOnly={isEdit}>
              <FormLabel>Address</FormLabel>
              <Input
                ref={address}
                // value={data.data.home_address}
                placeholder={data.data.home_address}
                sx={{ backgroundColor: 'gray.100', fontSize: '15px' }}
                _placeholder={{ color: 'black' }}
              />
            </FormControl>
          </Grid>
        </>
      )}
    </UserLayout>
  );
}
