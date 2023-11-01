import React, { useContext } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  StackDivider,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  TableContainer,
  Grid,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { ArrowBackIcon } from '@chakra-ui/icons';
import AuthContext from '../context/AuthContext';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import userImage from '../assets/default_user_image.png';
import UserLayout from '../components/UserLayout';

const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Daily Dues', icon: FiTrendingUp, route: '/dailyDues' },
];

export default function UserJeep({ children, userData, loanData }) {
  const { getUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });
  console.log('jeep', data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <UserLayout>
      {status === 'loading' && (
        <Flex alignItems='center' justifyContent='center' height='100vh'>
          <Spinner
            thickness='10px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            style={{ width: '150px', height: '150px' }}
          />
        </Flex>
      )}
      {status === 'error' && <div>error...</div>}
      {status === 'success' && (
        <Tabs>
          <TabList>
            {data.data.jeep_id.map((item) => {
              return <Tab>{item.plate_no}</Tab>;
            })}
          </TabList>

          <TabPanels>
            {data.data.jeep_id.map((item) => {
              return (
                <TabPanel>
                  <Grid
                    templateColumns='repeat(2, 1fr)'
                    gap={6}
                    sx={{ paddingBottom: '100px' }}>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Cr File No.</FormLabel>
                      <Input
                        placeholder={item.cr_fileNo}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Plate No.</FormLabel>
                      <Input
                        placeholder={item.plate_no}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Engine No.</FormLabel>
                      <Input
                        placeholder={item.engine_no}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Chasis No.</FormLabel>
                      <Input
                        placeholder={item.chasis_no}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Case No.</FormLabel>
                      <Input
                        placeholder={item.case_no}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Make</FormLabel>
                      <Input
                        placeholder={item.make}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Color</FormLabel>
                      <Input
                        placeholder={item.color}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Year Model</FormLabel>
                      <Input
                        placeholder={item.year_model}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                    <FormControl isReadOnly={true}>
                      <FormLabel>Franchise Valid Date</FormLabel>
                      <Input
                        placeholder={item.franchise_valid_date}
                        sx={{
                          backgroundColor: 'gray.100',
                          fontSize: '18px',
                          // fontWeight: '500',
                        }}
                        _placeholder={{ color: 'black' }}
                      />
                    </FormControl>
                  </Grid>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      )}
    </UserLayout>
    //   </Box>
    // </Box>
  );
}
