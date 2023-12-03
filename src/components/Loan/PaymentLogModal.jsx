import React from 'react';
import {
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
} from '@chakra-ui/react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import axios from 'axios';
import PaymentLogModalTable from './PaymentLogModalTable';

const PaymentLogModal = ({ isOpen, onClose, loanId }) => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { data, status } = useQuery({
    queryKey: ['userLoanPayments', loanId],
    queryFn: () => {
      return axios.get(`${baseURL}/loan/user_payments/?loan_id=${loanId}`);
    },
  });
  const { data: penaltyData, status: penaltyStatus } = useQuery({
    queryKey: ['userLoanPenalty', loanId],
    queryFn: () => {
      return axios.get(`${baseURL}/loan/user_penalty/${loanId}/`);
    },
  });
  console.log(data);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='full'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Loan Payment Log</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {status === 'loading' && penaltyStatus === 'loading' && <Spinner />}
          {status === 'error' && penaltyStatus === 'error' && (
            <div>error...</div>
          )}
          {status === 'success' && penaltyStatus === 'success' && (
            <PaymentLogModalTable data={data} penaltyData={penaltyData} />
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentLogModal;
