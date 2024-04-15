import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import AdminLayout from '../components/AdminLayout';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Heading,
  Button,
  Spinner,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';
import { useReactToPrint } from 'react-to-print';
import DailyCapitalSharePdf from '../components/pdf/DailyCapitalSharePdf';
import DaysShareCapitalTable from '../components/DailyJues/DaysShareCapitalTable';
import { CSVLink } from 'react-csv';
const DailyCapitalShare = () => {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const queryClient = useQueryClient();
  const {
    getDailyCapitalShare,
    getDailyCapitalShareTotal,
    paginateDayShareCapital,
  } = useContext(AuthContext);
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);
  const printRef = useRef();
  const dateNow = moment().format('L').split('/');
  const momentYear = dateNow[2];
  const momentMonth = dateNow[0];
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState(momentMonth);
  const [year, setYear] = useState(momentYear);
  const [csvData, setCsvData] = useState([]);
  const {
    isSuccess,
    data: csvShareCapitalData,
    mutate: csvMutate,
    isLoading: csvIsloading,
    status: csvShareCapitalDataStatus,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/days/?month=${month}&year=${year}`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapital', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });

  const {
    isLoading: operator_total_isloading,
    isSuccess: operator_total_success,
    data: operator_total_data,
    mutate: operator_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=OPERATOR`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalOperatorTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: asso_operator_total_isloading,
    isSuccess: asso_operator_total_success,
    data: asso_operator_total_data,
    mutate: asso_operator_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=ASSOCIATE_OPERATOR`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalAssoOperatorTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: driver_total_isloading,
    isSuccess: driver_total_success,
    data: driver_total_data,
    mutate: driver_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=DRIVER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitaldriverTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: sub_driver_total_isloading,
    isSuccess: sub_driver_total_success,
    data: sub_driver_total_data,
    mutate: sub_driver_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=SUBTITUTE_DRIVER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalSubDriverTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: barker_total_isloading,
    isSuccess: barker_total_success,
    data: barker_total_data,
    mutate: barker_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=BARKER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalBarkerTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: regular_member_total_isloading,
    isSuccess: regular_member_total_success,
    data: regular_member_total_data,
    mutate: regular_member_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=REGULAR_MEMBER`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalRegularMemberTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: barkers_boundary_total_isloading,
    isSuccess: barkers_boundary_total_success,
    data: barkers_boundary_total_data,
    mutate: barkers_boundary_total_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=BARKERS_BOUNDARY`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalBarkersBoundaryTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: subTotal_total_isloading,
    isSuccess: subTotal_success,
    data: subTotal_data,
    mutate: subTotal_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=SUBTOTAL`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalSubTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });
  const {
    isLoading: grandTotal_total_isloading,
    isSuccess: grandTotal_success,
    data: grandTotal_data,
    mutate: grandTotal_mutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=GRANDTOTAL`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['csvShareCapitalGrandTotal', { year: year, month: month }],
        () => {
          return data;
        }
      );
    },
  });

  const transformData = (data, member_status) => {
    if (
      member_status === 'BARKER_BOUNDARY' ||
      member_status === 'BARKER' ||
      member_status === 'REGULAR_MEMBER'
    ) {
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
          item.day1,
          item.day2,
          item.day3,
          item.day4,
          item.day5,
          item.day6,
          item.day7,
          item.day8,
          item.day9,
          item.day10,
          item.day11,
          item.day12,
          item.day13,
          item.day14,
          item.day15,
          item.day16,
          item.day17,
          item.day18,
          item.day19,
          item.day20,
          item.day21,
          item.day22,
          item.day23,
          item.day24,
          item.day25,
          item.day26,
          item.day27,
          item.day28,
          item.day29,
          item.day30,
          item.day31,
          item.total,
        ]);
      return filtered;
    } else {
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
          item.day1,
          item.day2,
          item.day3,
          item.day4,
          item.day5,
          item.day6,
          item.day7,
          item.day8,
          item.day9,
          item.day10,
          item.day11,
          item.day12,
          item.day13,
          item.day14,
          item.day15,
          item.day16,
          item.day17,
          item.day18,
          item.day19,
          item.day20,
          item.day21,
          item.day22,
          item.day23,
          item.day24,
          item.day25,
          item.day26,
          item.day27,
          item.day28,
          item.day29,
          item.day30,
          item.day31,
          item.total,
          item.total / 2,
          item.total / 2,
        ]);
      return filtered;
    }
  };
  const transformTotal = (memberStatus, title, data) => {
    if (
      memberStatus === 'BARKER_BOUNDARY' ||
      memberStatus === 'BARKER' ||
      memberStatus === 'REGULAR_MEMBER' ||
      memberStatus === 'SUBTOTAL' ||
      memberStatus === 'GRANDTOTAL'
    ) {
      const transformedArray = [data].map((item) => [
        '',
        `${title}`,
        item.day1_total,
        item.day2_total,
        item.day3_total,
        item.day4_total,
        item.day5_total,
        item.day6_total,
        item.day7_total,
        item.day8_total,
        item.day9_total,
        item.day10_total,
        item.day11_total,
        item.day12_total,
        item.day13_total,
        item.day14_total,
        item.day15_total,
        item.day16_total,
        item.day17_total,
        item.day18_total,
        item.day19_total,
        item.day20_total,
        item.day21_total,
        item.day22_total,
        item.day23_total,
        item.day24_total,
        item.day25_total,
        item.day26_total,
        item.day27_total,
        item.day28_total,
        item.day29_total,
        item.day30_total,
        item.day31_total,
        item.total,
      ]);
      return transformedArray;
    } else {
      const transformedArray = [data].map((item) => [
        '',
        `${title}`,
        item.day1_total,
        item.day2_total,
        item.day3_total,
        item.day4_total,
        item.day5_total,
        item.day6_total,
        item.day7_total,
        item.day8_total,
        item.day9_total,
        item.day10_total,
        item.day11_total,
        item.day12_total,
        item.day13_total,
        item.day14_total,
        item.day15_total,
        item.day16_total,
        item.day17_total,
        item.day18_total,
        item.day19_total,
        item.day20_total,
        item.day21_total,
        item.day22_total,
        item.day23_total,
        item.day24_total,
        item.day25_total,
        item.day26_total,
        item.day27_total,
        item.day28_total,
        item.day29_total,
        item.day30_total,
        item.day31_total,
        item.total,
        item.total / 2,
        item.total / 2,
      ]);
      return transformedArray;
    }
  };
  useEffect(() => {
    if (
      isSuccess &&
      operator_total_success &&
      asso_operator_total_success &&
      driver_total_success &&
      sub_driver_total_success &&
      barker_total_success &&
      regular_member_total_success &&
      barkers_boundary_total_success &&
      subTotal_success &&
      grandTotal_success
    ) {
      console.log('csvShareCapitalData?.data', csvShareCapitalData?.data);
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
      const barkersBoundaryTotal = transformTotal(
        'BARKER_BOUNDARY',
        'TOTAL',
        barkers_boundary_total_data.data
      );
      const subTotal = transformTotal(
        'SUBTOTAL',
        'SUBTOTAL',
        subTotal_data.data
      );
      const grandTotal = transformTotal(
        'GRANDTOTAL',
        'GRANDTOTAL',
        grandTotal_data.data
      );

      const operators = transformData(csvShareCapitalData?.data, 'OPERATOR');
      const asso_operators = transformData(
        csvShareCapitalData?.data,
        'ASSOCIATE_OPERATOR'
      );
      const driver = transformData(csvShareCapitalData?.data, 'DRIVER');
      const sub_driver = transformData(
        csvShareCapitalData?.data,
        'SUBTITUTE_DRIVER'
      );
      const barker = transformData(csvShareCapitalData?.data, 'BARKER');
      const regular_member = transformData(
        csvShareCapitalData?.data,
        'REGULAR_MEMBER'
      );
      const barkers_boundary = csvShareCapitalData?.data
        .filter((item) => {
          return (
            item.member_status === 'SM' || item.member_status === 'BAYANIHAN'
          );
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
          item.day1,
          item.day2,
          item.day3,
          item.day4,
          item.day5,
          item.day6,
          item.day7,
          item.day8,
          item.day9,
          item.day10,
          item.day11,
          item.day12,
          item.day13,
          item.day14,
          item.day15,
          item.day16,
          item.day17,
          item.day18,
          item.day19,
          item.day20,
          item.day21,
          item.day22,
          item.day23,
          item.day24,
          item.day25,
          item.day26,
          item.day27,
          item.day28,
          item.day29,
          item.day30,
          item.day31,
          item.total,
        ]);
      setCsvData([]);
      setCsvData((prev) => {
        return [
          ...prev,
          ['REGULAR OPERATOR'],
          [
            'NO.',
            'NAMES',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            'TOTAL',
            'OPERATION FEE',
            'SHARE CAPITAL',
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
        return [...prev, [], [], ['BARKER BOUNDARY']];
      });
      barkers_boundary?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      barkersBoundaryTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], []];
      });
      subTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      grandTotal?.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
    }
  }, [
    isSuccess,
    operator_total_success,
    asso_operator_total_success,
    driver_total_success,
    sub_driver_total_success,
    barker_total_success,
    regular_member_total_success,
    barkers_boundary_total_success,
    subTotal_success,
    grandTotal_success,
  ]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/paginated-day-capital-share/?year=${year}&month=${month}&page=${page}&search=${search}`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [
          'paginateShareCapital',
          { year: year, month: month, page: page, search: search },
        ],
        () => {
          return data;
        }
      );
    },
  });

  const handleNextPage = () => {
    setPage(page + 1);
    mutate();
  };
  const handlePrevPage = () => {
    setPage((prev) => {
      return prev - 1;
    });
    mutate();
  };
  const handleChangeDate = ([year, month, day]) => {
    setYear(year);
    setMonth(month);
    mutate();
    csvMutate();
    operator_total_mutate();
    asso_operator_total_mutate();
    driver_total_mutate();
    sub_driver_total_mutate();
    barker_total_mutate();
    regular_member_total_mutate();
    barkers_boundary_total_mutate();
    subTotal_mutate();
    grandTotal_mutate();
  };
  const handleSearch = async (e) => {
    setSearch(e);
    mutate();
  };

  return (
    <AdminLayout>
      {csvIsloading &&
        operator_total_isloading &&
        asso_operator_total_isloading &&
        driver_total_isloading &&
        sub_driver_total_isloading &&
        barker_total_isloading &&
        regular_member_total_isloading &&
        barkers_boundary_total_isloading &&
        subTotal_total_isloading &&
        grandTotal_total_isloading && <Spinner />}

      {isSuccess &&
        operator_total_success &&
        asso_operator_total_success &&
        driver_total_success &&
        sub_driver_total_success &&
        regular_member_total_success &&
        barker_total_success &&
        barkers_boundary_total_success &&
        subTotal_success &&
        grandTotal_success && <CSVLink data={csvData}>Download</CSVLink>}
      {/* <CSVLink data={csvData}>Download</CSVLink> */}

      <Toaster position='top-right' reverseOrder={false} />
      <Box>
        <Heading>Daily Capital Share</Heading>
      </Box>
      <Editable
        defaultValue='Search'
        onSubmit={(e) => {
          handleSearch(e);
        }}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <input
        type='date'
        onChange={(e) => handleChangeDate(e.target.value.split('-'))}
      />
      <DaysShareCapitalTable
        page={page}
        search={search}
        setMonth={setMonth}
        setYear={setYear}
        month={month}
        year={year}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </AdminLayout>
  );
};

export default DailyCapitalShare;
