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
      <Flex>
        <Box flex='1'>
          <Flex>
            <Center>
              <Text>Cr File No:</Text>
              <Editable
                onChange={(nextValue) =>
                  handleOnChange(nextValue, cr_fileNo.current.id)
                }
                defaultValue={data.cr_fileNo ? data.cr_fileNo : 'None'}>
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
                defaultValue={data.plate_no ? data.plate_no : 'None'}>
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
                defaultValue={data.engine_no ? data.engine_no : 'None'}>
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
                defaultValue={data.chasis_no ? data.chasis_no : 'None'}>
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
                defaultValue={data.case_no ? data.case_no : 'None'}>
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
                defaultValue={data.make ? data.make : 'None'}
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
                defaultValue={data.year_model ? data.year_model : 'None'}>
                <EditablePreview />
                <EditableInput id='year_model' ref={year_model} />
              </Editable>
            </Center>
          </Flex>
          <Flex>
            <Center>
              <Text>Color:</Text>
              <Editable
                defaultValue={data.color ? data.color : 'None'}
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
                  handleOnChange(nextValue, franchise_valid_date.current.id)
                }
                defaultValue={
                  data.franchise_valid_date ? data.franchise_valid_date : 'None'
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
    </>
  );
};

export default JeepTab;
