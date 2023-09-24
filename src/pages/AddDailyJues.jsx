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
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const AddDailyJues = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { getUsers, setUsers, users } = useUser((state) => state);
  const [selectedUser, setSelectedUser] = useState([]);
  const [date, setDate] = useState();
  // const [ticket, setTicket] = useState();
  const [title, setTitle] = useState();
  const { getUser, createDailyJues, postDailyDuesReport } =
    useContext(AuthContext);

  const dateRef = useRef();
  // const ticketRef = useRef();
  const titleRef = useRef();
  const { mutate, isLoading } = useMutation({
    mutationFn: postDailyDuesReport,
    onSuccess: () => {
      toast.success('Added Successfully!');
      titleRef.current.value = '';
      setTitle(null);
      setSelectedUser([]);
    },
    onError: (error) => {
      toast.error(`Error ${error} `);
    },
  });

  const dailyDuesReportSchema = z.object({
    user: z.number(),
    member_status: z.string(),
    fname: z.string(),
    lname: z.string(),
    amount: z.number(),
    // ticket: z.string(),
    date: z.string(),
  });
  const submitDailyDuesReportSchema = z.object({
    title: z.string(),
    daily_dues: z.array(dailyDuesReportSchema).nonempty(),
  });
  const handleChange = (value) => {
    console.log(value);
    // const res = users.find((item) => item.id === value);
    const dailyDuesReportValidate = dailyDuesReportSchema.safeParse({
      user: value.id,
      member_status: value.member_status,
      fname: value.first_name,
      lname: value.last_name,
      amount: 50,
      // ticket: ticket,
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
      // dateRef.current.value = '';
      // setDate(null);
      // setTicket(null);
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
    const newSelected = selectedUser.filter((item) => item.user !== id);
    setSelectedUser(newSelected);
  };

  const handleSubmit = async () => {
    const validateSubmit = submitDailyDuesReportSchema.safeParse({
      title: title,
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
          <Input
            ref={titleRef}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type='date'
            ref={dateRef}
            onChange={(e) => setDate(e.target.value)}></input>
          {/* <Input
            ref={ticketRef}
            placeholder='Ticket'
            onChange={(e) => setTicket(e.target.value)}
          /> */}

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
                  {/* <Th>Ticket</Th> */}
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedUser &&
                  selectedUser.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.user}</Td>
                        <Td>{item.fname}</Td>
                        <Td>{item.lname}</Td>
                        {/* <Td>{item.ticket}</Td> */}
                        <Td>{item.date}</Td>
                        <Td>
                          <Button onClick={() => handleDelete(item.user)}>
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </AdminLayout>
  );
};

export default AddDailyJues;
