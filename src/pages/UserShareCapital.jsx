import React, { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import AuthContext from '../context/AuthContext';
import {
  FormControl,
  FormLabel,
  Text,
  Spinner,
  Input,
  Grid,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import UserLayout from '../components/UserLayout';

const UserShareCapital = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const dateNow = moment().format('L').split('/');
  const momentYear = dateNow[2];
  const [year, setYear] = useState(momentYear);
  const queryClient = useQueryClient();
  const { userMonthShareCapital, accessToken } = useContext(AuthContext);

  const { data, status } = useQuery({
    queryKey: [
      'userMonthShareCapital',
      {
        year: year,
      },
    ],

    queryFn: () => userMonthShareCapital(year),
    keepPreviousData: true,
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/user-monthly-capital-share/?year=${year}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['userMonthShareCapital', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  const handleChangeDate = ([year, month, day]) => {
    setYear(year);
    mutate();
  };
  return (
    <UserLayout>
      {status === 'loading' && (
        <Flex alignItems='center' justifyContent='center' height='100vh'>
          <Spinner
            thickness='10px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            style={{ width: '150px', height: '150px' }}
          />
        </Flex>
      )}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <FormControl isReadOnly={true}>
            <FormLabel>{year - 1}</FormLabel>
            <Input placeholder={data.data.year} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>January</FormLabel>
            <Input placeholder={data.data.january} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Febuary</FormLabel>
            <Input placeholder={data.data.febuary} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>March</FormLabel>
            <Input placeholder={data.data.march} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>April</FormLabel>
            <Input placeholder={data.data.april} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>May</FormLabel>
            <Input placeholder={data.data.may} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>June</FormLabel>
            <Input placeholder={data.data.june} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>July</FormLabel>
            <Input placeholder={data.data.july} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>August</FormLabel>
            <Input placeholder={data.data.august} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>September</FormLabel>
            <Input placeholder={data.data.september} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>October</FormLabel>
            <Input placeholder={data.data.october} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>November</FormLabel>
            <Input placeholder={data.data.november} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>December</FormLabel>
            <Input placeholder={data.data.december} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Total Of {year}</FormLabel>
            <Input placeholder={data.data.total} />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Total Capital Share</FormLabel>
            <Input placeholder={data.data.total_capital_share} />
          </FormControl>
        </Grid>
      )}
    </UserLayout>
  );
};

export default UserShareCapital;
