import React, { useState, useEffect, useContext, useRef } from 'react';
import User from './User';

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
  Spinner,
} from '@chakra-ui/react';
import { useUser } from '../../states/User';
import AuthContext from '../../context/AuthContext';
import { useMutation, useQueryClient, useQuery } from 'react-query';

const UserModal = ({ id, isOpen, onClose }) => {
  const { editUser, getUser, editJeep } = useContext(AuthContext);

  const { data, status } = useQuery(['user', id], () => getUser(id));
  // const [id, setId] = useState(null);
  // const [jeep, setJeep] = useState(user.jeep_id);
  // user state
  const [firstName, setFirstName] = useState(data?.first_name);
  const [lastname, setLastname] = useState(data?.last_name);
  const [middlename, setMiddlename] = useState(data?.middle_name);
  const [age, setAge] = useState(data?.age);
  const [birthdate, setBirthdate] = useState(data?.birth_date);
  const [gender, setGender] = useState(data?.gender);
  const [homeaddress, setHomeaddress] = useState(data?.home_address);
  const [phoneno, setPhoneno] = useState(data?.phone_no);
  const [dateofmembership, setDateofmembership] = useState(
    data?.date_of_membership
  );
  const [civilstatus, setCivilstatus] = useState(data?.civil_status);
  const [driverlicenseno, setDriverlicenseno] = useState(
    data?.driver_license_no
  );
  const [height, setHeight] = useState(data?.height);
  const [weight, setWeight] = useState(data?.weight);
  const [bloodtype, setBloodtype] = useState(data?.blood_type);
  const [philhealthno, setPhilhealthno] = useState(data?.philhealth_no);
  const [sssno, setSssno] = useState(data?.sss_no);
  const [memberstatus, setMemberStatus] = useState(data?.member_status);

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
  const [franchise_valid_date, setFranchise_valid_date] = useState(null);

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', id]);
      queryClient.invalidateQueries('members');
    },
  });

  const { isLoading: jeepIsLoading, mutate: jeepMutate } = useMutation(
    editJeep,
    {
      onMutate: async (data) => {
        // Optimistically update to the new value
        queryClient.invalidateQueries(['user', id]);

        // Return a context with the previous and new todo
      },
      onSuccess: () => {},
    }
  );

  const payload = {
    id: id,
    first_name: firstName,
    last_name: lastname,
    middle_name: middlename,
    age: age,
    birth_date: birthdate,
    gender: gender,
    home_address: homeaddress,
    phone_no: phoneno,
    date_of_membership: dateofmembership,
    civil_status: civilstatus,
    driver_license_no: driverlicenseno,
    height: height,
    weight: weight,
    blood_type: bloodtype,
    philhealth_no: philhealthno,
    sss_no: sssno,
    member_status: memberstatus,
  };

  const jeepPayLoad = {
    id: jeepId,
    cr_fileNo: cr_fileNo,
    plate_no: plate_no,
    engine_no: engine_no,
    chasis_no: chasis_no,
    case_no: case_no,
    make: make,
    year_model: year_model,
    color: color,
    franchise_valid_date: franchise_valid_date,
  };

  const handleEditUser = async () => {
    mutate(payload);
  };

  const handleSubmitJeep = () => {
    jeepMutate(jeepPayLoad);
  };

  const onEdit = (id) => {
    setJeepId(id);
    setCr_fileNo(data.jeep_id.cr_fileNo);
    setPlate_no(data.jeep_id.plate_no);
    setEngine_no(data.jeep_id.engine_no);
    setChasis_no(data.jeep_id.chasis_no);
    setCase_no(data.jeep_id.case_no);
    setMake(data.jeep_id.make);
    setYear_model(data.jeep_id.year_model);
    setColor(data.jeep_id.color);
    setFranchise_valid_date(data.jeep_id.franchise_valid_date);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading && <div>Saving...</div>}
            {status === 'loading' && <Spinner />}
            {status === 'error' && <div>error...</div>}
            {status === 'success' && (
              <User
                data={data}
                setFirstName={setFirstName}
                setLastname={setLastname}
                setMiddlename={setMiddlename}
                setAge={setAge}
                setBirthdate={setBirthdate}
                setGender={setGender}
                setHomeaddress={setHomeaddress}
                setPhoneno={setPhoneno}
                setCivilstatus={setCivilstatus}
                setPhilhealthno={setPhilhealthno}
                setWeight={setWeight}
                setDriverlicenseno={setDriverlicenseno}
                setBloodtype={setBloodtype}
                setDateofmembership={setDateofmembership}
                setSssno={setSssno}
                setHeight={setHeight}
                setMemberStatus={setMemberStatus}
                setCr_fileNo={setCr_fileNo}
                setPlate_no={setPlate_no}
                setEngine_no={setEngine_no}
                setChasis_no={setChasis_no}
                setCase_no={setCase_no}
                setMake={setMake}
                setYear_model={setYear_model}
                setColor={setColor}
                setFranchise_valid_date={setFranchise_valid_date}
                onEdit={onEdit}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => handleEditUser()}>
              SaveUser
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
