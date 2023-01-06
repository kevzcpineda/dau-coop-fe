import React, { useContext, useEffect, useState, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
import YearPicker from 'react-year-picker';
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

  const fetchDailyJues = async () => {
    await getDailyJues(2023);
  };

  const { status } = useQuery('dailyJues', fetchDailyJues);

  console.log(status);

  return (
    <AdminLayout>
      <Box>
        <Heading>Daily Jues</Heading>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && <DailyJuesTable />}
      </Box>
    </AdminLayout>
  );
};

export default DailyJues;
