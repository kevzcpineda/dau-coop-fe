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
  StackDivider,
  Select,
  HStack,
  Spinner,
  VStack,
  Grid,
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
  // const [selectedUser, setSelectedUser] = useState([]);
  const [date, setDate] = useState();
  const [amount, setAmount] = useState(50);
  // const [title, setTitle] = useState();
  const { getUser, createDailyJues, postDailyDuesReport } =
    useContext(AuthContext);

  const dateRef = useRef();
  const amountRef = useRef();
  const newamountRef = useRef([]);

  const { mutate, isLoading } = useMutation({
    mutationFn: postDailyDuesReport,
    onSuccess: () => {
      toast.success('Added Successfully!');
      newamountRef.current.map((item) => {
        item.el.value = '';
      });
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
    date: z.string(),
  });
  const submitDailyDuesReportSchema = z.object({
    // title: z.string(),
    daily_dues: z.array(dailyDuesReportSchema).nonempty(),
  });

  const handleSubmit = async () => {
    const newItem = newamountRef.current.filter((item) => item.el.value);
    const dailyDuesPayload = newItem.map((item) => {
      const dailyDuesReportValidate = dailyDuesReportSchema.safeParse({
        user: item.item.id,
        member_status: item.item.member_status,
        fname: item.item.first_name,
        lname: item.item.last_name,
        amount: parseInt(item.el.value),
        date: date,
      });
      if (!dailyDuesReportValidate.success) {
        return { errorMessage: 'Invalid' };
      }
      return dailyDuesReportValidate.data;
    });

    const submitDailyDuesReportValidate = submitDailyDuesReportSchema.safeParse(
      {
        daily_dues: dailyDuesPayload,
      }
    );
    if (!submitDailyDuesReportValidate.success) {
      console.log('false');

      return false;
    }
    mutate(submitDailyDuesReportValidate.data);
  };

  const { data, status } = useQuery({
    queryKey: ['addDailyDues'],
    queryFn: () => {
      return axios.get(`${baseURL}/createUser/`);
    },
  });
  const operators = data?.data
    .filter((item) => {
      return item.member_status === 'OPERATOR';
    })
    .sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
  const asso_operators = data?.data
    .filter((item) => {
      return item.member_status === 'ASSOCIATE_OPERATOR';
    })
    .sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
  const driver = data?.data
    .filter((item) => {
      return item.member_status === 'DRIVER';
    })
    .sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
  const sub_driver = data?.data
    .filter((item) => {
      return item.member_status === 'SUBTITUTE_DRIVER';
    })
    .sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
  const barker = data?.data
    .filter((item) => {
      return item.member_status === 'BARKER';
    })
    .sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
  const regular_member = data?.data
    .filter((item) => {
      return item.member_status === 'REGULAR_MEMBER';
    })
    .sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
  // console.log(newamountRef.current.filter((item) => item.el.value === '50'));
  return (
    <AdminLayout>
      <Toaster position='top-right' reverseOrder={false} />
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Box>
          <Heading>Add Daily Dues</Heading>
          <HStack gap={6} pb={5}>
            <Input
              w={300}
              type='date'
              ref={dateRef}
              onChange={(e) => setDate(e.target.value)}></Input>

            {isLoading ? (
              <Button isLoading loadingText='Submitting'>
                Submit
              </Button>
            ) : (
              <Button onClick={() => handleSubmit()} colorScheme='whatsapp'>
                Submit
              </Button>
            )}
          </HStack>
          <Grid templateColumns='repeat(6, 1fr)' gap={4}>
            <VStack alignItems='start'>
              {operators?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) => (newamountRef.current[index] = { el, item })}
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              {asso_operators?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) => (newamountRef.current[index] = { el, item })}
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              {driver?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) => (newamountRef.current[index] = { el, item })}
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              {sub_driver?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) => (newamountRef.current[index] = { el, item })}
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              {barker?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) => (newamountRef.current[index] = { el, item })}
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              {regular_member?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) => (newamountRef.current[index] = { el, item })}
                    />
                  </HStack>
                );
              })}
            </VStack>
          </Grid>
        </Box>
      )}
    </AdminLayout>
  );
};

export default AddDailyJues;
