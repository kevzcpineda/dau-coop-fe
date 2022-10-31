import React from 'react';
import { Image, Box, Grid, GridItem, Input, FormControl, FormLabel } from '@chakra-ui/react';
import logo from '../assets/noimage.png';
import AdminLayout from '../components/AdminLayout'

const Dashboard = () => {
  return (
    <AdminLayout>
      <Grid templateColumns='repeat(4, 1fr)' gap={1}>
          <GridItem colSpan={1}>
            <Box>
              <Image
                boxSize='270px'
                objectFit='cover'
                src={logo}
                alt='image'
              />
            </Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input placeholder="" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder="" />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>Middle Name</FormLabel>
                  <Input placeholder="" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input placeholder="" />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
              <GridItem>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input placeholder="" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input placeholder="" />
                </FormControl>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Full Address</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Civil Status</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Date of Membership</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Driver Licinse Number</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Member Status</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Height</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Blood Type</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Philhealth No.</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>SSS</FormLabel>
              <Input placeholder="" />
            </FormControl>
          </GridItem>
        </Grid>
    </AdminLayout>
  );
};

export default Dashboard;
