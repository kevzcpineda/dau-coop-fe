import React from 'react';
import { Select } from '@chakra-ui/react';
import { useUser } from '../../states/User';

const UserDropdown = React.forwardRef((props, ref) => {
  const { users } = useUser((state) => state);
  return (
    <Select
      ref={ref}
      placeholder='Select option'
      onChange={(e) => props.handleChange(e.target.value)}>
      {users &&
        users.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.first_name}
            </option>
          );
        })}
    </Select>
  );
});

export default UserDropdown;
