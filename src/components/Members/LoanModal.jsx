import React, { useRef } from 'react';
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
  Select,
} from '@chakra-ui/react';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import axios from 'axios';
const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
const LoanModal = ({ id, isOpen, onClose }) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/loan/`, payload);
    },
    onError: (error, variables, context) => {
      toast.error(`Error ${error} `);
    },
    onSuccess: () => {
      amount.current.value = '';
      voucher.current.value = '';
      check.current.value = '';
      promissory.current.value = '';
      status.current.value = '';
      onClose();
      toast.success('Loan Successfully!');
    },
  });
  const amount = useRef();
  const voucher = useRef();
  const check = useRef();
  const promissory = useRef();
  const status = useRef();

  const loanSchema = z.object({
    loan: z.number(),
    voucher_number: z.string(),
    check_number: z.string().optional().nullable(),
    promissory_note_number: z.string().optional().nullable(),
    status: z.string(),
  });
  const submitLoan = () => {
    const loanValidate = loanSchema.safeParse({
      loan: parseInt(amount.current.value),
      voucher_number:
        voucher.current.value === '' ? null : voucher.current.value,
      promissory_note_number:
        promissory.current.value === '' ? null : promissory.current.value,
      check_number: check.current.value === '' ? null : check.current.value,
      status: status.current.value === '' ? null : status.current.value,
    });
    loanValidate;
    if (!loanValidate.success) {
      loanValidate.error.issues.map((item) => {
        toast.error(`Error ${item.path[0]} ${item.message}:`);
      });
    } else {
      mutate({ user: id, ...loanValidate.data });
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Voucher Number</FormLabel>
              <Input ref={voucher} />
            </FormControl>
            <FormControl>
              <FormLabel>Promissory Note Number</FormLabel>
              <Input ref={promissory} />
            </FormControl>
            <FormControl>
              <FormLabel>Check Number</FormLabel>
              <Input ref={check} />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input ref={amount} />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select placeholder='Select status' ref={status}>
                <option value='PENDING'>Pending</option>
                <option value='GRANTED'>Granted</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {isLoading ? (
              <Button colorScheme='blue' mr={3} isLoading>
                Loading
              </Button>
            ) : (
              <Button colorScheme='blue' mr={3} onClick={() => submitLoan()}>
                Loan
              </Button>
            )}

            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoanModal;
