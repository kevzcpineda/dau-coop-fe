import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import AdminLayout from '../components/AdminLayout';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Box, Heading, Button, Spinner } from '@chakra-ui/react';
import { useReactToPrint } from 'react-to-print';
import DailyCapitalSharePdf from '../components/pdf/DailyCapitalSharePdf';
import DaysShareCapitalTable from '../components/DailyJues/DaysShareCapitalTable';
const DailyCapitalShare = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const queryClient = useQueryClient();
  const {
    getDailyCapitalShare,
    getDailyCapitalShareTotal,
    paginateDayShareCapital,
  } = useContext(AuthContext);
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);
  const printRef = useRef();
  const dateNow = moment().format('L').split('/');
  const momentYear = dateNow[2];
  const momentMonth = dateNow[0];
  // const [page, setPage] = useState(1);
  const [month, setMonth] = useState(momentMonth);
  const [year, setYear] = useState(momentYear);
  const { data: dailyCapitalShareData, status: dailyCapitalShareStatus } =
    useQuery({
      queryKey: ['dailyCapitalShare', year, month],
      queryFn: () => getDailyCapitalShare(year, month),
    });

  const {
    data: CapitalShareTotalOperatorData,
    status: CapitalShareTotalOperatorStatus,
  } = useQuery({
    queryKey: ['CapitalShareTotal', 'Operator'],
    queryFn: () => getDailyCapitalShareTotal(year, month, 'OPERATOR'),
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
  const operators = dailyCapitalShareData?.data.filter((item) => {
    return item.member_status === 'OPERATOR';
  });

  return (
    <AdminLayout>
      {dailyCapitalShareStatus === 'success' && (
        <DailyCapitalSharePdf
          ref={printRef}
          operator={operators}
          totalOperator={
            CapitalShareTotalOperatorData && CapitalShareTotalOperatorData.data
          }
        />
      )}
      <Toaster position='top-right' reverseOrder={false} />
      <Box>
        <Heading>Daily Capital Share</Heading>
        {dailyCapitalShareStatus === 'success' && (
          <Button onClick={() => print()}>Print</Button>
        )}
      </Box>
      <DaysShareCapitalTable
        setMonth={setMonth}
        setYear={setYear}
        month={month}
        year={year}
      />
    </AdminLayout>
  );
};

export default DailyCapitalShare;
