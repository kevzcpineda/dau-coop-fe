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
} from '@chakra-ui/react';

const PaymentModal = ({
  isOpen,
  onClose,
  setAmount,
  setTicket,
  handlePayment,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Loan Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              placeholder='Amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ticket</FormLabel>
            <Input
              placeholder='Ticket'
              onChange={(e) => setTicket(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={() => handlePayment()}>
            Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
