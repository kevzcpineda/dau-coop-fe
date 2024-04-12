import React, { useContext, useEffect, useState, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
  Spinner,
} from '@chakra-ui/react';
import { useDailyJues } from '../states/Daily_jues';
import DailyJuesTable from '../components/DailyJues/DailyJuesTable';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import transformNumber from '../utils/transformNumber';
const DailyJues = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { getLedger } = useContext(AuthContext);
  const dateNow = moment().format('L').split('/');
  const yearNow = dateNow[2];
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [year, setYear] = useState(yearNow);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [csvData, setCsvData] = useState([]);

  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ['legger', { year: year, page: page, search: search }],
    queryFn: () => getLedger(year, page, search),
    keepPreviousData: true,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/ledger/?year=${year}&page=${page}&search=${search}`
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ['legger', { year: year, page: page, search: search }],
        data
      );
    },
  });
  const {
    isSuccess: csvLedgerSuccess,
    data: csvLedgerData,
    mutate: csvLedgerMutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/ledger-no-pagination/?year=${year}`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['csvLedger', { year: year }], () => {
        return data;
      });
    },
  });
  const {
    isSuccess: operator_total_success,
    data: operator_total_data,
    mutate: operator_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/monthly_total/?year=${year}&member_status=OPERATOR`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalOperatorTotal', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isSuccess: asso_operator_total_success,
    data: asso_operator_total_data,
    mutate: asso_operator_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/monthly_total/?year=${year}&member_status=ASSOCIATE_OPERATOR`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalAssoOperatorTotal', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isSuccess: driver_total_success,
    data: driver_total_data,
    mutate: driver_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/monthly_total/?year=${year}&member_status=DRIVER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitaldriverTotal', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isSuccess: sub_driver_total_success,
    data: sub_driver_total_data,
    mutate: sub_driver_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/monthly_total/?year=${year}&member_status=SUBTITUTE_DRIVER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalSubDriverTotal', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isSuccess: barker_total_success,
    data: barker_total_data,
    mutate: barker_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/monthly_total/?year=${year}&member_status=BARKER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalBarkerTotal', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isSuccess: regular_member_total_success,
    data: regular_member_total_data,
    mutate: regular_member_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/monthly_total/?year=${year}&member_status=REGULAR_MEMBER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalRegularMemberTotal', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isSuccess: subTotal_success,
    data: subTotal_data,
    mutate: subTotal_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/monthly_total/?year=${year}&member_status=SUBTOTAL`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalSubTotal', { year: year }],
        () => {
          return data;
        }
      );
    },
  });
  console.log('subTotal_data', subTotal_data);
  const handleChange = (datechange) => {
    setYear(datechange);
    mutate();
    csvLedgerMutate();
    operator_total_mutate();
    asso_operator_total_mutate();
    driver_total_mutate();
    sub_driver_total_mutate();
    barker_total_mutate();
    regular_member_total_mutate();
    subTotal_mutate();
  };
  const handleNextPage = () => {
    setPage((prev) => {
      return prev + 1;
    });
    mutate();
  };
  const handlePrevPage = () => {
    setPage((prev) => {
      return prev - 1;
    });
    mutate();
  };
  const handleSearch = (e) => {
    setSearch(e);
    mutate();
  };
  const transformTotal = (memberStatus, title, data) => {
    if (
      memberStatus === 'BARKER' ||
      memberStatus === 'REGULAR_MEMBER' ||
      memberStatus === 'SUBTOTAL'
    ) {
      const transformedArray = [data].map((item) => [
        '',
        `${title}`,
        item.year,
        item.january_total,
        item.year + item.january_total,
        item.febuary_total,
        item.year + item.january_total + item.febuary_total,
        item.march_total,
        item.year + item.january_total + item.febuary_total + item.march_total,
        item.april_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total,
        item.may_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total,
        item.june_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total,
        item.july_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total,
        item.august_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total,
        item.september_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total,
        item.october_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total,
        item.november_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total +
          item.november_total,
        item.december_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total +
          item.november_total +
          item.december_total,
      ]);
      return transformedArray;
    } else {
      const transformedArray = [data].map((item) => [
        '',
        `${title}`,
        item.year,
        item.january_total,
        item.year + item.january_total,
        item.febuary_total,
        item.year + item.january_total + item.febuary_total,
        item.march_total,
        item.year + item.january_total + item.febuary_total + item.march_total,
        item.april_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total,
        item.may_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total,
        item.june_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total,
        item.july_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total,
        item.august_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total,
        item.september_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total,
        item.october_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total,
        item.november_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total +
          item.november_total,
        item.december_total,
        item.year +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total +
          item.november_total +
          item.december_total,
      ]);
      return transformedArray;
    }
  };
  const transformData = (data, member_status) => {
    const filtered = data
      .filter((item) => {
        return item.member_status === member_status;
      })
      .sort((a, b) => {
        const lastNameComparison = a.last_name.localeCompare(b.last_name);
        if (lastNameComparison === 0) {
          return a.first_name.localeCompare(b.first_name);
        }
        return lastNameComparison;
      })
      .map((item, index) => [
        index + 1,
        item.last_name + ' ' + item.first_name,
        transformNumber(item.beginning_capital),
        transformNumber(item.january),
        transformNumber(item.january_capital),
        transformNumber(item.february),
        transformNumber(item.feb_capital),
        transformNumber(item.march),
        transformNumber(item.march_capital),
        transformNumber(item.april),
        transformNumber(item.april_capital),
        transformNumber(item.may),
        transformNumber(item.may_capital),
        transformNumber(item.june),
        transformNumber(item.june_capital),
        transformNumber(item.july),
        transformNumber(item.july_capital),
        transformNumber(item.august),
        transformNumber(item.august_capital),
        transformNumber(item.september),
        transformNumber(item.september_capital),
        transformNumber(item.october),
        transformNumber(item.october_capital),
        transformNumber(item.november),
        transformNumber(item.november_capital),
        transformNumber(item.december),
        transformNumber(item.december_capital),
      ]);
    return filtered;
  };
  const transformSubTotalData = (data) => {
    const filtered = data.map((item, index) => [
      '',
      `SUBTOTAL`,
      transformNumber(item.year_total),
      transformNumber(item.january_total),
      transformNumber(item.year_total + item.january_total),
      transformNumber(item.febuary_total),
      transformNumber(
        item.year_total + item.january_total + item.febuary_total
      ),
      transformNumber(item.march_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total
      ),
      transformNumber(item.april_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total
      ),
      transformNumber(item.may_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total
      ),
      transformNumber(item.june_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total
      ),
      transformNumber(item.july_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total
      ),
      transformNumber(item.august_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total
      ),
      transformNumber(item.september_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total
      ),
      transformNumber(item.october_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total
      ),
      transformNumber(item.november_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total +
          item.november_total
      ),
      transformNumber(item.december_total),
      transformNumber(
        item.year_total +
          item.january_total +
          item.febuary_total +
          item.march_total +
          item.april_total +
          item.may_total +
          item.june_total +
          item.july_total +
          item.august_total +
          item.september_total +
          item.october_total +
          item.november_total +
          item.december_total
      ),
    ]);
    return filtered;
  };
  useEffect(() => {
    if (
      csvLedgerSuccess &&
      operator_total_success &&
      asso_operator_total_success &&
      driver_total_success &&
      sub_driver_total_success &&
      barker_total_success &&
      regular_member_total_success &&
      subTotal_success
    ) {
      const operatorsTotal = transformTotal(
        'OPERATOR',
        'TOTAL',
        operator_total_data.data
      );
      const assoOperatorsTotal = transformTotal(
        'ASSO_OPERATOR',
        'TOTAL',
        asso_operator_total_data.data
      );
      const driverTotal = transformTotal(
        'DRIVER',
        'TOTAL',
        driver_total_data.data
      );
      const subDriverTotal = transformTotal(
        'SUB_DRIVER',
        'TOTAL',
        sub_driver_total_data.data
      );
      const barkerTotal = transformTotal(
        'BARKER',
        'TOTAL',
        barker_total_data.data
      );
      const regularMemberTotal = transformTotal(
        'REGULAR_MEMBER',
        'TOTAL',
        regular_member_total_data.data
      );
      const operators = transformData(csvLedgerData?.data, 'OPERATOR');
      const asso_operators = transformData(
        csvLedgerData?.data,
        'ASSOCIATE_OPERATOR'
      );
      const driver = transformData(csvLedgerData?.data, 'DRIVER');
      const sub_driver = transformData(csvLedgerData?.data, 'SUBTITUTE_DRIVER');
      const barker = transformData(csvLedgerData?.data, 'BARKER');
      const regular_member = transformData(
        csvLedgerData?.data,
        'REGULAR_MEMBER'
      );
      const sub_total = transformTotal('SUBTOTAL', 'TOTAL', subTotal_data.data);
      setCsvData([]);
      setCsvData((prev) => {
        return [
          ...prev,
          ['REGULAR OPERATOR'],
          [
            'NO.',
            'NAMES',
            `BEGINNING BALANCE ${year - 1}`,
            `JAN ${year} PAYMENT`,
            `JAN ${year} BALANCE CAPITAL SHARE`,
            `FEB ${year} PAYMENT`,
            `FEB ${year} BALANCE CAPITAL SHARE`,
            `MARCH ${year} PAYMENT`,
            `MARCH ${year} BALANCE CAPITAL SHARE`,
            `APRIL ${year} PAYMENT`,
            `APRIL ${year} BALANCE CAPITAL SHARE`,
            `MAY ${year} PAYMENT`,
            `MAY ${year} BALANCE CAPITAL SHARE`,
            `JUNE ${year} PAYMENT`,
            `JUNE ${year} BALANCE CAPITAL SHARE`,
            `JULY ${year} PAYMENT`,
            `JULY ${year} BALANCE CAPITAL SHARE`,
            `AUG ${year} PAYMENT`,
            `AUG ${year} BALANCE CAPITAL SHARE`,
            `SEPT ${year} PAYMENT`,
            `SEPT ${year} BALANCE CAPITAL SHARE`,
            `OCT ${year} PAYMENT`,
            `OCT ${year} BALANCE CAPITAL SHARE`,
            `NOV ${year} PAYMENT`,
            `NOV ${year} BALANCE CAPITAL SHARE`,
            `DEC ${year} PAYMENT`,
            `DEC ${year} BALANCE CAPITAL SHARE`,
          ],
        ];
      });
      operators?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      operatorsTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['ASSOCIATE OPERATOR']];
      });
      asso_operators?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      assoOperatorsTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['REGULAR MEMBER']];
      });
      regular_member?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      regularMemberTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['REGULAR DRIVER']];
      });
      driver?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      driverTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['SUBTITUTE DRIVER']];
      });
      sub_driver?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      subDriverTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['BARKER']];
      });
      barker?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      barkerTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], []];
      });
      sub_total?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
    }
  }, [
    csvLedgerSuccess,
    operator_total_success,
    asso_operator_total_success,
    driver_total_success,
    sub_driver_total_success,
    barker_total_success,
    regular_member_total_success,
    subTotal_success,
  ]);
  return (
    <AdminLayout>
      <CSVLink data={csvData}>Download</CSVLink>

      <Box>
        <Editable defaultValue='Search' onSubmit={(e) => handleSearch(e)}>
          <EditablePreview />
          <EditableInput />
        </Editable>
        <input
          type='date'
          onChange={(e) => handleChange(e.target.value.slice(0, 4))}></input>
        <Heading>Daily Dues</Heading>
        {/* {isLoading && <Spinner />} */}
        {status === 'loading' && <Spinner />}
        {status === 'error' && <div>error...</div>}
        {status === 'success' && <DailyJuesTable data={data.data.results} />}
      </Box>
      <Button
        onClick={() => handlePrevPage()}
        isLoading={isLoading}
        isDisabled={data?.data?.previous === null}>
        Previous
      </Button>
      <Button
        onClick={() => handleNextPage()}
        isLoading={isLoading}
        isDisabled={data?.data?.next === null}>
        Next
      </Button>
    </AdminLayout>
  );
};

export default DailyJues;
