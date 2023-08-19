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
  Grid,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
import userImage from '../assets/default_user_image.png';

const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Daily Dues', icon: FiTrendingUp, route: '/dailyDues' },
  // { name: 'Explore', icon: FiCompass },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
];

export default function UserJeep({ children, userData, loanData }) {
  const { getUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });
  console.log('jeep', data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={useColorModeValue('white', 'gray.50')}>
      <SidebarContent
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
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
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
          <Tabs>
            <TabList>
              {data.data.jeep_id.map((item) => {
                return <Tab>{item.plate_no}</Tab>;
              })}
            </TabList>

            <TabPanels>
              {data.data.jeep_id.map((item) => {
                return (
                  <TabPanel>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Cr File #</FormLabel>
                        <Input placeholder={item.cr_fileNo} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Plate #</FormLabel>
                        <Input placeholder={item.plate_no} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Engine #</FormLabel>
                        <Input placeholder={item.engine_no} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Chasis #</FormLabel>
                        <Input placeholder={item.chasis_no} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Case #</FormLabel>
                        <Input placeholder={item.case_no} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Make</FormLabel>
                        <Input placeholder={item.make} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Color</FormLabel>
                        <Input placeholder={item.color} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Year Model</FormLabel>
                        <Input placeholder={item.year_model} />
                      </FormControl>
                      <FormControl isReadOnly={true}>
                        <FormLabel>Franchise Valid Date</FormLabel>
                        <Input placeholder={item.franchise_valid_date} />
                      </FormControl>
                    </Grid>
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}>
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => {
            navigate(`${link.route}`);
          }}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href='#'
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
        onClick={() => navigate('/')}>
        Dau Coop
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton
          size='lg'
          variant='ghost'
          aria-label='open menu'
          icon={<FiBell />}
        /> */}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} src={userImage} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'>
                  <Text fontSize='sm'>Justina Clark</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={() => navigate('/user-profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => navigate('/user-jeep')}>Jeep</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logoutUser()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
