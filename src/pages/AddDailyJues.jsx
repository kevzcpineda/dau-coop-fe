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
  Select,
  Spinner,
} from '@chakra-ui/react';
import { useUser } from '../states/User';
import { useDailyJues } from '../states/Daily_jues';
import AuthContext from '../context/AuthContext';
import { useQuery, useMutation } from 'react-query';
import UserDropdown from '../components/AddDailyJues/UserDropdown';

const AddDailyJues = () => {
  const { getUsers, setUsers, users } = useUser((state) => state);
  const [selectedUser, setSelectedUser] = useState([]);
  const [date, setDate] = useState(null);
  const [ticket, setTicket] = useState('');
  const [title, setTitle] = useState('');
  const { getUser, createDailyJues, postDailyDuesReport } =
    useContext(AuthContext);
  const selectRef = useRef('');
  const ticketRef = useRef('');
  const { mutate } = useMutation(postDailyDuesReport);
  const handleChange = (value) => {
    console.log(value);

    // const res = users.find((item) => item.id === value);
    // console.log(res);
    const item = {
      user: value?.id,
      member_status: value?.member_status,
      fname: value?.first_name,
      lname: value?.last_name,
      amount: 50,
      ticket: ticket,
      date: date,
    };
    // console.log(item);
    {
      value && setSelectedUser([...selectedUser, item]);
    }
    setTitle('');
    // selectRef.current.value = '';
    ticketRef.current.value = '';
  };

  const handleDelete = (id) => {
    console.log(id);
    const newSelected = selectedUser.filter((item) => item.user !== id);
    setSelectedUser(newSelected);
  };

  const handleSubmit = async () => {
    const payload = {
      title: title,
      daily_dues: selectedUser,
    };
    await mutate(payload);
    setSelectedUser([]);
  };

  const { data, status } = useQuery('addDailyDues', getUsers);

  return (
    <AdminLayout>
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Box>
          <Heading>Add Daily Dues</Heading>
          <Input
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />

          <input type='date' onChange={(e) => setDate(e.target.value)}></input>
          <Input
            ref={ticketRef}
            placeholder='Ticket'
            onChange={(e) => setTicket(e.target.value)}
          />

          <UserDropdown handleChange={handleChange} />
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Ticket</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedUser &&
                  selectedUser
                    .map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{item.user}</Td>
                          <Td>{item.fname}</Td>
                          <Td>{item.lname}</Td>
                          <Td>{item.ticket}</Td>
                          <Td>{item.date}</Td>
                          <Td>
                            <Button onClick={() => handleDelete(item.user)}>
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })
                    .reverse()}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </AdminLayout>
  );
};

export default AddDailyJues;
