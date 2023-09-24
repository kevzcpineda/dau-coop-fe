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
import userImage from '../assets/default_user_image.png';
import AuthContext from '../context/AuthContext';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import UserLayout from '../components/UserLayout';

const LinkItems = [
  { name: 'Home', icon: FiHome },
  { name: 'Daily Dues', icon: FiTrendingUp },
  // { name: 'Explore', icon: FiCompass },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
];

export default function UserPayments({ children, userData, loanData }) {
  const { getUserLoanPayments } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['userLoanPayments', id],
    queryFn: () => getUserLoanPayments(id),
  });
  console.log('data', data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <UserLayout>
      <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4}>
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
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Ticket</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.data.map((item, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{item.date}</Td>
                      <Td>{item.amount}</Td>
                      <Td>{item.ticket}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    </UserLayout>
  );
}

// const SidebarContent = ({ onClose, ...rest }) => {
//   return (
//     <Box
//       transition='3s ease'
//       bg={useColorModeValue('white', 'gray.900')}
//       borderRight='1px'
//       borderRightColor={useColorModeValue('gray.200', 'gray.700')}
//       w={{ base: 'full', md: 60 }}
//       pos='fixed'
//       h='full'
//       {...rest}>
//       <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
//         <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
//           Logo
//         </Text>
//         <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
//       </Flex>
//       {LinkItems.map((link) => (
//         <NavItem key={link.name} icon={link.icon}>
//           {link.name}
//         </NavItem>
//       ))}
//     </Box>
//   );
// };

// const NavItem = ({ icon, children, ...rest }) => {
//   return (
//     <Link
//       href='#'
//       style={{ textDecoration: 'none' }}
//       _focus={{ boxShadow: 'none' }}>
//       <Flex
//         align='center'
//         p='4'
//         mx='4'
//         borderRadius='lg'
//         role='group'
//         cursor='pointer'
//         _hover={{
//           bg: 'cyan.400',
//           color: 'white',
//         }}
//         {...rest}>
//         {icon && (
//           <Icon
//             mr='4'
//             fontSize='16'
//             _groupHover={{
//               color: 'white',
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Link>
//   );
// };

// const MobileNav = ({ onOpen, ...rest }) => {
//   const navigate = useNavigate();
//   const { logoutUser } = useContext(AuthContext);
//   return (
//     <Flex
//       ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 4 }}
//       height='20'
//       alignItems='center'
//       bg={useColorModeValue('white', 'gray.900')}
//       borderBottomWidth='1px'
//       borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
//       justifyContent={{ base: 'space-between', md: 'flex-end' }}
//       {...rest}>
//       <IconButton
//         display={{ base: 'flex', md: 'none' }}
//         onClick={() => navigate('/')}
//         variant='outline'
//         aria-label='open menu'
//         icon={<ArrowBackIcon />}
//       />

//       <Text
//         display={{ base: 'flex', md: 'none' }}
//         fontSize='2xl'
//         fontFamily='monospace'
//         fontWeight='bold'>
//         Logo
//       </Text>

//       <HStack spacing={{ base: '0', md: '6' }}>
//         {/* <IconButton
//           size='lg'
//           variant='ghost'
//           aria-label='open menu'
//           icon={<FiBell />}
//         /> */}
//         <Flex alignItems={'center'}>
//           <Menu>
//             <MenuButton
//               py={2}
//               transition='all 0.3s'
//               _focus={{ boxShadow: 'none' }}>
//               <HStack>
//                 <Avatar size={'sm'} src={userImage} />
//                 <VStack
//                   display={{ base: 'none', md: 'flex' }}
//                   alignItems='flex-start'
//                   spacing='1px'
//                   ml='2'>
//                   <Text fontSize='sm'>Justina Clark</Text>
//                   <Text fontSize='xs' color='gray.600'>
//                     Admin
//                   </Text>
//                 </VStack>
//                 <Box display={{ base: 'none', md: 'flex' }}>
//                   <FiChevronDown />
//                 </Box>
//               </HStack>
//             </MenuButton>
//             <MenuList
//               bg={useColorModeValue('white', 'gray.900')}
//               borderColor={useColorModeValue('gray.200', 'gray.700')}>
//               <MenuItem>Profile</MenuItem>
//               <MenuDivider />
//               <MenuItem onClick={() => logoutUser()}>Sign out</MenuItem>
//             </MenuList>
//           </Menu>
//         </Flex>
//       </HStack>
//     </Flex>
//   );
// };
