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
  const { isSuccess, isError, mutate } = useMutation(updateLoanStatus, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['loan'] });
    },
  });
  const handleChangeStatus = async (id, status) => {
    await mutate({ id: id, status: status });
  };
  const handleReducePenaltyModal = (id) => {
    setLoanId(id);
    reducePenaltyOnOpen();
  };
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th>loan ID</Th>
            <Th>First Name</Th>
            <Th>Lasr Name</Th>
            <Th>balance</Th>
            <Th>penalty</Th>
            <Th>Total</Th>
            <Th>date of Penalty</Th>
            <Th>Status</Th>
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
                  <Td>{item.first_name}</Td>
                  <Td>{item.last_name}</Td>
                  <Td>{item.balance}</Td>
                  <Td>{item.penalty}</Td>
                  <Td>{item.total}</Td>
                  <Td>{item.penalty_date}</Td>
                  <Td>
                    {
                      <Select
                        placeholder={item.status}
                        onChange={(e) =>
                          handleChangeStatus(item.id, e.target.value)
                        }>
                        <option value='DONE'>DONE</option>
                      </Select>
                    }
                  </Td>
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
        onClick={() => setGrantedLoanPage(grantedLoanPage - 1)}
        isDisabled={loanData.previous === null ? true : false}>
        previous
      </Button>
      <Button
        onClick={() => setGrantedLoanPage(grantedLoanPage + 1)}
        isDisabled={loanData.next === null ? true : false}>
        next
      </Button>
    </TableContainer>
  );
};

export default LoanTable;
