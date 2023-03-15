import React, { useState } from 'react';
import { useUser } from '../../states/User';
import Select from 'react-dropdown-select';

const UserDropdown = ({ handleChange }) => {
  const { users } = useUser((state) => state);
  // const options = [
  //   {
  //     value: 1,
  //     label: 'Leanne Graham',
  //   },
  //   {
  //     value: 2,
  //     label: 'Ervin Howell',
  //   },
  // ];

  const options = users;

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

export default UserDropdown;
