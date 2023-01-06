import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import logo from '../assets/noimage.png';
import AdminLayout from '../components/AdminLayout';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { createUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfMembership, setDateOfMembership] = useState(null);
  const [civilStatus, setCivilStatus] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [philhealthNumber, setPhilhealthNumber] = useState('');
  const [sssNumber, setSSSNumber] = useState('');
  const [memberStatus, setMemberStatus] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const response = await createUser({
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      // image
      age: age,
      birth_date: dateOfBirth,
      gender: gender,
      address: address,
      phone_no: phone,
      date_of_membership: dateOfMembership,
      civil_status: civilStatus,
      driver_license_no: driverLicenseNumber,
      height: height,
      weight: weight,
      blood_type: bloodType,
      philhealth_no: philhealthNumber,
      sss_no: sssNumber,
      member_status: memberStatus,
    });

    console.log('response', response);
  };

  return (
    <AdminLayout>
      <Box as='form' onSubmit={handleCreateUser}>
        <Grid templateColumns='repeat(4, 1fr)' gap={5}>
          <GridItem colSpan={1}>
            <Box>
              <Image boxSize='270px' objectFit='cover' src={logo} alt='image' />
            </Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input value={age} onChange={(e) => setAge(e.target.value)} />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type='date'
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Full Address</FormLabel>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Civil Status</FormLabel>
              <Input
                value={civilStatus}
                onChange={(e) => setCivilStatus(e.target.value)}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Date of Membership</FormLabel>
              <Input
                type='date'
                onChange={(e) => setDateOfMembership(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Driver Licinse Number</FormLabel>
              <Input
                value={driverLicenseNumber}
                onChange={(e) => setDriverLicenseNumber(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Member Status</FormLabel>
              <Input
                value={memberStatus}
                onChange={(e) => setMemberStatus(e.target.value)}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Height</FormLabel>
              <Input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Blood Type</FormLabel>
              <Input
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Philhealth No.</FormLabel>
              <Input
                value={philhealthNumber}
                onChange={(e) => setPhilhealthNumber(e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>SSS</FormLabel>
              <Input
                value={sssNumber}
                onChange={(e) => setSSSNumber(e.target.value)}
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Button type='submit' colorScheme='blue'>
          Submit
        </Button>
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;
