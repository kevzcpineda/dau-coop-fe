import React, { useState, useEffect, useContext } from 'react';
import { useLoan } from '../states/Loan';
import AuthContext from '../context/AuthContext';

const UserLoan = () => {
  const { token } = useLoan((state) => state);
  const { getUserLoan } = useContext(AuthContext);
  const [userLoan, setUserLoan] = useState({});

  const getLoan = async () => {
    const userLoan = await getUserLoan(token);
    setUserLoan(userLoan);
  };
  useEffect(() => {
    getLoan();
  }, []);
  return (
    <div>
      <h1>{userLoan.first_name}</h1>
    </div>
  );
};

export default UserLoan;
