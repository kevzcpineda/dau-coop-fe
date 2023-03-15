import React, { useState } from 'react';
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
} from '@chakra-ui/react';
const LoanModal = (props) => {
  console.log('loan MOdal');
  const [amount, setAmount] = useState(0);
  const [voucher, setVoucher] = useState('');
  const [check, setCheck] = useState('');
  const [promissory, setPromissory] = useState('');

  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Voucher Number</FormLabel>
              <Input
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Promissory Note Number</FormLabel>
              <Input
                value={promissory}
                onChange={(e) => setPromissory(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Check Number</FormLabel>
              <Input value={check} onChange={(e) => setCheck(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button
              variant='ghost'
              onClick={() =>
                props.handleLoan(amount, voucher, promissory, check)
              }>
              Loan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoanModal;
