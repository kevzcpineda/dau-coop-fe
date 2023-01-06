import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Heading,
  useColorModeValue as mode,
  Button,
} from '@chakra-ui/react';
import { FaRegChartBar } from 'react-icons/fa';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillPeopleFill, BsCalendar } from 'react-icons/bs';

import { NavLink } from './NavLink';
import AuthContext from '../../context/AuthContext';

export const Sidebar = (props) => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <Flex
      bg={mode('gray.50', 'gray.800')}
      direction='column'
      borderRightWidth='1px'
      width='80'
      {...props}>
      <Flex direction='column' flex='1' pt='5' pb='4' overflowY='auto' px='4'>
        <Box mb='6'>
          <Heading as='h2' size='x1' color={mode('gray.600', 'gray.400')}>
            DAU COOP
          </Heading>
        </Box>

        <Stack spacing='6' as='nav' aria-label='Sidebar Navigation'>
          <Stack spacing='1'>
            <NavLink label='Home' href='/dashboard' icon={AiFillHome} />
            <NavLink label='Members' href='/members' icon={BsFillPeopleFill} />
            <NavLink label='Loan' href='/loans' icon={BsFillPeopleFill} />
            <NavLink
              label='Daily Jues'
              href='/daily-jues'
              icon={BsFillPeopleFill}
            />
            <NavLink
              label='Add Daily Jues'
              href='/add-daily-jues'
              icon={BsFillPeopleFill}
            />
            {/* <NavLink
            label="Scheduled Viewing"
            href="/schedule"
            icon={BsCalendar}
          />
          <NavLink label="Reports" href="/reports" icon={FaRegChartBar} />
          <NavLink label="Setting" href="/settings" icon={AiFillSetting} /> */}
            <Button colorScheme='blue' onClick={logoutUser}>
              LogOut
            </Button>
          </Stack>
        </Stack>
        <Spacer />
      </Flex>
    </Flex>
  );
};
