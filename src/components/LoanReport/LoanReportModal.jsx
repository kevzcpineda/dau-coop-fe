import React, { useContext, useState } from 'react';
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
import AuthContext from '../../context/AuthContext';
import LoanReportModalTable from './LoanReportModalTable';
import toast, { Toaster } from 'react-hot-toast';

const LoanReportModal = ({ isOpen, onClose, loanReportId }) => {
  const { getLoanReportDetail } = useContext(AuthContext);
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const [isEdit, setIsEdit] = useState(true);
  const [payments, setPayments] = useState();
  const { data, status } = useQuery({
    queryKey: ['loanPaymetsReport', loanReportId],
    queryFn: () => getLoanReportDetail(loanReportId),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => {
      return axios.put(
        `${baseURL}/loan/reportDetail/?reportId=${data?.data?.id}`,
        payload
      );
    },
    onSuccess: (data, variables) => {
      console.log('Success');
      setIsEdit((prev) => !prev);
      toast.success('Successfully Changed ');
    },
  });
  console.log('payments', payments);
  const handleMutate = () => {
    const payload = {
      payments: payments,
    };
    mutate(payload);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='full'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Loan Payment Log</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {status === 'loading' && <Spinner />}
          {status === 'error' && <div>error...</div>}
          {status === 'success' && (
            <LoanReportModalTable
              data={data.data}
              isEdit={isEdit}
              setPayments={setPayments}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => handleMutate()}
            colorScheme='blue'
            mr={3}
            display={isEdit ? 'none' : 'inline-flex'}>
            Save
          </Button>
          <Button
            colorScheme='blue'
            mr={3}
            display={isEdit ? 'none' : 'inline-flex'}
            onClick={() => setIsEdit((prev) => !prev)}>
            Cancel
          </Button>
          <Button
            display={isEdit ? 'inline-flex' : 'none'}
            colorScheme='blue'
            mr={3}
            onClick={() => setIsEdit((prev) => !prev)}>
            Edit
          </Button>

          <Button
            colorScheme='blue'
            mr={3}
            onClick={onClose}
            display={isEdit ? 'inline-flex' : 'none'}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoanReportModal;
