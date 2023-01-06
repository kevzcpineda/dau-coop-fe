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
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '../../states/User';

const AddJeepModal = (props) => {
  const { createJeep } = useUser((state) => state);
  // jeep state
  const [crFileNo, setCrFileNo] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [engineNo, setEngineNo] = useState('');
  const [chasisNo, setChasisNo] = useState('');
  const [caseNo, setCaseNo] = useState('');
  const [make, setMake] = useState('');
  const [yearModel, setYearModel] = useState('');
  const [color, setColorl] = useState('');
  const [franchiseValidDate, setFranchiseValidDate] = useState(null);

  const handleAddJeep = async () => {
    await createJeep(
      props.id,
      crFileNo,
      plateNo,
      engineNo,
      chasisNo,
      caseNo,
      make,
      yearModel,
      color,
      franchiseValidDate
    );
    props.onClose();
  };

  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Jeep</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>cr_fileNo</FormLabel>
              <Input
                value={crFileNo}
                onChange={(e) => setCrFileNo(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>plate_no</FormLabel>
              <Input
                value={plateNo}
                onChange={(e) => setPlateNo(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>engine_no</FormLabel>
              <Input
                value={engineNo}
                onChange={(e) => setEngineNo(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>chasis_no</FormLabel>
              <Input
                value={chasisNo}
                onChange={(e) => setChasisNo(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>case_no</FormLabel>
              <Input
                value={caseNo}
                onChange={(e) => setCaseNo(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>make</FormLabel>
              <Input value={make} onChange={(e) => setMake(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>year_model</FormLabel>
              <Input
                value={yearModel}
                onChange={(e) => setYearModel(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>color</FormLabel>
              <Input
                value={color}
                onChange={(e) => setColorl(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>franchise_valid_date</FormLabel>
              <Input
                type='date'
                onChange={(e) => setFranchiseValidDate(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => handleAddJeep()}>
              Add Jeep
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddJeepModal;
