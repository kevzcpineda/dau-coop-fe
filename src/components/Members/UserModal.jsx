import React, { useState, useEffect, useContext, useRef } from 'react';
import {
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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import { useUser } from '../../states/User';
import AuthContext from '../../context/AuthContext';

const UserModal = (props) => {
  const { getUsers } = useContext(AuthContext);
  const { getUser, user, userId, editUser, editJeep } = useUser(
    (state) => state
  );
  const [isEditUser, setIsEditUser] = useState(false);
  const [isEditJeep, setIsEditJeep] = useState(false);
  const [id, setId] = useState(null);
  const [jeep, setJeep] = useState(props.filterUser.jeep_id);
  // user state
  const firstNameRef = useRef('');
  const [firstName, setFirstName] = useState(props.filterUser.first_name);
  const [memberStatus, setMemberStatus] = useState('');
  const tabRef = useRef();
  // jeep state
  const [jeepId, setJeepId] = useState(null);
  const [cr_fileNo, setCr_fileNo] = useState('');
  const [plate_no, setPlate_no] = useState('');
  const [engine_no, setEngine_no] = useState('');
  const [chasis_no, setChasis_no] = useState('');
  const [case_no, setCase_no] = useState('');
  const [make, setMake] = useState('');
  const [year_model, setYear_model] = useState('');
  const [color, setColor] = useState('');
  const [franchise_valid_date, setFranchise_valid_date] = useState('');

  const jeepPayLoad = {
    cr_fileNo: cr_fileNo,
    plate_no: plate_no,
    engine_no: engine_no,
  };

  const payLoad = {
    first_name: firstName,
    member_status: memberStatus,
  };

  // const handleId = (id) => {
  //   console.log('true');
  //   setId(id);
  //   setIsEditJeep(true);
  // };

  const handleSubmit = async () => {
    await editUser(userId, payLoad);
    props.onClose();
  };
  const handleSubmitJeep = async () => {
    await editJeep(jeepId, jeepPayLoad);
    props.onClose();
  };
  // const changeTab = () => {
  //   console.log(tabRef.current.value);
  // };
  // const handleCr_fileNo = (nextValue, id) => {
  //   setcr_fileNo(nextValue);
  // };
  // const handlePlate_no = (nextValue, id) => {
  //   setcr_fileNo(nextValue);
  // };
  const onEdit = (id) => {
    setJeepId(id);
    const filterJeep = props.filterUser.jeep_id.find((item) => item.id === id);
    setCr_fileNo(filterJeep.cr_fileNo);
    setPlate_no(filterJeep.plate_no);
    setEngine_no(filterJeep.engine_no);
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>user</Tab>
                {jeep?.map((item, index) => {
                  return (
                    <Tab
                      key={item.id}
                      ref={tabRef}
                      value={item.id}
                      onChange={() => console.log('kedfjsdnf')}>
                      jeep{index + 1}
                    </Tab>
                  );
                })}
              </TabList>

              <TabPanels>
                {/* user panel */}
                <TabPanel>
                  <Input
                    value={firstName}
                    onChange={(nextValue) =>
                      setFirstName(nextValue.target.value)
                    }
                  />
                </TabPanel>
                {/* jeep panel */}
                {jeep?.map((item, index) => {
                  return (
                    <TabPanel key={index}>
                      {/* <Input
                        value={item?.cr_fileNo}
                        onChange={(e) =>
                          handleCr_fileNo(e.target.value, item.id)
                        }
                      />
                      <Input
                        value={item?.plate_no}
                        onChange={(e) =>
                          handlePlate_no(e.target.value, item.id)
                        }
                      /> */}
                      <Editable
                        defaultValue={item.cr_fileNo}
                        onChange={(e) => setCr_fileNo(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.plate_no}
                        onChange={(e) => setPlate_no(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.engine_no}
                        onChange={(e) => setEngine_no(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.chasis_no}
                        onChange={(e) => setChasis_no(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.case_no}
                        onChange={(e) => setCase_no(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.make}
                        onChange={(e) => setMake(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.year_model}
                        onChange={(e) => setYear_model(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.color}
                        onChange={(e) => setColor(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>

                      <Editable
                        defaultValue={item.franchise_valid_date}
                        onChange={(e) => setFranchise_valid_date(e)}
                        onEdit={() => onEdit(item.id)}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => handleSubmit()}>
              Save
            </Button>
            <Button variant='ghost' onClick={() => handleSubmitJeep()}>
              SaveJeep
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserModal;
