import React, { useState } from 'react';
import { useLoan } from '../../states/Loan';
import Select from 'react-dropdown-select';
const LoanDropdown = ({ handleChange }) => {
  const { loans } = useLoan((state) => state);
  const notDoneLoan = loans.filter((item) => item.is_fully_paid === false);
  const options = loans;
  return (
    <Select
      options={options}
      labelField='first_name'
      valueField='id'
      clearOnSelect='true'
      clearable='true'
      searchBy='first_name'
      onChange={(values) => handleChange(values[0])}
    />
  );
};

export default LoanDropdown;
