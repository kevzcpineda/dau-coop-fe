import React, { useRef, useState } from 'react';
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
  Input,
  Checkbox,
} from '@chakra-ui/react';
import moment from 'moment';
const LoanReportModalTable = ({ data, isEdit, setPayments }) => {
  const dateInputRef = useRef([]);

  const [checkBox, setCheckBox] = useState([]);
  const [newData, setData] = useState(data?.payments);
  const handleOnCheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckBox((prev) => [...prev, parseInt(value)]);
    } else {
      setCheckBox((prev) => {
        return [...prev.filter((item) => item !== parseInt(value))];
      });
    }
  };
  const handleOnChangeDate = (e, i) => {
    const newdata = newData?.map((item) => {
      if (item.id === i.id) {
        return {
          ...item,
          date: e,
        };
      }
      return item;
    });
    const filteredData = newdata.map((obj) => {
      const { date, id, ticket, amount } = obj;
      return { date, id, ticket, amount };
    });
    setPayments(filteredData);
    setData(newdata);
  };

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {/* <Th></Th> */}
            <Th>No.</Th>
            <Th>Name</Th>
            <Th>RECEIPT NO.</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {newData?.map((item, index) => {
            return (
              <Tr key={index}>
                {/* <Td>
                  <Checkbox
                    value={item.id}
                    colorScheme='green'
                    onChange={(e) => handleOnCheck(e)}
                  />
                </Td> */}
                <Td>{index + 1}</Td>
                <Td>{`${item.last_name} ${item.first_name}`}</Td>
                <Td>{item.ticket}</Td>
                <Td>{item.amount}</Td>
                <Td>
                  <Input
                    isReadOnly={isEdit}
                    ref={(element) =>
                      (dateInputRef.current[index] = { element, item })
                    }
                    type='date'
                    value={item.date}
                    onChange={(e) => handleOnChangeDate(e.target.value, item)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LoanReportModalTable;
