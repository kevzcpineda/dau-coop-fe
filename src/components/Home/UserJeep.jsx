import React from 'react';

const UserJeep = () => {
  return (
    <Box>
      <TableContainer>
        <Table variant='striped' colorScheme='gray'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>CR File No.</Th>
              <Th>Plate No.</Th>
              <Th>Engine No.</Th>
              <Th>Chasis No.</Th>
              <Th>Case No.</Th>
              <Th>Make</Th>
              <Th>Year Model</Th>
              <Th>Color</Th>
              <Th>Franchise Valid Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userInfo &&
              userInfo.jeep_id?.map((jeep) => (
                <Tr key={jeep.id}>
                  <Td>{jeep.id}</Td>
                  <Td>{jeep.cr_fileNo}</Td>
                  <Td>{jeep.plate_no}</Td>
                  <Td>{jeep.engine_no}</Td>
                  <Td>{jeep.chasis_no}</Td>
                  <Td>{jeep.case_no}</Td>
                  <Td>{jeep.make}</Td>
                  <Td>{jeep.year_model}</Td>
                  <Td>{jeep.color}</Td>
                  <Td>{jeep.franchise_valid_date}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserJeep;
