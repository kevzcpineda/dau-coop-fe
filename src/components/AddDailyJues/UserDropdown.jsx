import React, { useState } from 'react';
import { useUser } from '../../states/User';
import Select from 'react-select';

const UserDropdown = ({ handleChange, data }) => {
  const options = data.map((item) => {
    return {
      value: item.id,
      label: item.first_name + ' ' + item.last_name,
      ...item,
    };
  });

  return (
    <Select
      options={options}
      value={data.id}
      label={data.first_name}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default UserDropdown;
