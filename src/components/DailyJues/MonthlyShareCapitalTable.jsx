import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Button,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import AuthContext from '../../context/AuthContext';
const MonthlyShareCapitalTable = ({
  year,
  page,
  search,
  handlePrevPage,
  handleNextPage,
  isLoading,
}) => {
  console.log('year', year);
  const { paginateMonthShareCapital } = useContext(AuthContext);
  const { data: monthlyCapitalShareData, status: monthlyCapitalShareStatus } =
    useQuery({
      queryKey: [
        'paginatedMonthlyShareCapital',
        { page: page, search: search, year: year },
      ],
      keepPreviousData: true,
      queryFn: () => paginateMonthShareCapital(year, page, search),
    });
  console.log(monthlyCapitalShareData);
  return (
    <>
      {monthlyCapitalShareStatus === 'loading' && <Spinner />}
      {monthlyCapitalShareStatus === 'error' && <div>error...</div>}
      {monthlyCapitalShareStatus === 'success' && (
        <TableContainer>
          <Table variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>name</Th>
                <Th>year</Th>
                <Th>January</Th>
                <Th>february</Th>
                <Th>march</Th>
                <Th>april</Th>
                <Th>may</Th>
                <Th>june</Th>
                <Th>july</Th>
                <Th>august</Th>
                <Th>september</Th>
                <Th>october</Th>
                <Th>november</Th>
                <Th>december</Th>
                <Th>total</Th>
                <Th>total capital share</Th>
              </Tr>
            </Thead>
            <Tbody>
              {monthlyCapitalShareData?.data?.results?.map((item, index) => {
                return (
                  <Tr key={index}>
                    <td>{item.id}</td>
                    <td>{`${item.last_name} ${item.first_name}`}</td>
                    <td>{item.year}</td>
                    <td>{item.january}</td>
                    <td>{item.febuary}</td>
                    <td>{item.march}</td>
                    <td>{item.april}</td>
                    <td>{item.may}</td>
                    <td>{item.june}</td>
                    <td>{item.july}</td>
                    <td>{item.august}</td>
                    <td>{item.september}</td>
                    <td>{item.october}</td>
                    <td>{item.november}</td>
                    <td>{item.december}</td>
                    <td>{item.total}</td>
                    <td>{item.total_capital_share}</td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Button
        onClick={() => handlePrevPage()}
        isLoading={isLoading}
        isDisabled={monthlyCapitalShareData?.data?.previous === null}>
        Previous
      </Button>
      <Button
        onClick={() => handleNextPage()}
        isLoading={isLoading}
        isDisabled={monthlyCapitalShareData?.data?.next === null}>
        Next
      </Button>
    </>
  );
};

export default MonthlyShareCapitalTable;
