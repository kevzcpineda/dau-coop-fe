import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../states/User';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
const ReducePenaltyModal = ({ id, onClose, isOpen }) => {
  const { adminChangePassword } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { deleteUser } = useUser((state) => state);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/loan/penalty/`, payload);
    },
    onSuccess: () => {
      onClose();
      toast.success('Successfully Changed Password');
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });
  const payload = {
    loan_id: id,
    penalty_amount: input,
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reduce Penalty</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='Amount'
              onChange={(e) => setInput(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            {isLoading ? (
              <Button isLoading colorScheme='blue' mr={3}>
                Loading
              </Button>
            ) : (
              <Button colorScheme='blue' mr={3} onClick={() => mutate(payload)}>
                Submit
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

export default ReducePenaltyModal;
