import React, {
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import '../components/pdf/styles/loan.css';
import AdminLayout from '../components/AdminLayout';
import LoanReportTable from '../components/LoanReport/LoanReportTable';
import { useReactToPrint } from 'react-to-print';
import { Box, Heading, Spinner, Button } from '@chakra-ui/react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import AuthContext from '../context/AuthContext';
import LoanReportPdf from '../components/pdf/LoanReportPdf';

const LoanReport = () => {
  const printRef = useRef(null);
  const promiseResolveRef = useRef(null);
  const [loanReports, setLoanReports] = useState(null);
  const { getLoanReport } = useContext(AuthContext);
  const [isPrinting, setIsPrinting] = useState(false);
  const { data, status } = useQuery('loan_report', getLoanReport);
  const queryClient = useQueryClient();
  // const {
  //   data: reportData,
  //   isLoading,
  //   mutate,
  // } = useMutation(loanPayment, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('loan');
  //   },
  // });
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const reactToPrintContent = useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

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

  const print = async (data) => {
    setLoanReports(data);
    handlePrint();
  };
  // console.log(loanReports);
  return (
    <AdminLayout>
      {loanReports && <LoanReportPdf ref={printRef} data={loanReports} />}
      <Box>
        <Heading>Loan Report</Heading>
        <Button href='/add-loan-reports'>Add</Button>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && <LoanReportTable data={data} print={print} />}
      </Box>
    </AdminLayout>
  );
};

export default LoanReport;
