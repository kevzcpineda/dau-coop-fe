import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import AuthContext from '../context/AuthContext';

const Members = () => {
  const { getUsers } = useContext(AuthContext);
  const [users, setUser] = useState([])

  useEffect(() => {
    const handleGetUser = async () => {
      const response = await getUsers();
      setUser(response)
    } 

    handleGetUser();
  }, [])
  return (
    <AdminLayout>
      <Box>
      <Heading>Members</Heading>
      <TableContainer>
        <Table variant='striped' colorScheme='gray'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Lasr Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            { users && users.map(user => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.first_name}</Td>
                <Td>{user.last_name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Box>
    </AdminLayout>
  )
}

export default Members