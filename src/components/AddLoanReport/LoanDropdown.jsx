import React, { useState, forwardRef } from 'react';
import { useLoan } from '../../states/Loan';
// import Select from 'react-dropdown-select';
import Select from 'react-select';
const LoanDropdown = forwardRef((props, ref) => {
  // const { loans } = useLoan((state) => state);
  // const notDoneLoan = loans.filter((item) => item.is_fully_paid === false);
  // const options = data;

  const options = props.data.map((item) => {
    return {
      value: item.id,
      label: item.first_name + ' ' + item.last_name + ' --- ' + item.balance,
      ...item,
    };
  });
  return (
    <Select
      ref={ref}
      options={options}
      value={props.data.id}
      label={props.data.first_name}
      onChange={(e) => props.handleChange(e)}
    />
    // <Select
    //   options={options}
    //   labelField=options.first_name + options.last_name
    //   valueField='id'
    //   clearOnSelect='true'
    //   clearable='true'
    //   searchBy='first_name'
    //   onChange={(values) => handleChange(values[0])}
    // />
  );
});

export default LoanDropdown;
