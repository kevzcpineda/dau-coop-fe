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
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react';
const LoanReportTable = ({ data, print }) => {
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>OR#</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data
              .map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.title}</Td>
                    <Td>
                      <Button onClick={() => print(item)}>Print</Button>
                    </Td>
                  </Tr>
                );
              })
              .reverse()}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LoanReportTable;
