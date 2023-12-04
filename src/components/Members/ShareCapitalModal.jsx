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
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../states/User';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const ShareCapitalModal = ({ id, onClose, isOpen }) => {
  const [amount, setAmount] = useState(null);
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { deleteUser } = useUser((state) => state);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/daily_jues/share_capital/`, payload);
    },
    onSuccess: () => {
      onClose();
      toast.success('Successfully Added');
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });
  const handleAddShareCapital = () => {
    const payload = {
      user: id,
      amount: amount,
    };
    console.log(payload);
    mutate(payload);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Share Capital</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='Amount'
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </ModalBody>

          <ModalFooter>
            {isLoading ? (
              <Button isLoading colorScheme='blue' mr={3}>
                Loading
              </Button>
            ) : (
              <Button
                colorScheme='blue'
                mr={3}
                onClick={() => handleAddShareCapital()}>
                Add
              </Button>
            )}

            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShareCapitalModal;
