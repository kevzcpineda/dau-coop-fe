import React from 'react';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useLoan } from '../../states/Loan';

const LoanTable = ({ handlePaymentModal, print, filterLoan }) => {
  const { loans } = useLoan((state) => state);
  return (
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>

      <TabPanels>
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
                  <Th>date of Penalty</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loans &&
                  loans.map((item) => {
                    return (
                      <Tr key={item.id}>
                        <Td>{item.user}</Td>
                        <Td>{item.first_name}</Td>
                        <Td>{item.last_name}</Td>
                        <Td>{item.balance}</Td>
                        <Td>{item.penalty}</Td>
                        <Td>{item.penalty_date}</Td>
                        <Td>
                          <Button onClick={() => handlePaymentModal(item.id)}>
                            Payment
                          </Button>
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
                  <Th>date of Penalty</Th>
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
                        <Td>{item.penalty_date}</Td>
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
