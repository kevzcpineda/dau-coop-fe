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
        <Grid
          templateColumns='repeat(2, 1fr)'
          gap={6}
          sx={{ paddingBottom: '100px' }}>
          <FormControl isReadOnly={true}>
            <FormLabel>{year - 1}</FormLabel>
            <Input
              placeholder={data.data.year}
              sx={{
                backgroundColor: 'gray.100',
                fontSize: '20px',
                // fontWeight: '500',
              }}
              _placeholder={{ color: 'black' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>January</FormLabel>
            <Input
              placeholder={data.data.january}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
              _placeholder={{ color: 'black' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Febuary</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.febuary}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>March</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.march}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>April</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.april}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>May</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.may}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>June</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.june}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>July</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.july}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>August</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.august}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>September</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.september}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>October</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.october}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>November</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.november}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>December</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.december}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Total Of {year}</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.total}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
          <FormControl isReadOnly={true}>
            <FormLabel>Total Capital Share</FormLabel>
            <Input
              _placeholder={{ color: 'black' }}
              placeholder={data.data.total_capital_share}
              sx={{ backgroundColor: 'gray.100', fontSize: '20px' }}
            />
          </FormControl>
        </Grid>
      )}
    </UserLayout>
  );
};

export default UserShareCapital;
