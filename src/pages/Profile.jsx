import React, { useContext } from 'react';
import UserLayout from '../components/UserLayout';
import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Icon,
  StackDivider,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { GiJeep } from 'react-icons/gi';
import { CiLogout } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const Profile = () => {
  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleOnClick = (uri) => {
    navigate(uri);
  };
  return (
    <UserLayout>
      <Box w='100%' bg='gray.100' pl={5} pr={5} pt={2} pb={2}>
        <Stack divider={<StackDivider borderColor='gray.300' />} spacing={0}>
          <HStack
            p={3}
            justify='space-between'
            onClick={() => handleOnClick('/user-profile')}>
            <HStack>
              <Icon as={BsPerson} boxSize={5} />
              <Text fontSize={20}>Profile</Text>
            </HStack>
            <Icon as={IoIosArrowForward} />
          </HStack>
          <HStack
            p={3}
            justify='space-between'
            onClick={() => handleOnClick('/user-jeep')}>
            <HStack>
              <Icon as={GiJeep} boxSize={5} />
              <Text fontSize={20}>Jeep</Text>
            </HStack>
            <Icon as={IoIosArrowForward} />
          </HStack>
          <HStack p={3} justify='space-between' onClick={() => logoutUser()}>
            <HStack>
              <Icon as={CiLogout} boxSize={5} />
              <Text fontSize={20}>Logout</Text>
            </HStack>
            <Icon as={IoIosArrowForward} />
          </HStack>
        </Stack>
      </Box>
    </UserLayout>
  );
};

export default Profile;
