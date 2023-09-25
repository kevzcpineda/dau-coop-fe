import React, { useContext, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Spinner,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
const DaysShareCapitalTable = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const [page, setPage] = useState(1);
  // const splitDate = date?.split('-');
  const dateNow = moment().format('L').split('/');
  const momentYear = dateNow[2];
  const momentMonth = dateNow[0];
  const [month, setMonth] = useState(momentMonth);
  const [year, setYear] = useState(momentYear);
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { paginateDayShareCapital } = useContext(AuthContext);

  const { data: paginateShareCapitalData, status: paginateShareCapitalStatus } =
    useQuery({
      queryKey: [
        'paginateShareCapital',
        {
          year: year,
          month: month,
          page: page,
          search: search,
        },
      ],

      queryFn: () => paginateDayShareCapital(year, month, page, search),
      keepPreviousData: true,
    });

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/paginated-day-capital-share/?year=${year}&month=${month}&page=${page}&search=${search}`
      );
    },
    onSuccess: (data, variables) => {
      console.log('page', page);
      console.log('variables', variables);
      queryClient.setQueryData(
        [
          'paginateShareCapital',
          { year: year, month: month, page: page, search: search },
        ],
        data
      );
    },
  });

  const handleNextPage = () => {
    // setPage((prev) => {
    //   return prev + 1;
    // });

    mutate(page + 1);
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage((prev) => {
      return prev - 1;
    });
    mutate();
  };
  const handleChangeDate = async (e) => {
    const splitDate = e.split('-');
    console.log(splitDate);
    setYear(splitDate[0]);
    setMonth(splitDate[1]);
    mutate();
  };
  const handleSearch = async (e) => {
    setSearch(e);
    mutate();
  };
  return (
    <>
      {paginateShareCapitalStatus === 'loading' && <Spinner />}
      {paginateShareCapitalStatus === 'error' && <div>error...</div>}
      {paginateShareCapitalStatus === 'success' && (
        <TableContainer>
          <Editable
            defaultValue='Search'
            onSubmit={(e) => {
              handleSearch(e);
            }}>
            <EditablePreview />
            <EditableInput />
          </Editable>
          <input
            type='date'
            onChange={(e) => handleChangeDate(e.target.value)}
          />
          <Table variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Names</Th>
                <Th>1</Th>
                <Th>2</Th>
                <Th>3</Th>
                <Th>4</Th>
                <Th>5</Th>
                <Th>6</Th>
                <Th>7</Th>
                <Th>8</Th>
                <Th>9</Th>
                <Th>10</Th>
                <Th>11</Th>
                <Th>12</Th>
                <Th>13</Th>
                <Th>14</Th>
                <Th>15</Th>
                <Th>16</Th>
                <Th>17</Th>
                <Th>18</Th>
                <Th>19</Th>
                <Th>20</Th>
                <Th>21</Th>
                <Th>22</Th>
                <Th>23</Th>
                <Th>24</Th>
                <Th>25</Th>
                <Th>26</Th>
                <Th>27</Th>
                <Th>28</Th>
                <Th>29</Th>
                <Th>30</Th>
                <Th>31</Th>
                <Th>total</Th>
                <Th>operation fee</Th>
                <Th>share capital</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginateShareCapitalData?.data?.results?.map((item, index) => {
                return (
                  <Tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${item.last_name} ${item.first_name}`}</td>
                    <td>{item.day1}</td>
                    <td>{item.day2}</td>
                    <td>{item.day3}</td>
                    <td>{item.day4}</td>
                    <td>{item.day5}</td>
                    <td>{item.day6}</td>
                    <td>{item.day7}</td>
                    <td>{item.day8}</td>
                    <td>{item.day9}</td>
                    <td>{item.day10}</td>
                    <td>{item.day11}</td>
                    <td>{item.day12}</td>
                    <td>{item.day13}</td>
                    <td>{item.day14}</td>
                    <td>{item.day15}</td>
                    <td>{item.day16}</td>
                    <td>{item.day17}</td>
                    <td>{item.day18}</td>
                    <td>{item.day19}</td>
                    <td>{item.day20}</td>
                    <td>{item.day21}</td>
                    <td>{item.day22}</td>
                    <td>{item.day23}</td>
                    <td>{item.day24}</td>
                    <td>{item.day25}</td>
                    <td>{item.day26}</td>
                    <td>{item.day27}</td>
                    <td>{item.day28}</td>
                    <td>{item.day29}</td>
                    <td>{item.day30}</td>
                    <td>{item.day31}</td>
                    <td>{item.total}</td>
                    <td>{item.total / 2}</td>
                    <td>{item.total / 2}</td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Button
        onClick={() => handlePrevPage()}
        isDisabled={paginateShareCapitalData?.data?.previous === null}
        isLoading={isLoading}>
        previous
      </Button>
      <Button
        onClick={() => handleNextPage()}
        isDisabled={paginateShareCapitalData?.data?.next === null}
        isLoading={isLoading}>
        next
      </Button>
    </>
  );
};

export default DaysShareCapitalTable;
