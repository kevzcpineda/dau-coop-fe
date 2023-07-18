import React, { useState, useContext, useRef } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { number, z } from 'zod';
const AddLoanReport = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

  const { data, status } = useQuery({
    queryKey: ['addLoanReport'],
    queryFn: () => {
      return axios.get(`${baseURL}/loan/`);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/loan/report/`, payload);
    },
    onError: (error) => {
      toast.error(`Error ${error} `);
    },
    onSuccess: () => {
      toast.success('Added Successfully!');
      setSelectedUser([]);
    },
  });
  const dropdownRef = useRef();
  const ticketRef = useRef();
  const dataRef = useRef();
  const amountRef = useRef();
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);

  const loanReportSchema = z.object({
    user: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    loan: z.number(),
    amount: z.number(),
    ticket: z.string().min(1),
    date: z.string(),
    penalty: z.number(),
  });
  const paymentReportSchema = z.object({
    title: z.string(),
    payments: z.array(loanReportSchema).nonempty(),
  });

  const handleChange = (value) => {
    console.log('value', value);
    const loanReportValidate = loanReportSchema.safeParse({
      user: value.user,
      loan: value.id,
      first_name: value.first_name,
      last_name: value.last_name,
      penalty: value.penalty,
      amount: parseInt(amount) == null ? '' : parseInt(amount),
      ticket: ticket,
      date: date,
    });
    console.log('loanReportValidate', loanReportValidate);
    if (!loanReportValidate.success) {
      loanReportValidate.error.issues.map((item) => {
        toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      setSelectedUser([...selectedUser, loanReportValidate.data]);
      ticketRef.current.value = '';
      amountRef.current.value = '';
      dataRef.current.value = '';
      setAmount(null);
      setDate(null);
      setTicket(null);
      // dropdownRef.current.clearValue();
      // console.log('dropsdown', dropdownRef.current);
    }
  };
  const handleDelete = (id) => {
    const newSelected = selectedUser.filter((item) => item.user !== id);
    setSelectedUser(newSelected);
  };
  const handleSubmit = async () => {
    const orValidate = paymentReportSchema.safeParse({
      title: title,
      payments: selectedUser,
    });

    console.log(orValidate);
    if (!orValidate.success) {
      orValidate.error.issues.map((item) => {
        toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      mutate(orValidate.data);
    }
    // const payload = {
    //   title: title,
    //   payments: selectedUser,
    // };
    // await mutate(payload);
    // setSelectedUser([]);
  };
  return (
    <AdminLayout>
      <Toaster position='top-right' reverseOrder={false} />
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Box>
          <Heading>Add Loan Report</Heading>
          <Input placeholder='OR#' onChange={(e) => setTitle(e.target.value)} />

          <input
            ref={dataRef}
            type='date'
            onChange={(e) => setDate(e.target.value)}></input>
          <Input
            ref={ticketRef}
            placeholder='Ticket'
            onChange={(e) => setTicket(e.target.value)}
          />
          <Input
            ref={amountRef}
            placeholder='Amount'
            onChange={(e) => setAmount(e.target.value)}
          />

          <LoanDropdown
            handleChange={handleChange}
            data={data.data}
            ref={dropdownRef}
          />
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
