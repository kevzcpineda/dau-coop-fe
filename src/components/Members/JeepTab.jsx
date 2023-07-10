import React, { useRef } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Box,
  Spacer,
  Center,
  Text,
  Spinner,
} from '@chakra-ui/react';
const JeepTab = ({ data, handleOnChange }) => {
  const cr_fileNo = useRef();
  const plate_no = useRef();
  const engine_no = useRef();
  const chasis_no = useRef();
  const case_no = useRef();
  const make = useRef();
  const year_model = useRef();
  const color = useRef();
  const franchise_valid_date = useRef();

  return (
    <>
      {data.map((item, index) => {
        return (
          <TabPanel key={index}>
            <Flex>
              <Box flex='1'>
                <Flex>
                  <Center>
                    <Text>Cr File No:</Text>
                    <Editable
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, cr_fileNo.current.id)
                      }
                      defaultValue={item.cr_fileNo ? item.cr_fileNo : 'None'}>
                      <EditablePreview />
                      <EditableInput id='cr_fileNo' ref={cr_fileNo} />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Plate No:</Text>
                    <Editable
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, plate_no.current.id)
                      }
                      defaultValue={item.plate_no ? item.plate_no : 'None'}>
                      <EditablePreview />
                      <EditableInput id='plate_no' ref={plate_no} />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Engine No:</Text>
                    <Editable
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, engine_no.current.id)
                      }
                      defaultValue={item.engine_no ? item.engine_no : 'None'}>
                      <EditablePreview />
                      <EditableInput id='engine_no' ref={engine_no} />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Chasis No:</Text>
                    <Editable
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, chasis_no.current.id)
                      }
                      defaultValue={item.chasis_no ? item.chasis_no : 'None'}>
                      <EditablePreview />
                      <EditableInput id='chasis_no' ref={chasis_no} />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Case No:</Text>
                    <Editable
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, case_no.current.id)
                      }
                      defaultValue={item.case_no ? item.case_no : 'None'}>
                      <EditablePreview />
                      <EditableInput id='case_no' ref={case_no} />
                    </Editable>
                  </Center>
                </Flex>
              </Box>
              <Box flex='1'>
                <Flex>
                  <Center>
                    <Text>Make:</Text>
                    <Editable
                      defaultValue={item.make ? item.make : 'None'}
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, make.current.id)
                      }>
                      <EditablePreview />
                      <EditableInput id='make' ref={make} />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Year Model:</Text>
                    <Editable
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, year_model.current.id)
                      }
                      defaultValue={item.year_model ? item.year_model : 'None'}>
                      <EditablePreview />
                      <EditableInput id='year_model' ref={year_model} />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Color:</Text>
                    <Editable
                      defaultValue={item.color ? item.color : 'None'}
                      onChange={(nextValue) =>
                        handleOnChange(nextValue, color.current.id)
                      }>
                      <EditablePreview />
                      <EditableInput id='color' ref={color} />
                    </Editable>
                  </Center>
                </Flex>
                <Flex>
                  <Center>
                    <Text>Franchise Valid Date:</Text>
                    <Editable
                      onChange={(nextValue) =>
                        handleOnChange(
                          nextValue,
                          franchise_valid_date.current.id
                        )
                      }
                      defaultValue={
                        item.franchise_valid_date
                          ? item.franchise_valid_date
                          : 'None'
                      }>
                      <EditablePreview />
                      <EditableInput
                        id='franchise_valid_date'
                        ref={franchise_valid_date}
                      />
                    </Editable>
                  </Center>
                </Flex>
              </Box>
            </Flex>
          </TabPanel>
        );
      })}
    </>
  );
};

export default JeepTab;
