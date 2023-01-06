import React, { useContext, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import { useUser } from '../states/User';
import { useLoan } from '../states/Loan';
import UserModal from '../components/Members/UserModal';
import DeleteModal from '../components/Members/DeleteModal';
import LoanModal from '../components/Members/LoanModal';
import AddJeepModal from '../components/Members/AddJeepModal';
import EditModal from '../components/Members/EditModal';
import MemberTable from '../components/Members/MemberTable';

const Members = () => {
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const {
    isOpen: loanIsOpen,
    onOpen: loanOnOpen,
    onClose: loanOnClose,
  } = useDisclosure();
  const {
    isOpen: jeepIsOpen,
    onOpen: jeepOnOpen,
    onClose: jeepOnClose,
  } = useDisclosure();
  const {
    isOpen: userIsOpen,
    onOpen: userOnOpen,
    onClose: userOnClose,
  } = useDisclosure();

  // const { getUsers } = useContext(AuthContext);
  const [Users, setUsers] = useState([]);
  const [id, setId] = useState(null);

  const {
    getUsers,
    getUser,
    users,
    deleteUser,
    editUser,
    createJeep,
    token,
    setUserId,
  } = useUser((state) => state);

  const [filterUser, setFilterUser] = useState({});

  const { createLoan } = useLoan((state) => state);

  // functions

  const handleLoanModal = (e, id) => {
    // stopPropagation - para hindi ma trigger yung parent function - handleUserModal
    e.stopPropagation();
    setId(id);
    loanOnOpen();
  };
  const handleLoan = (amount) => {
    createLoan(id, amount);
    loanOnClose();
  };
  const handleDeleteUser = () => {
    deleteUser(id);
    const newUser = users.filter((user) => user.id !== id);
    setUsers(newUser);
    deleteOnClose();
  };

  const handledeleteModal = (e, id) => {
    e.stopPropagation();
    deleteOnOpen();
    setId(id);
  };

  const handleJeepModal = (e, id) => {
    e.stopPropagation();
    setId(id);
    jeepOnOpen();
  };

  const handleUserModal = async (id) => {
    setId(id);
    // await setUserId(id);
    // await getUser(id);
    const userFind = users.find((item) => item.id === id);
    console.log(userFind);
    setFilterUser(userFind);
    userOnOpen();
  };

  const handleAddJeep = async (crFileNo) => {
    await createJeep(
      id,
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
  };

  const { data, status } = useQuery('members', getUsers);

  return (
    <AdminLayout>
      <Box>
        <Heading>Members</Heading>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && (
          <MemberTable
            handleUserModal={handleUserModal}
            handledeleteModal={handledeleteModal}
            handleLoanModal={handleLoanModal}
            handleJeepModal={handleJeepModal}
          />
        )}
      </Box>
      {deleteIsOpen && (
        <DeleteModal
          onClose={deleteOnClose}
          onOpen={deleteOnOpen}
          isOpen={deleteIsOpen}
          handleDeleteUser={handleDeleteUser}
        />
      )}

      {loanIsOpen && (
        <LoanModal
          onClose={loanOnClose}
          onOpen={loanOnOpen}
          isOpen={loanIsOpen}
          handleLoan={handleLoan}
        />
      )}

      {jeepIsOpen && (
        <AddJeepModal
          onClose={jeepOnClose}
          onOpen={jeepOnOpen}
          isOpen={jeepIsOpen}
          id={id}
          handleAddJeep={handleAddJeep}
        />
      )}

      {userIsOpen && (
        <UserModal
          onClose={userOnClose}
          onOpen={userOnOpen}
          isOpen={userIsOpen}
          id={id}
          filterUser={filterUser}
        />
      )}
    </AdminLayout>
  );
};

export default Members;
