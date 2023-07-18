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
  filterLoan,
  notDoneLoan,
  handlePaymentLogModal,
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
                {notDoneLoan &&
                  notDoneLoan.map((item) => {
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
                {filterLoan &&
                  filterLoan.map((item) => {
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
          </TableContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LoanTable;
