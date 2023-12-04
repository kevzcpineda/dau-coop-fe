import React, { useState, useRef } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Input,
  useDisclosure,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import DeleteModal from './DeleteModal';

const PaymentLogModalTable = ({ data, penaltyData }) => {
  const queryClient = useQueryClient();
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loanPayments, setLoanPayments] = useState(data.data);
  const [id, setId] = useState(null);

  const tableRow = useRef(data?.data?.map(() => React.createRef()));

  const [isEdit, setIsEdit] = useState(false);
  const handleChangeDate = (value, id) => {
    setLoanPayments((prev) => {
      return prev.map((row) => {
        if (row.id === id) {
          return { ...row, date: value };
        }
        return row;
      });
    });
  };
  const handleChangeAmount = (value, id) => {
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });

    const amountInput = row.current.childNodes[1].childNodes[0];
    amountInput.value = value;
  };
  const handleChangeTicket = (value, id) => {
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });

    const ticketInput = row.current.childNodes[2].childNodes[0];
    ticketInput.value = value;
  };
  const handleSave = (id) => {
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });
    console.log('row', row);
    const amountInput = row.current.childNodes[1].childNodes[0];
    const ticketInput = row.current.childNodes[2].childNodes[0];
    const dateInput = row.current.childNodes[3].childNodes[0];
    const saveButton = row.current.childNodes[4].childNodes[0].childNodes[0];
    const cancelButton = row.current.childNodes[4].childNodes[0].childNodes[1];
    const editButton = row.current.childNodes[4].childNodes[0].childNodes[2];
    const deleteButton = row.current.childNodes[4].childNodes[0].childNodes[3];
    const amountvalue = amountInput.value
      ? parseInt(amountInput.value)
      : parseInt(amountInput.placeholder);
    const datevalue = dateInput.value;
    const ticketvalue = ticketInput.value
      ? ticketInput.value
      : ticketInput.placeholder;

    const payload = {
      id: id,
      amount: amountvalue,
      ticket: ticketvalue,
      date: datevalue,
    };
    console.log('payload', payload);
    mutateEditPayment(payload);
  };
  const handleCancel = (id) => {
    setLoanPayments(data.data);
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });
    const amountInput = row.current.childNodes[1].childNodes[0];
    const ticketInput = row.current.childNodes[2].childNodes[0];
    const dateInput = row.current.childNodes[3].childNodes[0];
    const saveButton = row.current.childNodes[4].childNodes[0].childNodes[0];
    const cancelButton = row.current.childNodes[4].childNodes[0].childNodes[1];
    const editButton = row.current.childNodes[4].childNodes[0].childNodes[2];
    const deleteButton = row.current.childNodes[4].childNodes[0].childNodes[3];
    editButton.className = 'chakra-button css-jut409';
    deleteButton.className = 'chakra-button css-jut409';
    saveButton.className = 'chakra-button css-146vmld';
    cancelButton.className = 'chakra-button css-146vmld';
    amountInput.setAttribute('readonly', '');
    dateInput.setAttribute('readonly', '');
    ticketInput.setAttribute('readonly', '');
    amountInput.value = '';
    ticketInput.value = '';
  };
  const handleEdit = (id) => {
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });
    console.log('row', row);
    const amountInput = row.current.childNodes[1].childNodes[0];
    const ticketInput = row.current.childNodes[2].childNodes[0];
    const dateInput = row.current.childNodes[3].childNodes[0];
    const saveButton = row.current.childNodes[4].childNodes[0].childNodes[0];
    const cancelButton = row.current.childNodes[4].childNodes[0].childNodes[1];
    const editButton = row.current.childNodes[4].childNodes[0].childNodes[2];
    const deleteButton = row.current.childNodes[4].childNodes[0].childNodes[3];
    editButton.className = 'chakra-button css-146vmld';
    deleteButton.className = 'chakra-button css-146vmld';
    saveButton.className = 'chakra-button css-jut409';
    cancelButton.className = 'chakra-button css-jut409';
    amountInput.removeAttribute('readonly');
    ticketInput.removeAttribute('readonly');
    dateInput.removeAttribute('readonly');
  };
  const handleDeleleModal = (id) => {
    onOpen();
    setId(id);
  };

  const { mutate: mutateDeletePayment } = useMutation({
    mutationFn: () => {
      return axios.delete(`${baseURL}/loan/payments/${id}/`);
    },
    onSuccess: (data) => {
      console.log('mutate', data);
      queryClient.resetQueries({ queryKey: 'userLoanPayments' });
      queryClient.invalidateQueries({ queryKey: 'loans' });

      onClose();
    },
  });
  const { mutate: mutateEditPayment } = useMutation({
    mutationFn: ({ id, date, ticket, amount }) => {
      return axios.put(`${baseURL}/loan/payments/${id}/`, {
        date,
        ticket,
        amount,
      });
    },
    onSuccess: (data) => {
      // console.log('mutate', data);
      // queryClient.resetQueries({ queryKey: 'userLoanPayments' });
      queryClient.invalidateQueries({ queryKey: 'userLoanPayments' });
    },
  });
  return (
    <>
      {isOpen && (
        <DeleteModal
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
          id={id}
          mutate={mutateDeletePayment}
        />
      )}
      <Tabs>
        <TabList>
          <Tab>Payments</Tab>
          <Tab>Penalties</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>id</Th>
                    <Th>amount</Th>
                    <Th>Ticket</Th>
                    <Th>date</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loanPayments.map((item, index) => {
                    return (
                      <Tr key={index} ref={tableRow.current[index]}>
                        <Td>{item.id}</Td>
                        <Td>
                          <Input
                            isReadOnly={true}
                            // value={item.amount}
                            placeholder={item.amount}
                            onChange={(e) =>
                              handleChangeAmount(e.target.value, item.id)
                            }
                          />
                        </Td>
                        <Td>
                          <Input
                            isReadOnly={true}
                            // value={item.ticket}
                            placeholder={item.ticket}
                            onChange={(e) =>
                              handleChangeTicket(e.target.value, item.id)
                            }
                          />
                        </Td>
                        <Td>
                          <Input
                            isReadOnly={true}
                            type='date'
                            value={item.date}
                            onChange={(e) =>
                              handleChangeDate(e.target.value, item.id)
                            }
                          />
                        </Td>
                        <Td>
                          <HStack>
                            <Button
                              display={isEdit ? 'inline-flex' : 'none'}
                              colorScheme='blue'
                              onClick={() => handleSave(item.id)}>
                              Save
                            </Button>
                            <Button
                              display={isEdit ? 'inline-flex' : 'none'}
                              colorScheme='blue'
                              onClick={() => handleCancel(item.id)}>
                              Cancel
                            </Button>
                            <Button
                              display={isEdit ? 'none' : 'inline-flex'}
                              colorScheme='blue'
                              onClick={() => handleEdit(item.id)}>
                              Edit
                            </Button>
                            <Button
                              display={isEdit ? 'none' : 'inline-flex'}
                              colorScheme='blue'
                              onClick={() => handleDeleleModal(item.id)}>
                              Delete
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>id</Th>
                    <Th>penalty amount</Th>
                    <Th>date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {penaltyData.data.map((item, i) => {
                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{item.penalty_amount}</Td>
                        <Td>{item.date}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default PaymentLogModalTable;
