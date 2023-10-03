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
            <Table variant='striped' colorScheme='blue'>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Or</Th>
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
