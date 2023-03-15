import React, {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';

import { useReactToPrint } from 'react-to-print';
import AdminLayout from '../components/AdminLayout';
import DailyDuesReportTable from '../components/DailyDuesReport/DailyDuesReportTable';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import AuthContext from '../context/AuthContext';
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
import Pdf from '../components/pdf/DailyDuesPdf';
const DailyDuesReport = () => {
  const printRef = useRef(null);
  const promiseResolveRef = useRef(null);
  const [dailyDuesReports, setDailyDuesReports] = useState(null);
  const { getDailyDuesReport } = useContext(AuthContext);
  const { data, status } = useQuery('daily_dues_report', getDailyDuesReport);
  const [isPrinting, setIsPrinting] = useState(false);

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
    setDailyDuesReports(data);
    handlePrint();
  };

  return (
    <AdminLayout>
      {dailyDuesReports && <Pdf ref={printRef} data={dailyDuesReports} />}

      <Box>
        <Heading>Daily Dues Report</Heading>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && (
          <DailyDuesReportTable data={data} print={print} />
        )}
      </Box>
    </AdminLayout>
  );
};

export default DailyDuesReport;
