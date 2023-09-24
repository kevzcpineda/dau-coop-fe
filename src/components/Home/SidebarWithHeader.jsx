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
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import userImage from '../../assets/default_user_image.png';
const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Daily Dues', icon: FiTrendingUp, route: '/user-share-capital' },
];

export default function SidebarWithHeader({ children, userData, loanData }) {
  const navigate = useNavigate();
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

        <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4}>
          {loanData &&
            loanData.map((item, index) => {
              return (
                <Box
                  key={index}
                  boxShadow='xl'
                  h='150'
                  w='90%'
                  borderRadius='15px'
                  onClick={() => navigate(`/user-payments/${item.id}`)}>
                  <Stack p='20px' spacing={3} h='150' direction='row'>
                    <Stack w='100%' spacing='4'>
                      <Flex align='center'>
                        <Heading as='h5' size='sm' pr='3px'>
                          Loan:
                        </Heading>
                        <Text fontSize='md'>{item.loan}</Text>
                      </Flex>
                      <Flex align='center'>
                        <Heading as='h5' size='sm' pr='3px'>
                          Balance:
                        </Heading>
                        <Text>{item.balance}</Text>
                      </Flex>
                      <Flex align='center'>
                        <Heading as='h5' size='sm' pr='3px'>
                          Penalty:
                        </Heading>
                        <Text>{item.penalty}</Text>
                      </Flex>
                    </Stack>
                    <Stack w='100%' spacing='4'>
                      <Flex align='center'>
                        <Heading as='h5' size='sm'>
                          Date:
                        </Heading>
                        <Text>{item.date}</Text>
                      </Flex>{' '}
                      <Flex align='center'>
                        <Heading as='h5' size='sm'>
                          Voucher # :
                        </Heading>
                        <Text>{item.voucher_number}</Text>
                      </Flex>{' '}
                      <Flex align='center'>
                        <Heading as='h5' size='sm'>
                          Status:
                        </Heading>
                        <Text>{item.status}</Text>
                      </Flex>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
        </VStack>
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
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
