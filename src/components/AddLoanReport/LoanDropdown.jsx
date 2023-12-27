import React, { useState, forwardRef } from 'react';
import { useLoan } from '../../states/Loan';
// import Select from 'react-dropdown-select';
import Select from 'react-select';
const LoanDropdown = forwardRef((props, ref) => {
  function removeLastDuplicateFullName(arr) {
    let encounteredNames = {};

    for (let i = arr.length - 1; i >= 0; i--) {
      let fullName = arr[i].first_name + arr[i].last_name;

      if (encounteredNames[fullName]) {
        // If the name has been encountered before, remove the object
        arr.splice(i, 1);
      } else {
        // Mark the name as encountered
        encounteredNames[fullName] = true;
      }
    }

    return arr;
  }

  let firstUniqueObject = removeLastDuplicateFullName(props.data);

  console.log('removeLastDuplicateFullName', firstUniqueObject);
  const options = firstUniqueObject.map((item) => {
    return {
      value: item.id,
      label:
        item.first_name +
        ' ' +
        item.last_name +
        ' | Balance: ' +
        item.balance +
        ' | Penalty: ' +
        item.penalty,
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
