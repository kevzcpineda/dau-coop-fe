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
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const DailyDuesEditTable = (data) => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [payload, setPayload] = useState({});
  const [dailyDuesData, setDailyDuesData] = useState(data.data.results);
  const tableRow = useRef(data?.data?.results?.map(() => React.createRef()));
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => {
      return axios.delete(`${baseURL}/daily_jues/update_delete/?id=${id}`);
    },
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      console.log('success');
      queryClient.invalidateQueries('dailyDuesEdit');
    },
  });
  const { mutate: saveEditMutate } = useMutation({
    mutationFn: ({ id, date, amount }) => {
      return axios.put(`${baseURL}/daily_jues/update_delete/?id=${id}`, {
        date,
        amount,
      });
    },
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      console.log('success');
      queryClient.invalidateQueries('dailyDuesEdit');
    },
  });
  const handleChangeDate = (value, id) => {
    setDailyDuesData((prev) => {
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
    const amountInput = row.current.childNodes[3].childNodes[0];
    amountInput.value = value;
  };
  const handleSave = (id) => {
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });
    const amountInput = row.current.childNodes[3].childNodes[0];
    const dateInput = row.current.childNodes[4].childNodes[0];
    const saveButton = row.current.childNodes[5].childNodes[0];
    const cancelButton = row.current.childNodes[5].childNodes[1];
    const editButton = row.current.childNodes[5].childNodes[2];
    const deleteButton = row.current.childNodes[5].childNodes[3];
    const datevalue = dateInput.value;
    const amountvalue = amountInput.value
      ? parseInt(amountInput.value)
      : parseInt(amountInput.placeholder);
    console.log(datevalue, amountvalue);
    const payload = {
      id: id,
      date: datevalue,
      amount: amountvalue,
    };
    saveEditMutate(payload);
    amountInput.setAttribute('readonly', '');
    dateInput.setAttribute('readonly', '');
    editButton.className = 'chakra-button css-jut409';
    deleteButton.className = 'chakra-button css-jut409';
    saveButton.className = 'chakra-button css-146vmld';
    cancelButton.className = 'chakra-button css-146vmld';
  };
  const handleCancel = (id) => {
    setDailyDuesData(data.data);
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });
    const amountInput = row.current.childNodes[3].childNodes[0];
    const dateInput = row.current.childNodes[4].childNodes[0];
    const saveButton = row.current.childNodes[5].childNodes[0];
    const cancelButton = row.current.childNodes[5].childNodes[1];
    const editButton = row.current.childNodes[5].childNodes[2];
    const deleteButton = row.current.childNodes[5].childNodes[3];
    amountInput.setAttribute('readonly', '');
    dateInput.setAttribute('readonly', '');
    editButton.className = 'chakra-button css-jut409';
    deleteButton.className = 'chakra-button css-jut409';
    saveButton.className = 'chakra-button css-146vmld';
    cancelButton.className = 'chakra-button css-146vmld';
    amountInput.value = '';
  };
  const handleEdit = (id) => {
    const row = tableRow.current.find((item) => {
      return parseInt(item.current.childNodes[0].innerHTML) === id;
    });
    const amountInput = row.current.childNodes[3].childNodes[0];
    const dateInput = row.current.childNodes[4].childNodes[0];
    const saveButton = row.current.childNodes[5].childNodes[0];
    const cancelButton = row.current.childNodes[5].childNodes[1];
    const editButton = row.current.childNodes[5].childNodes[2];
    const deleteButton = row.current.childNodes[5].childNodes[3];
    editButton.className = 'chakra-button css-146vmld';
    deleteButton.className = 'chakra-button css-146vmld';
    saveButton.className = 'chakra-button css-jut409';
    cancelButton.className = 'chakra-button css-jut409';
    amountInput.removeAttribute('readonly');
    // amountInput.removeAttribute('aria-readonly');
    dateInput.removeAttribute('readonly');
    // dateInput.removeAttribute('aria-readonly');
  };

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>firstname</Th>
            <Th>lastname</Th>
            <Th>amount</Th>
            <Th>date</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dailyDuesData?.map((item, index) => {
            return (
              <Tr key={index} ref={tableRow.current[index]}>
                <Td>{item.id}</Td>
                <Td>{item.first_name}</Td>
                <Td>{item.last_name}</Td>
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
                    type='date'
                    value={item.date}
                    onChange={(e) => handleChangeDate(e.target.value, item.id)}
                  />
                </Td>
                <Td>
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
                    onClick={() => deleteMutate(item.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DailyDuesEditTable;
