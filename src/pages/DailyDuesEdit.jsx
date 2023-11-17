import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Toaster } from 'react-hot-toast';
import {
  Spinner,
  Heading,
  Button,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Input,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import moment from 'moment';

import DailyDuesEditTable from '../components/DailyJues/DailyDuesEditTable';
const DailyDuesEdit = () => {
  // const dateNow = moment().format('YYYY-MM-DD');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/?date=${date}&page=${page}&search=${search}`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['dailyDuesEdit', { page: page, search: search, date: date }],
        () => {
          return data;
        }
      );
    },
  });
  const { data, status } = useQuery({
    queryKey: ['dailyDuesEdit', { page: page, search: search, date: date }],
    // keepPreviousData: true,
    queryFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/?date=${date}&page=${page}&search=${search}`
      );
    },
  });
  const handleChangeDate = (value) => {
    console.log(value);
    setDate(value);
    mutate();
  };
  const handleSearch = (e) => {
    setSearch(e);
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
  return (
    <AdminLayout>
      <Heading> Daily Dues</Heading>
      <Toaster position='top-right' reverseOrder={false} />
      <Input type='date' onChange={(e) => handleChangeDate(e.target.value)} />
      <Editable defaultValue='Search' onSubmit={(e) => handleSearch(e)}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && <DailyDuesEditTable data={data.data} />}
      <Button colorScheme='blue' onClick={() => handlePrevPage()}>
        Previous
      </Button>
      <Button colorScheme='blue' onClick={() => handleNextPage()}>
        Next
      </Button>
    </AdminLayout>
  );
};

export default DailyDuesEdit;
