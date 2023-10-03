import React, { useContext, useState } from 'react';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Spacer,
  TabPanel,
  Image,
  Center,
} from '@chakra-ui/react';
import { GiTakeMyMoney } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import Logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import MobileNav from './MobileNav';
import SidebarContent from './SidebarContent';
const Index = ({ children, userData, loanData }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleTabOnclick = (uri) => {
    navigate(uri);
  };
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.50', 'gray.50')}>
      <Box bg='blue.700' h={20} mb='30px' pl={10} pr={10} pt={2}>
        {/* <Image src={Logo} alt='Logo' boxSize='60px' /> */}
        <Center>
          <Text color='gray.100' as='b' fontSize='2xl'>
            Dau Cooperative
          </Text>
        </Center>
      </Box>
      <Box pl={10} pr={10} h='100vh'>
        {children}
      </Box>

      <Tabs
        isFitted
        variant='line'
        align='center'
        onChange={(e) => setSelectedTab(e)}
        defaultIndex={4}>
        <TabList
          sx={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            backgroundColor: 'white',
          }}>
          <Tab
            sx={{
              padding: '10px',
            }}
            onClick={() => {
              handleTabOnclick('/');
            }}>
            <VStack spacing={0}>
              <Icon as={AiFillHome} boxSize={6} />
              <Text mt={0}>Home</Text>
            </VStack>
          </Tab>
          <Tab
            sx={{
              padding: '10px',
            }}
            onClick={() => {
              handleTabOnclick('/user-share-capital');
            }}>
            <VStack spacing={0}>
              <Icon as={GiTakeMyMoney} boxSize={6} />
              <Text mt={0}> Daily Dues </Text>
            </VStack>
          </Tab>
          <Tab
            sx={{
              padding: '10px',
              color: selectedTab === 2 ? 'blue.600' : 'black',
            }}
            onClick={() => {
              handleTabOnclick('/profile');
            }}>
            <VStack spacing={0}>
              <Icon as={BsFillPersonFill} boxSize={6} />
              <Text mt={0}> Profile</Text>
            </VStack>
          </Tab>
        </TabList>
      </Tabs>

      {/* <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box> */}
    </Box>
  );
};

export default Index;
