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
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '../states/User';
import { useDailyJues } from '../states/Daily_jues';
import AuthContext from '../context/AuthContext';
import { useQuery, useMutation } from 'react-query';
import UserDropdown from '../components/AddDailyJues/UserDropdown';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const AddDailyJues = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { getUsers, setUsers, users } = useUser((state) => state);
  const [selectedUser, setSelectedUser] = useState([]);
  const [date, setDate] = useState();
  const [amount, setAmount] = useState(50);
  // const [title, setTitle] = useState();
  const { getUser, createDailyJues, postDailyDuesReport } =
    useContext(AuthContext);

  const dateRef = useRef();
  const amountRef = useRef();

  const { mutate, isLoading } = useMutation({
    mutationFn: postDailyDuesReport,
    onSuccess: () => {
      toast.success('Added Successfully!');
      // titleRef.current.value = '';
      // setTitle(null);
      setSelectedUser([]);
    },
    onError: (error) => {
      toast.error(`Error ${error} `);
    },
  });

  const dailyDuesReportSchema = z.object({
    uuid: z.string(),
    user: z.number(),
    member_status: z.string(),
    fname: z.string(),
    lname: z.string(),
    amount: z.number(),
    // ticket: z.string(),
    date: z.string(),
  });
  const submitDailyDuesReportSchema = z.object({
    // title: z.string(),
    daily_dues: z.array(dailyDuesReportSchema).nonempty(),
  });
  const handleChange = (value) => {
    console.log('valueeeeeeeeeeee', value);
    // const res = users.find((item) => item.id === value);
    const dailyDuesReportValidate = dailyDuesReportSchema.safeParse({
      uuid: uuidv4(),
      user: value.id,
      member_status: value.member_status,
      fname: value.first_name,
      lname: value.last_name,
      amount: amount,
      date: date,
    });
    console.log(dailyDuesReportValidate);
    if (!dailyDuesReportValidate.success) {
      dailyDuesReportValidate.error.issues.map((item) => {
        toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      setSelectedUser([...selectedUser, dailyDuesReportValidate.data]);
      // ticketRef.current.value = '';
      amountRef.current.value = '';
      setAmount(50);
    }
    // const item = {
    //   user: value?.id,
    //   member_status: value?.member_status,
    //   fname: value?.first_name,
    //   lname: value?.last_name,
    //   amount: 50,
    //   ticket: ticket,
    //   date: date,
    // };

    // value && setSelectedUser([...selectedUser, item]);
  };

  const handleDelete = (id) => {
    const newSelected = selectedUser.filter((item) => item.uuid !== id);
    setSelectedUser(newSelected);
  };

  const handleSubmit = async () => {
    const validateSubmit = submitDailyDuesReportSchema.safeParse({
      daily_dues: selectedUser,
    });
    if (!validateSubmit.success) {
      validateSubmit.error.issues.map((item) => {
        toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      mutate(validateSubmit.data);
    }
  };

  const { data, status } = useQuery({
    queryKey: ['addDailyDues'],
    queryFn: () => {
      return axios.get(`${baseURL}/createUser/`);
    },
  });
  console.log('data', data);
  return (
    <AdminLayout>
      <Toaster position='top-right' reverseOrder={false} />
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Box>
          <Heading>Add Daily Dues</Heading>
          {/* <Input
            ref={titleRef}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          /> */}

          <input
            type='date'
            ref={dateRef}
            onChange={(e) => setDate(e.target.value)}></input>
          <Input
            ref={amountRef}
            placeholder={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />

          <UserDropdown handleChange={handleChange} data={data.data} />
          {isLoading ? (
            <Button isLoading loadingText='Submitting'>
              Submit
            </Button>
          ) : (
            <Button onClick={() => handleSubmit()}>Submit</Button>
          )}

          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
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
                          <Td>{item.fname}</Td>
                          <Td>{item.lname}</Td>
                          <Td>{item.amount}</Td>
                          <Td>{item.date}</Td>
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

export default AddDailyJues;
