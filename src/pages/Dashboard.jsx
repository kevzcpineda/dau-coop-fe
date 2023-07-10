import React, { useContext, useRef } from 'react';
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
import { useMutation } from 'react-query';
import logo from '../assets/noimage.png';
import AdminLayout from '../components/AdminLayout';
import AuthContext from '../context/AuthContext';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
const Dashboard = () => {
  const { createUser } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(`${baseURL}/createUser/`, payload);
    },
    onSuccess: (data, variables, context) => {
      ('OnSUCCESS');
      firstName.current.value = '';
      lastName.current.value = '';
      middleName.current.value = '';
      memberStatus.current.value = '';
      age.current.value = '';
      dateOfBirth.current.value = '';
      gender.current.value = '';
      address.current.value = '';
      phone.current.value = '';
      dateOfMembership.current.value = '';
      civilStatus.current.value = '';
      driverLicenseNumber.current.value = '';
      height.current.value = '';
      weight.current.value = '';
      bloodType.current.value = '';
      philhealthNumber.current.value = '';
      sssNumber.current.value = '';
      toast.success('Added Successfully!');
    },
    onError: (error, variables, context) => {
      ('Onerror');
      toast.error(`Error ${error} `);
    },
  });

  const firstName = useRef();
  const lastName = useRef();
  const middleName = useRef();
  const age = useRef();
  const dateOfBirth = useRef();
  const gender = useRef();
  const address = useRef();
  const phone = useRef();
  const dateOfMembership = useRef();
  const civilStatus = useRef();
  const driverLicenseNumber = useRef();
  const height = useRef();
  const weight = useRef();
  const bloodType = useRef();
  const philhealthNumber = useRef();
  const sssNumber = useRef();
  const memberStatus = useRef();

  const UserSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    middleName: z.string().optional().nullable(),
    age: z.string().optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    gender: z.string().max(4).optional().nullable(),
    address: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    dateOfMembership: z.string().optional().nullable(),
    civilStatus: z.string().optional().nullable(),
    driverLicenseNumber: z.string().optional().nullable(),
    height: z.string().optional().nullable(),
    weight: z.string().optional().nullable(),
    bloodType: z.string().optional().nullable(),
    philhealthNumber: z.string().optional().nullable(),
    sssNumber: z.string().optional().nullable(),
    memberStatus: z.string().min(1),
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const userValidate = UserSchema.safeParse({
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      middleName: middleName.current.value,
      age: age.current.value === '' ? null : age.current.value,
      dateOfBirth: dateOfBirth.current.value === '' ? null : age.current.value,
      gender: gender.current.value,
      address: address.current.value,
      phone: phone.current.value,
      dateOfMembership:
        dateOfMembership.current.value === '' ? null : age.current.value,
      civilStatus: civilStatus.current.value,
      driverLicenseNumber: driverLicenseNumber.current.value,
      height: height.current.value,
      weight: weight.current.value,
      bloodType: bloodType.current.value,
      philhealthNumber: philhealthNumber.current.value,
      sssNumber: sssNumber.current.value,
      memberStatus: memberStatus.current.value,
    });

    if (!userValidate.success) {
      userValidate.error.issues.map((item) => {
        toast.error(`Error in ${item.path[0]} ${item.message}:`);
      });
    } else {
      mutation.mutate({
        first_name: userValidate.data.firstName,
        last_name: userValidate.data.lastName,
        middle_name: userValidate.data.middleName,
        // image
        age: userValidate.data.age,
        birth_date: userValidate.data.dateOfBirth,
        gender: userValidate.data.gender,
        address: userValidate.data.address,
        phone_no: userValidate.data.phone,
        date_of_membership: userValidate.data.dateOfMembership,
        civil_status: userValidate.data.civilStatus,
        driver_license_no: userValidate.data.driverLicenseNumber,
        height: userValidate.data.height,
        weight: userValidate.data.weight,
        blood_type: userValidate.data.bloodType,
        philhealth_no: userValidate.data.philhealthNumber,
        sss_no: userValidate.data.sssNumber,
        member_status: userValidate.data.memberStatus,
      });
    }
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
                  <Input ref={firstName} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input ref={lastName} />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>Middle Name</FormLabel>
                  <Input ref={middleName} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input ref={age} />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input ref={gender} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type='date' ref={dateOfBirth} />
                </FormControl>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Full Address</FormLabel>
              <Input ref={address} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input ref={phone} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Civil Status</FormLabel>
              <Input ref={civilStatus} />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Date of Membership</FormLabel>
              <Input type='date' ref={dateOfMembership} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Driver Licinse Number</FormLabel>
              <Input ref={driverLicenseNumber} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Member Status</FormLabel>
              <Select ref={memberStatus} placeholder='Select option'>
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
              <Input ref={height} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input ref={weight} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Blood Type</FormLabel>
              <Input ref={bloodType} />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Philhealth No.</FormLabel>
              <Input ref={philhealthNumber} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>SSS</FormLabel>
              <Input ref={sssNumber} />
            </FormControl>
          </GridItem>
        </Grid>
        {mutation.isLoading ? (
          <Button
            isLoading
            type='submit'
            colorScheme='blue'
            loadingText='Loading'
            variant='outline'
            spinnerPlacement='start'>
            Submit
          </Button>
        ) : (
          <Button type='submit' colorScheme='blue'>
            Submit
          </Button>
        )}
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;
