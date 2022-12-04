import React, { useContext, useEffect, useState, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
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
import AuthContext from '../context/AuthContext';
import { useUser } from '../states/User';

const Members = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const {
    isOpen: loanIsOpen,
    onOpen: loanOnOpen,
    onClose: loanOnClose,
  } = useDisclosure();
  const { getUsers } = useContext(AuthContext);
  const [users, setUser] = useState([]);
  const [id, setId] = useState(null);
  const { getUser, user, deleteUser, editUser } = useUser((state) => state);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  const handleGetUser = async () => {
    const response = await getUsers();
    setUser(response);
    console.log(response);
  };

  const handleEdit = () => {
    editUser(id, firstName, lastName);
    onClose();
  };

  const handleEditModal = (id) => {
    getUser(id);
    setId(id);
    onOpen();
  };

  const handleLoanModal = (id) => {
    setId(id);
    loanOnOpen();
  };
  const handleDeleteUser = (id) => {
    deleteUser(id);
    const newUser = users.filter((user) => user.id !== id);
    setUser(newUser);
    deleteOnClose();
  };

  const handledeleteClick = (id) => {
    deleteOnOpen();
    setId(id);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.id}</Td>
                    <Td>{user.first_name}</Td>
                    <Td>{user.last_name}</Td>
                    <Td>
                      <Button onClick={() => handleEditModal(user.id)}>
                        Edit
                      </Button>
                      <Button onClick={() => handledeleteClick(user.id)}>
                        delete
                      </Button>
                      <Button onClick={() => handleLoanModal(user.id)}>
                        Loan
                      </Button>

                      <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Edit</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <FormControl>
                              <FormLabel>First name</FormLabel>
                              <Input
                                value={user.first_name}
                                onChange={(e) => setfirstName(e.target.value)}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Last name</FormLabel>
                              <Input
                                value={user.last_name}
                                onChange={(e) => setlastName(e.target.value)}
                              />
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                              Close
                            </Button>
                            <Button
                              variant='ghost'
                              onClick={() => handleEdit()}
                            >
                              Edit
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>

                      <Modal isOpen={deleteIsOpen} onClose={deleteOnClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>delete</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>delete</ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme='blue'
                              mr={3}
                              onClick={deleteOnClose}
                            >
                              Close
                            </Button>
                            <Button
                              variant='ghost'
                              onClick={() => handleDeleteUser(id)}
                            >
                              Delete
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>

                      <Modal isOpen={loanIsOpen} onClose={loanOnClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>loan</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>loan</ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme='blue'
                              mr={3}
                              onClick={loanOnClose}
                            >
                              Close
                            </Button>
                            <Button variant='ghost'>Delete</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  );
};

export default Members;
