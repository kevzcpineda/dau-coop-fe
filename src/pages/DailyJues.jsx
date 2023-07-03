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
import { useDailyJues } from '../states/Daily_jues';
import DailyJuesTable from '../components/DailyJues/DailyJuesTable';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const DailyJues = () => {
  const { getDailyJues } = useDailyJues((state) => state);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [date, setDate] = useState('2023');

  const queryClient = useQueryClient();

  const fetchDailyJues = async () => {
    await getDailyJues(date);
  };

  const changeDailyJues = async () => {
    await getDailyJues();
  };

  const { status } = useQuery(['dailyJues', date], fetchDailyJues);
  const { isLoading, mutate } = useMutation(getDailyJues, {
    onSuccess: () => {
      queryClient.setQueryData(['dailyJues'], date);
    },
  });
  console.log(status);

  const handleChange = (datechange) => {
    setDate(datechange);
    console.log(date);
    mutate(date);
  };
  return (
    <AdminLayout>
      <Box>
        <input
          type='date'
          onChange={(e) => handleChange(e.target.value.slice(0, 4))}></input>
        <Heading>Daily Dues</Heading>
        {/* {isLoading && <Spinner />} */}
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && <DailyJuesTable />}
      </Box>
    </AdminLayout>
  );
};

export default DailyJues;
