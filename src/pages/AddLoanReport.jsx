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
  Flex,
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
  VStack,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
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
      return axios.get(`${baseURL}/loan/loan_optimize_no_page/?status=GRANTED`);
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

  const total = selectedUser.reduce((total, item) => {
    return total + item.amount;
  }, 0);
  const loanReportSchema = z.object({
    uuid: z.string(),
    user: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    loan: z.number(),
    amount: z.number(),
    ticket: z.number(),
    date: z.string(),
    penalty: z.number(),
  });
  const paymentReportSchema = z.object({
    title: z.string(),
    payments: z.array(loanReportSchema).nonempty(),
  });

  const handleChange = (value) => {
    const lastItem = selectedUser.findLast(
      (item) => parseInt(item.ticket) >= 0
    );

    // console.log(typeof lastItem.ticket);

    const loanReportValidate = loanReportSchema.safeParse({
      uuid: uuidv4(),
      user: value.user,
      loan: value.id,
      first_name: value.first_name,
      last_name: value.last_name,
      penalty: value.penalty,
      amount: parseInt(amount) == null ? '' : parseInt(amount),
      ticket: lastItem ? lastItem.ticket + 1 : parseInt(ticket),
      date: date,
    });
    if (!loanReportValidate.success) {
      loanReportValidate.error.issues.map((item) => {
        toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      setSelectedUser([...selectedUser, loanReportValidate.data]);
      console.log(
        'last item',
        selectedUser.findLast((item) => parseInt(item.ticket) >= 0)
      );
      // ticketRef.current.value = '';
      amountRef.current.value = '';
      // dataRef.current.value = '';
      setAmount(null);
      // setDate(null);
      // setTicket(null);
      // dropdownRef.current.clearValue();
      // console.log('dropsdown', dropdownRef.current);
    }
  };
  const handleDelete = (id) => {
    const newSelected = selectedUser.filter((item) => item.uuid !== id);
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
  };
  const handleOnChangeDate = (uuid, value) => {
    // console.log(uuid, value);
    const index = selectedUser.findIndex((item) => item.uuid === uuid);
    // console.log('index', index);
    // const newselected = (selectedUser[index].date = value);
    const newarr = selectedUser.map((item) => {
      if (item.uuid === uuid) {
        return {
          ...item,
          date: value,
        };
      }
      return item;
    });
    console.log('newarr', newarr);
    setSelectedUser(newarr);
  };
  const handleOnChangeAmount = (uuid, value) => {
    const newarr = selectedUser.map((item) => {
      if (item.uuid === uuid) {
        return {
          ...item,
          amount: value,
        };
      }
      return item;
    });
    console.log('newarr', newarr);
    setSelectedUser(newarr);
  };
  const transformNumber = (input) => {
    return input.toLocaleString();
  };
  return (
    <AdminLayout>
      <Toaster position='top-right' reverseOrder={false} />
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Box>
          <Heading>Add Loan Report</Heading>
          <Flex justify='end'>
            <Button onClick={() => handleSubmit()} colorScheme='blue'>
              SUBMIT
            </Button>
          </Flex>

          <VStack alignItems='start' mb={2}>
            <Input
              placeholder='OR#'
              onChange={(e) => setTitle(e.target.value)}
              w={300}
            />

            <Input
              w={300}
              ref={dataRef}
              type='date'
              onChange={(e) => setDate(e.target.value)}></Input>
            <Input
              w={300}
              ref={ticketRef}
              placeholder='Ticket'
              onChange={(e) => setTicket(e.target.value)}
            />
            <Input
              w={300}
              ref={amountRef}
              placeholder='Amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </VStack>
          <LoanDropdown
            handleChange={handleChange}
            data={data.data}
            ref={dropdownRef}
          />

          <Heading size='md'>Total: {transformNumber(total)}</Heading>
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
                          <Td>
                            <Input
                              value={item.amount}
                              onChange={(e) =>
                                handleOnChangeAmount(
                                  item.uuid,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </Td>
                          <Td>
                            <Input
                              type='date'
                              value={item.date}
                              onChange={(e) =>
                                handleOnChangeDate(item.uuid, e.target.value)
                              }
                            />
                          </Td>
                          <Td>
                            <Button onClick={() => handleDelete(item.uuid)}>
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
