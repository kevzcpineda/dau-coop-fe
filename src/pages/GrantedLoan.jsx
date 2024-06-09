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
  Editable,
  EditableInput,
  EditablePreview,
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
import ReducePenaltyModal from '../components/Loan/ReducePenaltyModal';
import LoanTable from '../components/Loan/LoanTable';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import axios from 'axios';
import Papa from 'papaparse';
import toast, { Toaster } from 'react-hot-toast';
const Loans = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const mutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/createUser/`, payload);
    },
  });

  const { mutate: loanMutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/loan/`, payload);
    },
  });

  const { mutate: penaltyLoanMutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/loan/penalty/`, payload);
    },
  });
  const { mutate: paymentsLoanMutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/loan/payments/`, payload);
    },
  });
  const { mutate: mutateJeeps } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/createJeep/`, payload);
    },
  });

  const [isPrinting, setIsPrinting] = useState(false);
  const [search, setSearch] = useState('');
  const promiseResolveRef = useRef(null);
  const {
    getUser,
    getLoanPayments,
    getLoans,
    postLoanPayments,
    grantedLoan,
    filterDoneLoan,
    searchGrantedLoan,
  } = useContext(AuthContext);
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
  const [doneLoanPage, setDoneLoanPage] = useState(1);
  const [grantedLoanPage, setGrantedLoanPage] = useState(1);

  const { data: grantedLoanData, status: pendingLoanStatus } = useQuery({
    queryKey: [
      'loans',
      {
        page: grantedLoanPage,
        search: search,
      },
    ],
    queryFn: () => {
      return axios.get(
        `${baseURL}/loan/loan_optimize/?status=GRANTED&page=${grantedLoanPage}&search=${search}`
      );
    },
    keepPreviousData: true,
  });
  const { data: loanDoneData, status: loanDoneStatus } = useQuery({
    queryKey: ['doneloans', doneLoanPage],
    queryFn: () => filterDoneLoan(doneLoanPage),
    keepPreviousData: true,
  });
  const { data: usersData, status: userStatus } = useQuery({
    queryKey: ['usersData'],
    queryFn: () => {
      return axios.get(`${baseURL}/createUser/`);
    },
  });

  const { data: unparseLoan, status: unParseStatus } = useQuery({
    queryKey: ['unparseLoan'],
    queryFn: () => {
      return axios.get(`${baseURL}/loan/`);
    },
  });

  const { loans, loanPayment } = useLoan((state) => state);

  // const { mutate: exlLoanPayments } = useMutation(postLoanPayments);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(loanPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('loan');
    },
  });
  const handleGetLoanPayments = async (id) => {
    const response = await getLoanPayments(id);
    setUserLoanPayments(response);
  };
  // const {
  //   data: loanUserPayments,
  //   mutate: mutateLoanUserPayments,
  //   isSuccess,
  // } = useMutation(getLoanPayments);

  const handlePaymentModal = (id) => {
    onOpen();
    setId(id);
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
    onBeforeGetContent: () => {
      // mutateLoanUserPayments();
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

  const print = async (e, user) => {
    // const response = await getUser(id);
    e.stopPropagation();
    await setLoanId(user.id);
    await setUser(user);
    // await mutateLoanUserPayments();
    await handleGetLoanPayments(user.id);
    toPrint('toprint');
  };
  const handlePaymentLogModal = (id) => {
    setLoanId(id);
    onOpenLog();
  };

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
      const a = results.data.filter((item) => {
        return item.first_name !== null;
      });
      console.log(a);
      mutation.mutate(a);
      toast.success('Successfully toasted!');
    },
    error: (results, file) => {
      toast.error('Error');
    },
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    skipEmptyLines: true,
  };
  const importUserLoanconfig = {
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
      const data = results.data.filter((item) => {
        return item.loan !== null;
      });
      console.log(data);
      loanMutate(data);
      toast.success('Successfully toasted!');
    },
    error: (results, file) => {
      toast.error('Error');
    },
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    skipEmptyLines: true,
  };
  const importLoanPenaltyconfig = {
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
      const a = results.data.filter((item) => {
        return item.loan_id !== null;
      });
      console.log(a);
      penaltyLoanMutate(a);
      toast.success('Successfully toasted!');
    },
    error: (results, file) => {
      toast.error('Error');
    },
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    skipEmptyLines: true,
  };
  const importLoanPeymentsconfig = {
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
      const data = results.data.filter((item) => {
        return item.amount !== null;
      });
      console.log(data);
      paymentsLoanMutate(data);
      toast.success('Successfully toasted!');
    },
    error: (results, file) => {
      toast.error('Error');
    },
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    skipEmptyLines: true,
  };
  const importJeepsConfig = {
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
      const data = results.data.filter((item) => {
        return item.user_id !== null;
      });
      console.log('dattaaaa', data);
      mutateJeeps(data);
      toast.success('Successfully toasted!');
    },
    error: (results, file) => {
      toast.error('Error');
    },
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    skipEmptyLines: true,
  };
  // const parsepenaltyconfig = {
  //   delimiter: '', // auto-detect
  //   newline: '', // auto-detect
  //   quoteChar: '"',
  //   escapeChar: '"',
  //   header: true,
  //   transformHeader: undefined,
  //   dynamicTyping: true,
  //   preview: 0,
  //   encoding: '',
  //   worker: false,
  //   comments: false,
  //   step: undefined,
  //   complete: function (results, file) {
  //     exlLoanPayments(results.data);
  //     toast.success('Successfully toasted!');
  //   },
  //   error: (results, file) => {
  //     toast.error('Error');
  //   },
  //   delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
  // };

  const handleParse = () => {
    const value = Papa.parse(csv, parseconfig);
  };
  const handleImportUserLoan = () => {
    const value = Papa.parse(csv, importUserLoanconfig);
  };
  const handleImportLoanPenalty = () => {
    const value = Papa.parse(csv, importLoanPenaltyconfig);
  };
  const handleImportLoanPayments = () => {
    const value = Papa.parse(csv, importLoanPeymentsconfig);
  };
  const handleImportJeeps = () => {
    const value = Papa.parse(csv, importJeepsConfig);
  };
  // const handleParsePenalty = () => {
  //   const value = Papa.parse(csv, parsepenaltyconfig);
  // };
  const handleUnparse = () => {
    const userDataFiltered = usersData.data.map((obj) => {
      const {
        password,
        is_active,
        is_staff,
        is_change_password,
        sss_no,
        philhealth_no,
        blood_type,
        weight,
        height,
        driver_license_no,
        civil_status,
        date_of_membership,
        phone_no,
        home_address,
        gender,
        image,
        birth_date,
        age,
        is_superuser,
        last_login,
        daily_jues,
        jeep_id,
        user_permissions,
        groups,
        ...rest
      } = obj;
      return rest;
    });
    const value = Papa.unparse(userDataFiltered, unparseConfig);
    console.log('unparse', value);
  };
  const handleUnparseLoan = () => {
    const userDataFiltered = unparseLoan.data.map((obj) => {
      const {
        interest,
        service_fee,
        net_amount,
        loan,
        voucher_number,
        check_number,
        promissory_note_number,
        ...rest
      } = obj;
      return rest;
    });
    const value = Papa.unparse(userDataFiltered, unparseConfig);
    console.log('unparse', value);
  };
  // console.log(pendingLoanData);
  // console.log('loanDoneData', loanDoneData);
  const { mutateSearch, isLoadingSearch } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/loan/loan_optimize/?status=GRANTED&page=${grantedLoanPage}&search=${search}`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['loans', { page: page, search: search }],
        () => {
          return data;
        }
      );
    },
  });
  const handleSearch = (e) => {
    setSearch(e);
    // mutateSearch;
  };
  const handleNextPage = () => {
    setGrantedLoanPage((prev) => {
      return prev + 1;
    });
    // mutateSearch();
  };
  const handlePrevPage = () => {
    setGrantedLoanPage((prev) => {
      return prev - 1;
    });
    // mutateSearch();
  };
  const {
    isOpen: reducePenaltyIsOpen,
    onOpen: reducePenaltyOnOpen,
    onClose: reducePenaltyOnClose,
  } = useDisclosure();

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

      {isOpenLog && (
        <PaymentLogModal
          isOpen={isOpenLog}
          onClose={onCloseLog}
          loanId={loanId}
        />
      )}

      <Box>
        <Heading>Granted Loans</Heading>
        <Editable
          defaultValue='Search'
          onSubmit={(e) => {
            handleSearch(e);
          }}>
          <EditablePreview />
          <EditableInput />
        </Editable>
        {/* <Button onClick={() => handleParse()}>Import CSV Users</Button>
        <Button onClick={() => handleParsePenalty()}>
          Import CSV loan penalty
        </Button>
        {userStatus === 'success' && (
          <Button onClick={() => handleUnparse()}>Unparse Users</Button>
        )}
        {pendingLoanStatus === 'success' && (
          <Button onClick={() => handleUnparseLoan()}>Unparse Loan</Button>
        )}
        <Button onClick={() => handleImportUserLoan()}>
          Import users loan
        </Button>
        <Button onClick={() => handleImportLoanPenalty()}>
          Import loan penalty
        </Button>
        <Button onClick={() => handleImportLoanPayments()}>
          Import loan Payments
        </Button>
        <Button onClick={() => handleImportJeeps()}>Post Jeeps</Button>
        <Input type='file' onChange={(e) => setCsv(e.target.files[0])} /> */}

        {pendingLoanStatus === 'loading' && <Spinner />}

        {pendingLoanStatus === 'error' && <div>error...</div>}
        {pendingLoanStatus === 'success' && (
          <LoanTable
            handlePaymentModal={handlePaymentModal}
            print={print}
            loanData={grantedLoanData.data}
            handlePaymentLogModal={handlePaymentLogModal}
            setGrantedLoanPage={setGrantedLoanPage}
            setDoneLoanPage={setDoneLoanPage}
            grantedLoanPage={grantedLoanPage}
            doneLoanPage={doneLoanPage}
            setLoanId={setLoanId}
            reducePenaltyOnOpen={reducePenaltyOnOpen}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            isLoadingSearch={isLoadingSearch}
          />
        )}
        {/* {mutateSearch.isLoading ? (
          <Spinner />
        ) : (
          <>
            <Spinner />
            {mutateSearch.isError ? <div>error</div> : null}{' '}
            {mutateSearch.isSuccess ? (
              <LoanTable
                handlePaymentModal={handlePaymentModal}
                print={print}
                loanData={grantedLoanData.data}
                handlePaymentLogModal={handlePaymentLogModal}
                setGrantedLoanPage={setGrantedLoanPage}
                setDoneLoanPage={setDoneLoanPage}
                grantedLoanPage={grantedLoanPage}
                doneLoanPage={doneLoanPage}
              />
            ) : null}
          </>
        )} */}
      </Box>
      {reducePenaltyIsOpen && (
        <ReducePenaltyModal
          onClose={reducePenaltyOnClose}
          onOpen={reducePenaltyOnOpen}
          isOpen={reducePenaltyIsOpen}
          id={id}
        />
      )}
    </AdminLayout>
  );
};

export default Loans;
