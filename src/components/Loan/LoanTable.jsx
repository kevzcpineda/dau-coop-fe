import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
const LoanTable = ({
  handlePaymentModal,
  print,
  handlePrevPage,
  handleNextPage,
  isLoadingSearch,
  doneLoan,
  loanData,
  handlePaymentLogModal,
  setGrantedLoanPage,
  setDoneLoanPage,
  grantedLoanPage,
  doneLoanPage,
  setLoanId,
  reducePenaltyOnOpen,
}) => {
  const { updateLoanStatus } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleReducePenaltyModal = (id) => {
    setLoanId(id);
    reducePenaltyOnOpen();
  };
  const transformNumber = (input) => {
    return input.toLocaleString();
  };
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th>loan ID</Th>
            <Th>Name</Th>
            <Th>Granted Loan</Th>
            <Th>Total Payments</Th>
            <Th>balance</Th>
            <Th>penalty</Th>
            <Th>date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loanData &&
            loanData.results.map((item) => {
              return (
                <Tr
                  key={item.id}
                  onClick={() => handlePaymentLogModal(item.id)}>
                  <Td>{item.id}</Td>
                  <Td>{`${item.last_name} ${item.first_name}`}</Td>
                  <Td>{transformNumber(item.loan)}</Td>
                  <Td>{transformNumber(item.total_payments)}</Td>
                  <Td>{transformNumber(item.balance)}</Td>
                  <Td>{transformNumber(item.penalty)}</Td>
                  <Td>{item.date}</Td>
                  <Td>
                    {/* <Button onClick={() => handlePaymentModal(item.id)}>
                              Payment
                            </Button> */}
                    <Button onClick={(e) => print(e, item)}>Print</Button>
                    {/* <Button onClick={() => handleReducePenaltyModal(item.id)}>
                      Reduce Penalty
                    </Button> */}
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <Button
        onClick={() => handlePrevPage()}
        isDisabled={loanData.previous === null ? true : false}
        // spinner={<BeatLoader size={8} color='white' />}
      >
        previous
      </Button>
      <Button
        onClick={() => handleNextPage()}
        isDisabled={loanData.next === null ? true : false}>
        next
      </Button>
    </TableContainer>
  );
};

export default LoanTable;
