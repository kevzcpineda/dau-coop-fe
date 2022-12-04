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
import { useUser } from '../states/User';
import { useLoan } from '../states/Loan';

const Loans = () => {
  const users = [];
  const [id, setId] = useState(null);
  const [amount, setAmount] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUser, user, deleteUser } = useUser((state) => state);
  const { getLoans, loans, loanPayment } = useLoan((state) => state);

  const handlePaymentModal = (id) => {
    onOpen();
    setId(id);
  };

  const handlePayment = () => {
    loanPayment(id, amount);
    onClose();
  };

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <AdminLayout>
      <Box>
        <Heading>Loans</Heading>
        <TableContainer>
          <Table variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>First Name</Th>
                <Th>Lasr Name</Th>
                <Th>balance</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loans &&
                loans.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>{item.id}</Td>
                      <Td>{item.first_name}</Td>
                      <Td>{item.last_name}</Td>
                      <Td>{item.balance}</Td>
                      <Td>
                        <Button onClick={() => handlePaymentModal(item.id)}>
                          Payment
                        </Button>
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
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme='blue'
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                              <Button
                                variant='ghost'
                                onClick={() => handlePayment()}
                              >
                                Pay
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  );
};

export default Loans;
