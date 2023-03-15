import React, { useContext, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Heading,
  Spinner,
  useDisclosure,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import { useUser } from '../states/User';
import { useLoan } from '../states/Loan';
import UserModal from '../components/Members/UserModal';
import DeleteModal from '../components/Members/DeleteModal';
import LoanModal from '../components/Members/LoanModal';
import AddJeepModal from '../components/Members/AddJeepModal';
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

  const { getUsers, searchUser } = useContext(AuthContext);
  const [Users, setUsers] = useState([]);
  const [id, setId] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { users, deleteUser, createJeep, token, setUserId } = useUser(
    (state) => state
  );

  const { createLoan } = useLoan((state) => state);

  const queryClient = useQueryClient();
  // functions
  // const { data, isLoading, mutate } = useMutation(getUser, {
  //   onSuccess: () => {
  //     queryClient.setQueryData(['user', id]);
  //     userOnOpen();
  //   },
  // });

  // const { isLoading, mutate } = useMutation(deleteUser, {
  //   onSuccess: () => {
  //     // queryClient.setQueryData('members');
  //     queryClient.invalidateQueries('members');
  //     deleteOnClose();
  //   },
  // });

  const handleLoanModal = (e, id) => {
    // stopPropagation - para hindi ma trigger yung parent function - handleUserModal
    e.stopPropagation();
    setId(id);
    loanOnOpen();
  };
  const handleLoan = (amount, voucher, promissory, check) => {
    createLoan(id, amount, voucher, promissory, check);
    loanOnClose();
  };
  // const handleDeleteUser = () => {
  //   mutate(id);
  // };

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

  const handleUserModal = async (ids) => {
    await setId(ids);
    userOnOpen();
    // mutate(ids);
  };

  console.log('Member render');
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

  const handleSearch = async (e) => {
    await setSearch(e);
    mutate(e);
  };

  const { status, data } = useQuery(['members', page], () => getUsers(page), {
    keepPreviousData: true,
  });

  const { data: searchData, mutate } = useMutation(searchUser, {
    onSuccess: () => {
      queryClient.setQueryData(['search', search]);
    },
  });
  console.log(searchData);
  return (
    <AdminLayout>
      <Box>
        <Editable
          defaultValue='Search'
          onSubmit={(e) => {
            handleSearch(e);
          }}>
          <EditablePreview />
          <EditableInput />
        </Editable>

        <Heading>Members</Heading>

        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && (
          <MemberTable
            handleUserModal={handleUserModal}
            handledeleteModal={handledeleteModal}
            handleLoanModal={handleLoanModal}
            handleJeepModal={handleJeepModal}
            users={searchData ? searchData : data}
            page={page}
            setPage={setPage}
            setId={setId}
          />
        )}
      </Box>
      {deleteIsOpen && (
        <DeleteModal
          onClose={deleteOnClose}
          onOpen={deleteOnOpen}
          isOpen={deleteIsOpen}
          users={searchData ? searchData : data}
          id={id}
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
        />
      )}
    </AdminLayout>
  );
};

export default Members;
