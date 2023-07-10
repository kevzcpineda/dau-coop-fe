import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../states/User';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const DeleteModal = ({ id, onClose, isOpen }) => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { deleteUser } = useUser((state) => state);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(deleteUser, {
    mutationFn: (id) => {
      return axios.delete(`${baseURL}/userDetail/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('members');
      onClose();
      toast.success('Successfully Deleted');
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });
  const handleDeleteUser = () => {
    mutate(id);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>delete</ModalBody>

          <ModalFooter>
            {isLoading ? (
              <Button isLoading colorScheme='blue' mr={3}>
                Loading
              </Button>
            ) : (
              <Button
                colorScheme='blue'
                mr={3}
                onClick={() => handleDeleteUser()}>
                Delete
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

export default DeleteModal;
