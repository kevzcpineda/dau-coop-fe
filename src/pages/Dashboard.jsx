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
  Select,
} from '@chakra-ui/react';
import logo from '../assets/noimage.png';
import AdminLayout from '../components/AdminLayout';
import AuthContext from '../context/AuthContext';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';

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

  const UserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string(),
    age: z.string(),
    dateOfBirth: z.string().optional().nullable(),
    gender: z.string().max(4).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    dateOfMembership: z.date().optional().nullable(),
    civilStatus: z.string().optional(),
    driverLicenseNumber: z.string(),
    height: z.string().optional(),
    weight: z.string().optional(),
    bloodType: z.string().optional(),
    philhealthNumber: z.string().optional(),
    sssNumber: z.string().optional(),
    memberStatus: z.string(),
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const userValidate = UserSchema.safeParse({
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      age: age,
      dateOfBirth: dateOfBirth,
      gender: gender,
      address: address,
      phone: phone,
      dateOfMembership: dateOfMembership,
      civilStatus: civilStatus,
      driverLicenseNumber: driverLicenseNumber,
      height: height,
      weight: weight,
      bloodType: bloodType,
      philhealthNumber: philhealthNumber,
      sssNumber: sssNumber,
      memberStatus: memberStatus,
    });

    console.log(userValidate);
    // if(!userValidate.success){
    //   toast.error(userValidate.error)
    // }else{
    //   const response = await createUser({
    //     first_name: userValidate.data.firstName,
    //     last_name: userValidate.data.lastName,
    //     middle_name: userValidate.data.middleName,
    //     // image
    //     age: userValidate.data.age,
    //     birth_date: userValidate.data.dateOfBirth,
    //     gender: userValidate.data.gender,
    //     address: userValidate.data.address,
    //     phone_no: userValidate.data.phone,
    //     date_of_membership: userValidate.data.dateOfMembership,
    //     civil_status: userValidate.data.civilStatus,
    //     driver_license_no: userValidate.data.driverLicenseNumber,
    //     height: userValidate.data.height,
    //     weight: userValidate.data.weight,
    //     blood_type: userValidate.data.bloodType,
    //     philhealth_no: userValidate.data.philhealthNumber,
    //     sss_no: userValidate.data.sssNumber,
    //     member_status: userValidate.data.memberStatus,
    //   });

    //   console.log('response', response);
    // }
  };

  return (
    <AdminLayout>
      <Toaster position='top-right' reverseOrder={false} />
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
              <Select
                placeholder='Select option'
                onChange={(e) => setMemberStatus(e.target.value)}>
                <option value='OPERATOR'>Operator</option>
                <option value='DRIVER'>Driver</option>
                <option value='ASSOCIATE_OPERATOR'>Associate Operator</option>
                <option value='SUBTITUTE_DRIVER'>Subtitute Driver</option>
                <option value='BARKER'>Barker</option>
              </Select>
              {/* <Input
                value={memberStatus}
                onChange={(e) => setMemberStatus(e.target.value)}
              /> */}
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
