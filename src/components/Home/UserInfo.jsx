import React from 'react';

const UserInfo = () => {
  return (
    <Box pt={3}>
      <Grid templateColumns='repeat(4, 1fr)' gap={1}>
        <GridItem colSpan={1}>
          <Box>
            <Image
              boxSize='270px'
              objectFit='cover'
              src={
                userInfo.image
                  ? `https://web-production-94d8.up.railway.app${userInfo.image}`
                  : logo
              }
              alt='image'
            />
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
            <GridItem>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input placeholder={userInfo.first_name} isReadOnly />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder={userInfo.last_name} isReadOnly />
              </FormControl>
            </GridItem>
          </Grid>

          <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
            <GridItem>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input placeholder={userInfo.middle_name} isReadOnly />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input placeholder={userInfo.age} isReadOnly />
              </FormControl>
            </GridItem>
          </Grid>

          <Grid templateColumns='repeat(2, 1fr)' my={4} gap={5}>
            <GridItem>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Input placeholder={userInfo.gender} isReadOnly />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Input placeholder={userInfo.birth_date} isReadOnly />
              </FormControl>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
        <GridItem>
          <FormControl>
            <FormLabel>Full Address</FormLabel>
            <Input placeholder={userInfo.address} isReadOnly />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder={userInfo.phone_no} isReadOnly />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Civil Status</FormLabel>
            <Input placeholder={userInfo.civil_status} isReadOnly />
          </FormControl>
        </GridItem>
      </Grid>
      <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
        <GridItem>
          <FormControl>
            <FormLabel>Date of Membership</FormLabel>
            <Input placeholder={userInfo.date_of_membership} isReadOnly />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Driver Licinse Number</FormLabel>
            <Input placeholder={userInfo.driver_license_no} isReadOnly />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Member Status</FormLabel>
            <Input placeholder={userInfo.member_status} isReadOnly />
          </FormControl>
        </GridItem>
      </Grid>
      <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
        <GridItem>
          <FormControl>
            <FormLabel>Height</FormLabel>
            <Input placeholder={userInfo.height} isReadOnly />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Weight</FormLabel>
            <Input placeholder={userInfo.weight} isReadOnly />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Blood Type</FormLabel>
            <Input placeholder={userInfo.blood_type} isReadOnly />
          </FormControl>
        </GridItem>
      </Grid>
      <Grid templateColumns='repeat(3, 1fr)' my={4} gap={5}>
        <GridItem>
          <FormControl>
            <FormLabel>Philhealth No.</FormLabel>
            <Input placeholder={userInfo.philhealth_no} isReadOnly />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>SSS</FormLabel>
            <Input placeholder={userInfo.sss_no} isReadOnly />
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserInfo;
