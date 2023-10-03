import React, { useRef } from 'react';
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
  FormControl,
} from '@chakra-ui/react';
const UserTab = ({ data, handleOnChange }) => {
  const fname = useRef();
  const lname = useRef();
  const mname = useRef();
  const age = useRef();
  const birthdate = useRef();
  const gender = useRef();
  const address = useRef();
  const phone = useRef();
  const dateofmembership = useRef();
  const civilstatus = useRef();
  const driverlicenseno = useRef();
  const height = useRef();
  const weight = useRef();
  const bloodtype = useRef();
  const philhealthno = useRef();
  const sssno = useRef();
  const memberstatus = useRef();
  return (
    <>
      <FormControl>
        <Flex color='black'>
          <Box flex='1'>
            <Flex>
              <Center>
                <Text>First Name:</Text>
                <Editable
                  defaultValue={data.first_name ? data.first_name : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, fname.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='first_name' ref={fname} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Last Name:</Text>
                <Editable
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, lname.current.id)
                  }
                  defaultValue={data.last_name ? data.last_name : 'null'}>
                  <EditablePreview />
                  <EditableInput id='last_name' ref={lname} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Middle Name:</Text>
                <Editable
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, mname.current.id)
                  }
                  defaultValue={data.middle_name ? data.middle_name : 'null'}>
                  <EditablePreview />
                  <EditableInput id='middle_name' ref={mname} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Age:</Text>
                <Editable
                  defaultValue={data.age ? data.age : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, age.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='age' ref={age} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Birthdate:</Text>
                <Editable
                  defaultValue={data.birth_date ? data.birth_date : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, birthdate.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='birth_date' ref={birthdate} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Username:</Text>
                <Editable defaultValue={data.username} isDisabled='true'>
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
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, gender.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='gender' ref={gender} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Address:</Text>
                <Editable
                  defaultValue={data.home_address ? data.home_address : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, address.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='home_address' ref={address} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Phone No:</Text>
                <Editable
                  defaultValue={data.phone_no ? data.phone_no : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, phone.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='phone_no' ref={phone} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Date Of Membership:</Text>
                <Editable
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, dateofmembership.current.id)
                  }
                  defaultValue={
                    data.date_of_membership ? data.date_of_membership : 'null'
                  }>
                  <EditablePreview />
                  <EditableInput
                    id='date_of_membership'
                    ref={dateofmembership}
                  />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Civil Status:</Text>
                <Editable
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, civilstatus.current.id)
                  }
                  defaultValue={data.civil_status ? data.civil_status : 'null'}>
                  <EditablePreview />
                  <EditableInput id='civil_status' ref={civilstatus} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Member Status:</Text>
                <Editable
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, memberstatus.current.id)
                  }
                  defaultValue={
                    data.member_status ? data.member_status : 'null'
                  }>
                  <EditablePreview />
                  <EditableInput id='member_status' ref={memberstatus} />
                </Editable>
              </Center>
            </Flex>
          </Box>
          <Box flex='1'>
            <Flex>
              <Center>
                <Text>Driver License No:</Text>
                <Editable
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, driverlicenseno.current.id)
                  }
                  defaultValue={
                    data.driver_license_no ? data.driver_license_no : 'null'
                  }>
                  <EditablePreview />
                  <EditableInput id='driver_license_no' ref={driverlicenseno} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Height:</Text>
                <Editable
                  defaultValue={data.height ? data.height : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, height.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='height' ref={height} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Weight:</Text>
                <Editable
                  defaultValue={data.weight ? data.weight : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, weight.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='weight' ref={weight} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Blood Type:</Text>
                <Editable
                  defaultValue={data.blood_type ? data.blood_type : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, bloodtype.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='blood_type' ref={bloodtype} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>Philhealth No:</Text>
                <Editable
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, philhealthno.current.id)
                  }
                  defaultValue={
                    data.philhealth_no ? data.philhealth_no : 'null'
                  }>
                  <EditablePreview />
                  <EditableInput id='philhealth_no' ref={philhealthno} />
                </Editable>
              </Center>
            </Flex>
            <Flex>
              <Center>
                <Text>SSS:</Text>
                <Editable
                  defaultValue={data.sss_no ? data.sss_no : 'null'}
                  onChange={(nextValue) =>
                    handleOnChange(nextValue, sssno.current.id)
                  }>
                  <EditablePreview />
                  <EditableInput id='sss_no' ref={sssno} />
                </Editable>
              </Center>
            </Flex>
          </Box>
        </Flex>
      </FormControl>
    </>
  );
};

export default UserTab;
