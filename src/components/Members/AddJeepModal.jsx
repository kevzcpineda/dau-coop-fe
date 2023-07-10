import React, { useState, useRef } from 'react';
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
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import axios from 'axios';

const AddJeepModal = ({ id, isOpen, onClose }) => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/createJeep/?user_id=${id}`, payload);
    },
    onError: (error, variables, context) => {
      toast.error(`Error ${error} `);
    },
    onSuccess: () => {
      crFileNo.current.value = '';
      plateNo.current.value = '';
      engineNo.current.value = '';
      chasisNo.current.value = '';
      caseNo.current.value = '';
      make.current.value = '';
      yearModel.current.value = '';
      color.current.value = '';
      franchiseValidDate.current.value = '';
      toast.success('Jeep Successfully Added!');
      onClose();
    },
  });

  const crFileNo = useRef();
  const plateNo = useRef();
  const engineNo = useRef();
  const chasisNo = useRef();
  const caseNo = useRef();
  const make = useRef();
  const yearModel = useRef();
  const color = useRef();
  const franchiseValidDate = useRef();

  const jeepSchema = z.object({
    cr_fileNo: z.string(),
    plate_no: z.string(),
    engine_no: z.string(),
    chasis_no: z.string(),
    case_no: z.string(),
    make: z.string(),
    year_model: z.string(),
    color: z.string(),
    franchise_valid_date: z.string(),
  });

  const handleAddJeep = async () => {
    const jeepValidate = jeepSchema.safeParse({
      cr_fileNo: crFileNo.current.value === '' ? null : crFileNo.current.value,
      plate_no: plateNo.current.value === '' ? null : plateNo.current.value,
      engine_no: engineNo.current.value === '' ? null : engineNo.current.value,
      chasis_no: chasisNo.current.value === '' ? null : chasisNo.current.value,
      case_no: caseNo.current.value === '' ? null : caseNo.current.value,
      make: make.current.value === '' ? null : make.current.value,
      year_model:
        yearModel.current.value === '' ? null : yearModel.current.value,
      color: color.current.value === '' ? null : color.current.value,
      franchise_valid_date:
        franchiseValidDate.current.value === ''
          ? null
          : franchiseValidDate.current.value,
    });
    if (!jeepValidate.success) {
      jeepValidate.error.issues.map((item) => {
        toast.error(`Error ${item.path[0]} ${item.message}:`);
      });
    } else {
      mutate(jeepValidate.data);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Jeep</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>cr_fileNo</FormLabel>
              <Input ref={crFileNo} />
            </FormControl>
            <FormControl>
              <FormLabel>plate_no</FormLabel>
              <Input ref={plateNo} />
            </FormControl>
            <FormControl>
              <FormLabel>engine_no</FormLabel>
              <Input ref={engineNo} />
            </FormControl>
            <FormControl>
              <FormLabel>chasis_no</FormLabel>
              <Input ref={chasisNo} />
            </FormControl>
            <FormControl>
              <FormLabel>case_no</FormLabel>
              <Input ref={caseNo} />
            </FormControl>
            <FormControl>
              <FormLabel>make</FormLabel>
              <Input ref={make} />
            </FormControl>
            <FormControl>
              <FormLabel>year_model</FormLabel>
              <Input ref={yearModel} />
            </FormControl>
            <FormControl>
              <FormLabel>color</FormLabel>
              <Input ref={color} />
            </FormControl>
            <FormControl>
              <FormLabel>franchise_valid_date</FormLabel>
              <Input type='date' ref={franchiseValidDate} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {isLoading ? (
              <Button colorScheme='blue' isLoading>
                Loading
              </Button>
            ) : (
              <Button colorScheme='blue' onClick={() => handleAddJeep()}>
                Add Jeep
              </Button>
            )}
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddJeepModal;
