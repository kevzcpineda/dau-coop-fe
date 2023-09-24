import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import { useUser } from '../../states/User';

const MemberTable = ({
  handleUserModal,
  handledeleteModal,
  handleLoanModal,
  handleJeepModal,
  handleChangePasswordModal,
  setPage,
  page,
  users,
  setId,
}) => {
  // const { users } = useUser((state) => state);

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
            users.results.map((user) => (
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
                  <Button
                    onClick={(e) => handleChangePasswordModal(e, user.id)}>
                    Change Password
                  </Button>
                  <Button
                    onClick={(e) => handleJeepModal(e, user.id)}
                    style={{
                      display:
                        user.member_status === 'OPERATOR' ? 'inline' : 'none',
                    }}>
                    add jeep
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Button
        onClick={() => setPage(page - 1)}
        isDisabled={users.previous === null ? true : false}>
        previous
      </Button>
      <Button
        onClick={() => setPage(page + 1)}
        isDisabled={users.next === null ? true : false}>
        next
      </Button>
    </TableContainer>
  );
};

export default MemberTable;
