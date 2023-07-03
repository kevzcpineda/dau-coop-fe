import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Box,
  Spacer,
  Center,
  Text,
  Spinner,
} from '@chakra-ui/react';

const User = ({
  data,
  setFirstName,
  setLastname,
  setMiddlename,
  setAge,
  setBirthdate,
  setGender,
  setHomeaddress,
  setPhoneno,
  setCivilstatus,
  setDriverlicenseno,
  setHeight,
  setBloodtype,
  setSssno,
  setPhilhealthno,
  setWeight,
  setDateofmembership,
  setMemberStatus,
  setCr_fileNo,
  setPlate_no,
  setEngine_no,
  setChasis_no,
  setCase_no,
  setMake,
  setYear_model,
  setColor,
  setFranchise_valid_date,
  onEdit,
}) => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>user</Tab>
          {data.jeep_id?.map((item, index) => {
            return (
              <Tab key={item.id} value={item.id}>
                jeep{index + 1}
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          {/* user panel */}
          <TabPanel>
            <Flex color='black'>
              <Box flex='1'>
                <Flex>
                  <Center>
                    <Text>First Name:</Text>
                    <Editable
                      defaultValue={data.first_name ? data.first_name : 'null'}
                      onChange={(e) => setFirstName(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Last Name:</Text>
                    <Editable
                      defaultValue={data.last_name ? data.last_name : 'null'}
                      onChange={(e) => setLastname(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Middle Name:</Text>
                    <Editable
                      defaultValue={
                        data.middle_name ? data.middle_name : 'null'
                      }
                      onChange={(e) => setMiddlename(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Age:</Text>
                    <Editable
                      defaultValue={data.age ? data.age : 'null'}
                      onChange={(e) => setAge(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Birthdate:</Text>
                    <Editable
                      defaultValue={data.birth_date ? data.birth_date : 'null'}
                      onChange={(e) => setBirthdate(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
              </Box>
              <Box flex='1'>
                <Flex>
                  <Center>
                    <Text>Gender:</Text>
                    <Editable
                      defaultValue={data.gender ? data.gender : 'null'}
                      onChange={(e) => setGender(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Address:</Text>
                    <Editable
                      defaultValue={
                        data.home_address ? data.home_address : 'null'
                      }
                      onChange={(e) => setHomeaddress(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Phone No:</Text>
                    <Editable
                      defaultValue={data.phone_no ? data.phone_no : 'null'}
                      onChange={(e) => setPhoneno(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Date Of Membership:</Text>
                    <Editable
                      defaultValue={
                        data.date_of_membership
                          ? data.date_of_membership
                          : 'null'
                      }
                      onChange={(e) => setDateofmembership(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Civil Status:</Text>
                    <Editable
                      defaultValue={
                        data.civil_status ? data.civil_status : 'null'
                      }
                      onChange={(e) => setCivilstatus(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Member Status:</Text>
                    <Editable
                      defaultValue={
                        data.member_status ? data.member_status : 'null'
                      }
                      onChange={(e) => setMemberStatus(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
              </Box>
              <Box flex='1'>
                <Flex>
                  <Center>
                    <Text>Driver License No:</Text>
                    <Editable
                      defaultValue={
                        data.driver_license_no ? data.driver_license_no : 'null'
                      }
                      onChange={(e) => setDriverlicenseno(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Height:</Text>
                    <Editable
                      defaultValue={data.height ? data.height : 'null'}
                      onChange={(e) => setHeight(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Weight:</Text>
                    <Editable
                      defaultValue={data.weight ? data.weight : 'null'}
                      onChange={(e) => setWeight(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Blood Type:</Text>
                    <Editable
                      defaultValue={data.blood_type ? data.blood_type : 'null'}
                      onChange={(e) => setBloodtype(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Philhealth No:</Text>
                    <Editable
                      defaultValue={
                        data.philhealth_no ? data.philhealth_no : 'null'
                      }
                      onChange={(e) => setPhilhealthno(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>SSS:</Text>
                    <Editable
                      defaultValue={data.sss_no ? data.sss_no : 'null'}
                      onChange={(e) => setSssno(e)}>
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Center>
                </Flex>
              </Box>
            </Flex>
          </TabPanel>
          {/* jeep panel */}
          {data.jeep_id?.map((item, index) => {
            return (
              <TabPanel key={index}>
                <Flex>
                  <Box flex='1'>
                    <Flex>
                      <Center>
                        <Text>Cr File No:</Text>
                        <Editable
                          defaultValue={
                            item.cr_fileNo ? item.cr_fileNo : 'None'
                          }
                          onChange={(e) => setCr_fileNo(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                    <Flex>
                      <Center>
                        <Text>Plate No:</Text>
                        <Editable
                          defaultValue={item.plate_no ? item.plate_no : 'None'}
                          onChange={(e) => setPlate_no(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                    <Flex>
                      <Center>
                        <Text>Engine No:</Text>
                        <Editable
                          defaultValue={
                            item.engine_no ? item.engine_no : 'None'
                          }
                          onChange={(e) => setEngine_no(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                    <Flex>
                      <Center>
                        <Text>Chasis No:</Text>
                        <Editable
                          defaultValue={
                            item.chasis_no ? item.chasis_no : 'None'
                          }
                          onChange={(e) => setChasis_no(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                    <Flex>
                      <Center>
                        <Text>Case No:</Text>
                        <Editable
                          defaultValue={item.case_no ? item.case_no : 'None'}
                          onChange={(e) => setCase_no(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                  </Box>
                  <Box flex='1'>
                    <Flex>
                      <Center>
                        <Text>Make:</Text>
                        <Editable
                          defaultValue={item.make ? item.make : 'None'}
                          onChange={(e) => setMake(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                    <Flex>
                      <Center>
                        <Text>Year Model:</Text>
                        <Editable
                          defaultValue={
                            item.year_model ? item.year_model : 'None'
                          }
                          onChange={(e) => setYear_model(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                    <Flex>
                      <Center>
                        <Text>Color:</Text>
                        <Editable
                          defaultValue={item.color ? item.color : 'None'}
                          onChange={(e) => setColor(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                    <Flex>
                      <Center>
                        <Text>Franchise Valid Date:</Text>
                        <Editable
                          defaultValue={
                            item.franchise_valid_date
                              ? item.franchise_valid_date
                              : 'None'
                          }
                          onChange={(e) => setFranchise_valid_date(e)}
                          onEdit={() => onEdit(item.id)}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Center>
                    </Flex>
                  </Box>
                </Flex>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default User;
