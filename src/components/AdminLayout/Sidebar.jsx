import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Heading,
  useColorModeValue as mode,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { FaRegChartBar } from 'react-icons/fa';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BsFillPeopleFill, BsCalendar } from 'react-icons/bs';
import { NavLink } from './NavLink';
import AuthContext from '../../context/AuthContext';

export const Sidebar = (props) => {
  const { logoutUser } = useContext(AuthContext);
  const { isOpen: loanIsOpen, onToggle: loanOnToggle } = useDisclosure();
  const { isOpen: dailyDuesIsOpen, onToggle: dailyDuesOnToggle } =
    useDisclosure();
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
            <NavLink
              label='Loan'
              icon={BsFillPeopleFill}
              onClick={loanOnToggle}
            />
            <Collapse in={loanIsOpen} animateOpacity>
              <NavLink label='Granted Loan' href='/grantedLoan' ml={3} />
              <NavLink label='Done Loan' href='/doneLoan' ml={3} />
              <NavLink label='Reports' href='/loan-reports' ml={3} />
              <NavLink
                label='Create Payments'
                href='/add-loan-reports'
                ml={3}
              />
            </Collapse>

            <NavLink
              label='Share Capital'
              icon={BsFillPeopleFill}
              onClick={dailyDuesOnToggle}
            />
            <Collapse in={dailyDuesIsOpen} animateOpacity>
              <NavLink
                label='Create Daily Dues'
                href='/add-daily-jues'
                ml={3}
              />
              <NavLink label='Reports' href='/daily-dues-reports' ml={3} />
              <NavLink label='AR Ledger' href='/daily-jues' ml={3} />
              <NavLink
                label='Monthly Capital Share'
                href='/monthly-capital-share'
                ml={3}
              />
              <NavLink
                label='Daily Capital Share'
                href='/daily-capital-share'
                ml={3}
              />
              <NavLink label='Daily Dues' href='/daily-dues' ml={3} />
            </Collapse>

            {/* <NavLink
              label='Daily Dues'
              href='/daily-jues'
              icon={BsFillPeopleFill}
            />
            <NavLink
              label='Add Daily Dues'
              href='/add-daily-jues'
              icon={BsFillPeopleFill}
            />
            <NavLink
              label='Daily Dues Reports'
              href='/daily-dues-reports'
              icon={FaRegChartBar}
            /> */}
            {/* <NavLink
              label='Scheduled Viewing'
              href='/schedule'
              icon={BsCalendar}
            /> */}
            {/* <NavLink
              label='Loan Reports'
              href='/loan-reports'
              icon={FaRegChartBar}
            />
            <NavLink
              label='Add Loan Reports'
              href='/add-loan-reports'
              icon={FaRegChartBar}
            /> */}

            {/* <NavLink label='Setting' href='/settings' icon={AiFillSetting} /> */}
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
