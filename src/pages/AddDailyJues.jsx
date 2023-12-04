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
  const [shareCapitaltotalAmount, setShareCapitalTotalAmount] = useState();
  const [subDriverTotalAmount, setSubDriverTotalAmount] = useState();
  const [barkerTotalAmount, setBarkerTotalAmount] = useState();
  const [operatorFocusId, setOperatorFocusId] = useState(null);
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
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      if (lastNameComparison === 0) {
        return a.first_name.localeCompare(b.first_name);
      }
      return lastNameComparison;
    });
  const asso_operators = data?.data
    .filter((item) => {
      return item.member_status === 'ASSOCIATE_OPERATOR';
    })
    .sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      if (lastNameComparison === 0) {
        return a.first_name.localeCompare(b.first_name);
      }
      return lastNameComparison;
    });
  const driver = data?.data
    .filter((item) => {
      return item.member_status === 'DRIVER';
    })
    .sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      if (lastNameComparison === 0) {
        return a.first_name.localeCompare(b.first_name);
      }
      return lastNameComparison;
    });
  const sub_driver = data?.data
    .filter((item) => {
      return item.member_status === 'SUBTITUTE_DRIVER';
    })
    .sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      if (lastNameComparison === 0) {
        return a.first_name.localeCompare(b.first_name);
      }
      return lastNameComparison;
    });
  const barker = data?.data
    .filter((item) => {
      return item.member_status === 'BARKER';
    })
    .sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      if (lastNameComparison === 0) {
        return a.first_name.localeCompare(b.first_name);
      }
      return lastNameComparison;
    });
  const regular_member = data?.data
    .filter((item) => {
      return item.member_status === 'REGULAR_MEMBER';
    })
    .sort((a, b) => {
      const lastNameComparison = a.last_name.localeCompare(b.last_name);
      if (lastNameComparison === 0) {
        return a.first_name.localeCompare(b.first_name);
      }
      return lastNameComparison;
    });
  const handleGetTotal = () => {
    const newItem = newamountRef.current.filter((item) => item.el.value);
    const shareCapital = newItem.filter((item) => {
      console.log(item);
      return (
        item.item.member_status === 'OPERATOR' ||
        item.item.member_status === 'ASSOCIATE_OPERATOR' ||
        item.item.member_status === 'DRIVER'
      );
    });
    const subDriver = newItem.filter((item) => {
      console.log(item);
      return item.item.member_status === 'SUBTITUTE_DRIVER';
    });
    const barker = newItem.filter((item) => {
      console.log(item);
      return item.item.member_status === 'BARKER';
    });
    const totalShareCapital = shareCapital.reduce((total, item) => {
      return total + parseInt(item.el.value);
    }, 0);
    const totalSubDriver = subDriver.reduce((total, item) => {
      return total + parseInt(item.el.value);
    }, 0);
    const totalBarker = barker.reduce((total, item) => {
      return total + parseInt(item.el.value);
    }, 0);
    setShareCapitalTotalAmount(totalShareCapital);
    setSubDriverTotalAmount(totalSubDriver);
    setBarkerTotalAmount(totalBarker);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      newamountRef.current[operatorFocusId].el.focus();
      setOperatorFocusId((prev) => prev + 1);
    }
  };
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
            <Button colorScheme='whatsapp' onClick={() => handleGetTotal()}>
              Get Total
            </Button>
          </HStack>
          <Heading size='md'>Share Capital: {shareCapitaltotalAmount}</Heading>
          <Heading size='md'>Sub Driver: {subDriverTotalAmount}</Heading>
          <Heading size='md'>Barker: {barkerTotalAmount}</Heading>
          <Grid templateColumns='repeat(6, 1fr)' gap={4}>
            <VStack alignItems='start'>
              <h1>OPERATORS</h1>
              {operators?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      onClick={() => setOperatorFocusId(index)}
                      onKeyDown={(e) => handleKeyDown(e)}
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
              <h1>ASSOCIATE OPERATORS</h1>
              {asso_operators?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      onClick={() =>
                        setOperatorFocusId(index + operators.length)
                      }
                      onKeyDown={(e) => handleKeyDown(e)}
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) =>
                        (newamountRef.current[index + operators.length] = {
                          el,
                          item,
                        })
                      }
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              <h1>REGULAR DRIVERS</h1>
              {driver?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      onClick={() =>
                        setOperatorFocusId(
                          index + asso_operators.length + operators.length
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(e)}
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) =>
                        (newamountRef.current[
                          index + asso_operators.length + operators.length
                        ] = {
                          el,
                          item,
                        })
                      }
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              <h1>SUBTITUTE DRIVERS</h1>
              {sub_driver?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      onClick={() =>
                        setOperatorFocusId(
                          index +
                            driver.length +
                            asso_operators.length +
                            operators.length
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(e)}
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) =>
                        (newamountRef.current[
                          index +
                            driver.length +
                            asso_operators.length +
                            operators.length
                        ] = {
                          el,
                          item,
                        })
                      }
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              <h1>BARKERS</h1>
              {barker?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      onClick={() =>
                        setOperatorFocusId(
                          index +
                            sub_driver.length +
                            driver.length +
                            asso_operators.length +
                            operators.length
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(e)}
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) =>
                        (newamountRef.current[
                          index +
                            sub_driver.length +
                            driver.length +
                            asso_operators.length +
                            operators.length
                        ] = {
                          el,
                          item,
                        })
                      }
                    />
                  </HStack>
                );
              })}
            </VStack>
            <VStack alignItems='start'>
              <h1>REGULAR MEMBERS</h1>
              {regular_member?.map((item, index) => {
                return (
                  <HStack w={300} justifyContent='space-between' key={index}>
                    <span>{`${item.last_name} ${item.first_name}`}</span>
                    <Input
                      onClick={() =>
                        setOperatorFocusId(
                          index +
                            barker.length +
                            sub_driver.length +
                            driver.length +
                            asso_operators.length +
                            operators.length
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(e)}
                      placeholder='Amount'
                      size='sm'
                      width={20}
                      ref={(el) =>
                        (newamountRef.current[
                          index +
                            barker.length +
                            sub_driver.length +
                            driver.length +
                            asso_operators.length +
                            operators.length
                        ] = {
                          el,
                          item,
                        })
                      }
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
