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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
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
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import moment from 'moment';

const DailyJues = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { getLedger } = useContext(AuthContext);
  const dateNow = moment().format('L').split('/');
  const yearNow = dateNow[2];
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [year, setYear] = useState(yearNow);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ['legger', { year: year, page: page, search: search }],
    queryFn: () => getLedger(year, page, search),
    keepPreviousData: true,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/ledger/?year=${year}&page=${page}&search=${search}`
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['legger', { year: year, page: page, search: search }],
        data
      );
    },
  });

  const handleChange = (datechange) => {
    setYear(datechange);
    mutate();
  };
  const handleNextPage = () => {
    setPage((prev) => {
      return prev + 1;
    });
    mutate();
  };
  const handlePrevPage = () => {
    setPage((prev) => {
      return prev - 1;
    });
    mutate();
  };
  const handleSearch = (e) => {
    setSearch(e);
    mutate();
  };
  return (
    <AdminLayout>
      <Box>
        <Editable defaultValue='Search' onSubmit={(e) => handleSearch(e)}>
          <EditablePreview />
          <EditableInput />
        </Editable>
        <input
          type='date'
          onChange={(e) => handleChange(e.target.value.slice(0, 4))}></input>
        <Heading>Daily Dues</Heading>
        {/* {isLoading && <Spinner />} */}
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && <DailyJuesTable data={data.data.results} />}
      </Box>
      <Button
        onClick={() => handlePrevPage()}
        isLoading={isLoading}
        isDisabled={data?.data?.previous === null}>
        Previous
      </Button>
      <Button
        onClick={() => handleNextPage()}
        isLoading={isLoading}
        isDisabled={data?.data?.next === null}>
        Next
      </Button>
    </AdminLayout>
  );
};

export default DailyJues;
