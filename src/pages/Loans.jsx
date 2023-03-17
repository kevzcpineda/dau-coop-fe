import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import dauLogo from '../assets/logo.png';
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
  Input,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react';
import { useUser } from '../states/User';
import { useLoan } from '../states/Loan';
import Paper from '../components/pdf/Paper';
import { useReactToPrint } from 'react-to-print';
import AuthContext from '../context/AuthContext';
import PaymentModal from '../components/Loan/PaymentModal';
import PaymentLogModal from '../components/Loan/PaymentLogModal';
import LoanTable from '../components/Loan/LoanTable';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import Papa from 'papaparse';
import toast, { Toaster } from 'react-hot-toast';
const Loans = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);
  const { getUser, getLoanPayments, getLoans, postLoanPayments } =
    useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loanId, setLoanId] = useState(null);
  const [id, setId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [csv, setCsv] = useState(null);
  const [file, setFile] = useState(null);
  const [userLoanPaymets, setUserLoanPayments] = useState([]);
  const [ticket, setTicket] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLog,
    onOpen: onOpenLog,
    onClose: onCloseLog,
  } = useDisclosure();
  const { data, status } = useQuery('loan', getLoans);
  const { loans, loanPayment } = useLoan((state) => state);
  const filterLoan = data?.filter((item) => item.is_fully_paid === true);
  const notDoneLoan = data?.filter((item) => item.is_fully_paid === false);
  const { mutate: exlLoanPayments } = useMutation(postLoanPayments);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(loanPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('loan');
    },
  });
  const handleGetLoanPayments = async () => {
    const response = await getLoanPayments(loanId);
    setUserLoanPayments(response)
  } 
  // const {
  //   data: loanUserPayments,
  //   mutate: mutateLoanUserPayments,
  //   isSuccess,
  // } = useMutation(getLoanPayments);

  const handlePaymentModal = (id) => {
    onOpen();
    setId(id);
  };

  const payload = {
    loan: id,
    amount: amount,
    ticket: ticket,
  };
  const handlePayment = async () => {
    await mutate(payload);
    onClose();
  };
  const printRef = useRef();
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const reactToPrintContent = useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const toPrint = useReactToPrint({
    content: () => reactToPrintContent(),
    removeAfterPrint: true,
    onBeforeGetContent: async () => {
      console.log("onBeforeGetContent")
      console.log(mes)
      await handleGetLoanPayments()
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onBeforePrint:() => {
      console.log("onBeforePrint")
    },
    onAfterPrint: () => {
      console.log("onAfterPrint")
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
    
  });

  const print = async (user) => {
    // const response = await getUser(id);

    console.log(user.id);
    setLoanId(user.id);
    setUser(user);
    // await mutateLoanUserPayments();
    toPrint("toprint");
    // console.log(user);
  };
  const handlePaymentLogModal = (id) => {
    console.log(id);
    onOpenLog();
  };

  console.log(data);
  const unparseConfig = {
    quotes: false, //or array of booleans
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ',',
    header: true,
    newline: '\r\n',
    skipEmptyLines: true, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
    columns: null, //or array of strings
  };
  const parseconfig = {
    delimiter: '', // auto-detect
    newline: '', // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: true,
    preview: 0,
    encoding: '',
    worker: false,
    comments: false,
    step: undefined,
    complete: function (results, file) {
      console.log('Parsing complete:', results, file);
      exlLoanPayments(results.data);
      toast.success('Successfully toasted!');
    },
    error: (results, file) => {
      toast.error('Error');
    },
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
  };
  const parsepenaltyconfig = {
    delimiter: '', // auto-detect
    newline: '', // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: true,
    preview: 0,
    encoding: '',
    worker: false,
    comments: false,
    step: undefined,
    complete: function (results, file) {
      console.log('Parsing complete:', results, file);
      exlLoanPayments(results.data);
      toast.success('Successfully toasted!');
    },
    error: (results, file) => {
      toast.error('Error');
    },
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
  };

  const handleParse = () => {
    const value = Papa.parse(csv, parseconfig);
    // console.log(value);
  };
  const handleParsePenalty = () => {
    const value = Papa.parse(csv, parsepenaltyconfig);
    // console.log(value);
  };
  const handleUnparse = () => {
    const value = Papa.unparse(data, unparseConfig);
    // const value = Papa.parse(csv, parseconfig);
    console.log(value);
  };
  return (
    <AdminLayout>
      <div>
        <Toaster position='top-right' reverseOrder={false} />
      </div>
      {userLoanPaymets && (
        <Paper ref={printRef} user={user} loanUserPayments={userLoanPaymets} />
      )}

      {isOpen && (
        <PaymentModal
          isOpen={isOpen}
          onClose={onClose}
          setAmount={setAmount}
          setTicket={setTicket}
          handlePayment={handlePayment}
        />
      )}

      {isOpenLog && <PaymentLogModal isOpen={isOpenLog} onClose={onCloseLog} />}

      <Box>
        <Heading>Loans</Heading>
        <Button onClick={() => handleParse()}>Import CSV loan payment</Button>
        <Button onClick={() => handleParsePenalty()}>
          Import CSV loan penalty
        </Button>
        <Button onClick={() => handleUnparse()}>Unparse</Button>
        <Input type='file' onChange={(e) => setCsv(e.target.files[0])} />

        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && (
          <LoanTable
            handlePaymentModal={handlePaymentModal}
            print={print}
            filterLoan={filterLoan}
            notDoneLoan={notDoneLoan}
            handlePaymentLogModal={handlePaymentLogModal}
          />
        )}
      </Box>
    </AdminLayout>
  );
};

export default Loans;
