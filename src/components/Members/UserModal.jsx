import React, { useState, useEffect, useContext, useRef } from 'react';
import User from './User';
import UserTab from './UserTab';
import JeepTab from './JeepTab';
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
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../../states/User';
import AuthContext from '../../context/AuthContext';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const UserModal = ({ id, isOpen, onClose }) => {
  const { editUser, getUser, editJeep } = useContext(AuthContext);
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

  const { data, status } = useQuery({
    queryKey: ['user', id],
    queryFn: () => {
      return axios.get(`${baseURL}/userDetail/${id}/`);
    },
  });

  const [tabIndex, setTabIndex] = useState(0);

  const queryClient = useQueryClient();
  const { isLoading: userIsLoading, mutate: mutateUser } = useMutation({
    mutationFn: ({ id, ...payload }) => {
      axios.put(`${baseURL}/userDetail/${id}/`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user', id]);
      queryClient.invalidateQueries(['members']);
      toast.success('Edit Successfully!');
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });

  const { isLoading: jeepIsLoading, mutate: jeepMutate } = useMutation({
    mutationFn: ({ id, ...payload }) => {
      axios.put(`${baseURL}/jeep/${id}/`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user', id]);
      queryClient.invalidateQueries(['members']);
      toast.success('Edit Successfully!');
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });

  'USERS', data;
  const userTabRef = useRef();
  const jeepTabRef = useRef();
  const [userPayload, setUserPayload] = useState({
    id: id,
  });
  const [jeepPayload, setJeepPayload] = useState({});
  const handleOnChangeUser = (val, name) => {
    'changeeee', val, name;
    setUserPayload((prev) => {
      return { ...prev, [name]: val };
    });
  };
  const handleOnChangeJeep = (val, name) => {
    'changeeee', val, name;
    setJeepPayload((prev) => {
      return { ...prev, [name]: val };
    });
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === 'loading' && <Spinner />}
            {status === 'error' && <div>error...</div>}
            {status === 'success' && (
              <Tabs onChange={(index) => setTabIndex(index)}>
                <TabList>
                  <Tab>User</Tab>
                  {data &&
                    data.data?.jeep_id?.map((item, index) => {
                      return (
                        <Tab key={item.id} value={item.id} ref={jeepTabRef}>
                          jeep{index + 1}
                        </Tab>
                      );
                    })}
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <UserTab
                      data={data.data}
                      handleOnChange={handleOnChangeUser}
                    />
                  </TabPanel>
                  {data?.data?.jeep_id ? (
                    <JeepTab
                      data={data.data.jeep_id}
                      handleOnChange={handleOnChangeJeep}
                    />
                  ) : null}
                </TabPanels>
              </Tabs>
            )}
          </ModalBody>
          <ModalFooter>
            {tabIndex === 0 ? (
              <Button onClick={() => mutateUser(userPayload)}>Save User</Button>
            ) : (
              <Button
                onClick={() =>
                  jeepMutate({ id: jeepTabRef.current.value, ...jeepPayload })
                }>
                Save Jeep
              </Button>
            )}
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserModal;
