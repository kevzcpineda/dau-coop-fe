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
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import transformNumber from '../../utils/transformNumber';
// import { useDailyJues } from '../../states/Daily_jues';

const DailyJuesTable = ({ data }) => {
  // const { dailyJues } = useDailyJues((state) => state);

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>Beginning capital</Th>
            <Th>january</Th>
            <Th>january balance capital share</Th>
            <Th>february</Th>
            <Th>february balance capital share</Th>
            <Th>march</Th>
            <Th>march balance capital share</Th>
            <Th>april</Th>
            <Th>april balance capital share</Th>
            <Th>may</Th>
            <Th>may balance capital share</Th>
            <Th>june</Th>
            <Th>june balance capital share</Th>
            <Th>july</Th>
            <Th>july balance capital share</Th>
            <Th>august</Th>
            <Th>august balance capital share</Th>
            <Th>september</Th>
            <Th>september balance capital share</Th>
            <Th>october</Th>
            <Th>october balance capital share</Th>
            <Th>november</Th>
            <Th>november balance capital share</Th>
            <Th>december</Th>
            <Th>december balance capital share</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => {
            return (
              <Tr key={item.id}>
                <Td>{`${item.last_name} ${item.first_name}`}</Td>
                <Td>{transformNumber(item.beginning_capital)}</Td>
                <Td>{transformNumber(item.january)}</Td>
                <Td>{transformNumber(item.january_capital)}</Td>
                <Td>{transformNumber(item.february)}</Td>
                <Td>{transformNumber(item.feb_capital)}</Td>
                <Td>{transformNumber(item.march)}</Td>
                <Td>{transformNumber(item.march_capital)}</Td>
                <Td>{transformNumber(item.april_capital)}</Td>
                <Td>{transformNumber(item.april)}</Td>
                <Td>{transformNumber(item.may)}</Td>
                <Td>{transformNumber(item.may_capital)}</Td>
                <Td>{transformNumber(item.june)}</Td>
                <Td>{transformNumber(item.june_capital)}</Td>
                <Td>{transformNumber(item.july)}</Td>
                <Td>{transformNumber(item.july_capital)}</Td>
                <Td>{transformNumber(item.august)}</Td>
                <Td>{transformNumber(item.august_capital)}</Td>
                <Td>{transformNumber(item.september)}</Td>
                <Td>{transformNumber(item.september_capital)}</Td>
                <Td>{transformNumber(item.october)}</Td>
                <Td>{transformNumber(item.october_capital)}</Td>
                <Td>{transformNumber(item.november)}</Td>
                <Td>{transformNumber(item.november_capital)}</Td>
                <Td>{transformNumber(item.december)}</Td>
                <Td>{transformNumber(item.december_capital)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DailyJuesTable;
