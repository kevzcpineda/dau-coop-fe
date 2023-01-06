import React, { useContext, useEffect, useState, useRef } from 'react';
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
import LoanTable from '../components/Loan/LoanTable';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const Loans = () => {
  const { getUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [id, setId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [ticket, setTicket] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getLoans, loans, loanPayment } = useLoan((state) => state);
  const filterLoan = loans.filter((item) => item.balance === 0);

  const handlePaymentModal = (id) => {
    onOpen();
    setId(id);
  };

  const handlePayment = async () => {
    await loanPayment(id, amount, ticket);
    onClose();
  };
  const printRef = useRef();

  const toPrint = useReactToPrint({
    content: () => printRef.current,
  });

  const print = async (user) => {
    // const response = await getUser(id);
    await setUser(user);
    toPrint();
    // console.log(user);
  };

  const { data, status } = useQuery('loan', getLoans);

  return (
    <AdminLayout>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Lasr Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>kevin</Td>
                  <Td>sdkjfbsd</Td>
                  <Td>asdasd</Td>
                  <Td>asdasd</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          {/* <h1>keivn</h1> */}
        </div>
      </div>

      {isOpen && (
        <PaymentModal
          isOpen={isOpen}
          onClose={onClose}
          setAmount={setAmount}
          setTicket={setTicket}
          handlePayment={handlePayment}
        />
      )}

      <Box>
        <Heading>Loans</Heading>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && (
          <LoanTable
            handlePaymentModal={handlePaymentModal}
            print={print}
            filterLoan={filterLoan}
          />
        )}
      </Box>
    </AdminLayout>
  );
};

export default Loans;
