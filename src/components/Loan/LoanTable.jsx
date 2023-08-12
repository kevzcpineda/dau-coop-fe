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
  grantedLoan,
  handlePaymentLogModal,
  setGrantedLoanPage,
  setDoneLoanPage,
  grantedLoanPage,
  doneLoanPage,
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
  console.log('grantedLoantable', grantedLoan);
  return (
    <Tabs>
      <TabList>
        <Tab>Pending</Tab>
        <Tab>Fully Paid</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>loan ID</Th>
                  <Th>First Name</Th>
                  <Th>Lasr Name</Th>
                  <Th>balance</Th>
                  <Th>penalty</Th>
                  <Th>date of Penalty</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {grantedLoan &&
                  grantedLoan.results.map((item) => {
                    return (
                      <Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>{item.balance}</Td>
                        <Td>{item.penalty}</Td>
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
                          <Button onClick={() => print(item)}>Print</Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
            <Button
              onClick={() => setGrantedLoanPage(grantedLoanPage - 1)}
              isDisabled={grantedLoan.previous === null ? true : false}>
              previous
            </Button>
            <Button
              onClick={() => setGrantedLoanPage(grantedLoanPage + 1)}
              isDisabled={grantedLoan.next === null ? true : false}>
              next
            </Button>
          </TableContainer>
        </TabPanel>
        <TabPanel>
          <TableContainer>
            <Table variant='striped' colorScheme='gray'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Lasr Name</Th>
                  <Th>balance</Th>
                  <Th>penalty</Th>
                  <Th>Date</Th>
                  {/* <Th>date of Penalty</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {doneLoan &&
                  doneLoan.results.map((item) => {
                    return (
                      <Tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>{item.balance}</Td>
                        <Td>{item.penalty}</Td>
                        <Td>{item.date}</Td>
                        {/* <Td>{item.penalty_date}</Td> */}
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
            <Button
              onClick={() => setDoneLoanPage(doneLoanPage - 1)}
              isDisabled={doneLoan.previous === null ? true : false}>
              previous
            </Button>
            <Button
              onClick={() => setDoneLoanPage(doneLoanPage + 1)}
              isDisabled={doneLoan.next === null ? true : false}>
              next
            </Button>
          </TableContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoanTable;
