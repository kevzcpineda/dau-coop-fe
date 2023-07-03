import React, { useState, useContext } from 'react';
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
import AuthContext from '../context/AuthContext';
import LoanDropdown from '../components/AddLoanReport/LoanDropdown';
import { useQuery, useMutation } from 'react-query';
import { useLoan } from '../states/Loan';
const AddLoanReport = () => {
  const { getLoans } = useLoan((state) => state);
  const { postLoanReport } = useContext(AuthContext);
  const { data, status } = useQuery('addLoanReport', getLoans);
  const { mutate } = useMutation(postLoanReport);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [ticket, setTicket] = useState('');
  const [selectedUser, setSelectedUser] = useState([]);

  const handleChange = (value) => {
    console.log(value);

    const item = {
      user: value?.user,
      loan: value?.id,
      first_name: value?.first_name,
      last_name: value?.last_name,
      amount: amount,
      ticket: ticket,
      date: date,
      penalty: value?.penalty,
    };

    {
      value && setSelectedUser([...selectedUser, item]);
    }
  };
  const handleDelete = (id) => {
    console.log(id);
    const newSelected = selectedUser.filter((item) => item.user !== id);
    setSelectedUser(newSelected);
  };
  const handleSubmit = async () => {
    const payload = {
      title: title,
      payments: selectedUser,
    };
    await mutate(payload);
    setSelectedUser([]);
  };
  return (
    <AdminLayout>
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Box>
          <Heading>Add Loan Report</Heading>
          <Input placeholder='OR#' onChange={(e) => setTitle(e.target.value)} />

          <input type='date' onChange={(e) => setDate(e.target.value)}></input>
          <Input
            placeholder='Ticket'
            onChange={(e) => setTicket(e.target.value)}
          />
          <Input
            placeholder='Amount'
            onChange={(e) => setAmount(e.target.value)}
          />

          <LoanDropdown handleChange={handleChange} />
          <Button onClick={() => handleSubmit()}>Submit</Button>

          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Ticket</Th>
                  <Th>Amount</Th>
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
                          <Td>{index + 1}</Td>
                          <Td>{item.first_name}</Td>
                          <Td>{item.last_name}</Td>
                          <Td>{item.ticket}</Td>
                          <Td>{item.amount}</Td>
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

export default AddLoanReport;
