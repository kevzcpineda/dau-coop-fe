import React from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '../../states/User';

const MemberTable = ({
  handleUserModal,
  handledeleteModal,
  handleLoanModal,
  handleJeepModal,
}) => {
  console.log('member table rendered');
  const { users } = useUser((state) => state);

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>First Name</Th>
            <Th>Lasr Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users &&
            users.map((user) => (
              <Tr key={user.id} onClick={() => handleUserModal(user.id)}>
                <Td>{user.id}</Td>
                <Td>{user.first_name}</Td>
                <Td>{user.last_name}</Td>
                <Td>
                  <Button onClick={(e) => handledeleteModal(e, user.id)}>
                    delete
                  </Button>
                  <Button onClick={(e) => handleLoanModal(e, user.id)}>
                    Loan
                  </Button>
                  <Button onClick={(e) => handleJeepModal(e, user.id)}>
                    add jeep
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MemberTable;
