import React, { useContext, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
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
import ChangePasswordModal from '../components/Members/ChangePasswordModal';
import LoanModal from '../components/Members/LoanModal';
import AddJeepModal from '../components/Members/AddJeepModal';
import MemberTable from '../components/Members/MemberTable';
import ShareCapitalModal from '../components/Members/ShareCapitalModal';

const Members = () => {
  const {
    isOpen: shareCapitalIsOpen,
    onOpen: shareCapitalOnOpen,
    onClose: shareCapitalOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const {
    isOpen: changePasswordIsOpen,
    onOpen: changePasswordOnOpen,
    onClose: changePasswordOnClose,
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
  const handleLoan = (amount, voucher, promissory, check, status) => {
    createLoan(id, amount, voucher, promissory, check, status);
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
  const handleChangePasswordModal = (e, id) => {
    e.stopPropagation();
    changePasswordOnOpen();
    setId(id);
  };
  const handleAddShareCapitalModal = (e, id) => {
    e.stopPropagation();
    shareCapitalOnOpen();
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

  return (
    <AdminLayout>
      <Toaster position='top-right' reverseOrder={false} />
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
            handleChangePasswordModal={handleChangePasswordModal}
            handleAddShareCapitalModal={handleAddShareCapitalModal}
            users={searchData ? searchData : data}
            page={page}
            setPage={setPage}
            setId={setId}
          />
        )}
      </Box>
      {shareCapitalIsOpen && (
        <ShareCapitalModal
          onClose={shareCapitalOnClose}
          onOpen={shareCapitalOnOpen}
          isOpen={shareCapitalIsOpen}
          // users={searchData ? searchData : data}
          id={id}
        />
      )}
      {deleteIsOpen && (
        <DeleteModal
          onClose={deleteOnClose}
          onOpen={deleteOnOpen}
          isOpen={deleteIsOpen}
          users={searchData ? searchData : data}
          id={id}
        />
      )}
      {changePasswordIsOpen && (
        <ChangePasswordModal
          onClose={changePasswordOnClose}
          onOpen={changePasswordOnOpen}
          isOpen={changePasswordIsOpen}
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
          id={id}
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
