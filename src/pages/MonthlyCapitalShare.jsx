import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import AuthContext from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Heading,
  Button,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';
import { useReactToPrint } from 'react-to-print';
import MonthlyCapitalSharePdf from '../components/pdf/MonthlyCapitalSharePdf';
import MonthlyShareCapitalTable from '../components/DailyJues/MonthlyShareCapitalTable';

const MonthlyCapitalShare = () => {
  const queryClient = useQueryClient();
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { getDailyCapitalShare } = useContext(AuthContext);
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);
  const printRef = useRef();
  const dateNow = moment().format('L').split('/');
  const yearNow = dateNow[2];
  const [year, setYear] = useState(yearNow);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  // const { data, status } = useQuery({
  //   queryKey: ['dailyCapitalShare'],
  //   queryFn: getDailyCapitalShare,
  // });
  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/paginated-monthly-capital-share/?year=${year}&page=${page}&search=${search}`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [
          'paginatedMonthlyShareCapital',
          { year: year, page: page, search: search },
        ],
        () => {
          return data;
        }
      );
    },
  });
  const reactToPrintContent = useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);
  const handlePrint = useReactToPrint({
    content: () => reactToPrintContent(),
    pageStyle: ' @page { size: landscape; }',
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  const print = () => {
    handlePrint();
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
  const handleChangeDate = ([year, month, day]) => {
    setYear(year);
    mutate();
  };
  const handleSearch = (e) => {
    setSearch(e);
    mutate();
  };
  return (
    <AdminLayout>
      <MonthlyCapitalSharePdf ref={printRef} />
      <Toaster position='top-right' reverseOrder={false} />
      <Box>
        <Heading>Monthly Capital Share</Heading>
      </Box>
      <Editable defaultValue='Search' onSubmit={(e) => handleSearch(e)}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Button onClick={() => print()}>Print</Button>
      <input
        type='date'
        onChange={(e) => handleChangeDate(e.target.value.split('-'))}
      />
      <MonthlyShareCapitalTable
        year={year}
        page={page}
        search={search}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        isLoading={isLoading}
      />
    </AdminLayout>
  );
};

export default MonthlyCapitalShare;
