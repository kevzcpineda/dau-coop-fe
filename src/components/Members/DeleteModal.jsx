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

const DeleteModal = (props) => {
  const { deleteUser } = useUser((state) => state);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('members');
      props.onClose();
    },
  });
  const handleDeleteUser = () => {
    mutate(props.id);
  };
  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            delete
            {isLoading && <div>deleting user..</div>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => handleDeleteUser()}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteModal;
