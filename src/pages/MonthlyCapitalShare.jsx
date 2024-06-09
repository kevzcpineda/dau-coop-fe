import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import AuthContext from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Heading,
  Button,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Spinner,
} from '@chakra-ui/react';
import { useReactToPrint } from 'react-to-print';
import MonthlyCapitalSharePdf from '../components/pdf/MonthlyCapitalSharePdf';
import MonthlyShareCapitalTable from '../components/DailyJues/MonthlyShareCapitalTable';
import { CSVLink } from 'react-csv';
import transformNumber from '../utils/transformNumber';
import { useMontlyCsv } from '../hooks/useMonthlyCsv';
const MonthlyCapitalShare = () => {
  const queryClient = useQueryClient();
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const { getDailyCapitalShare } = useContext(AuthContext);
  const [isPrinting, setIsPrinting] = useState(false);
  const promiseResolveRef = useRef(null);
  const printRef = useRef();
  const dateNow = moment().format('L').split('/');
  const yearNow = dateNow[2];
  const [year, setYear] = useState(yearNow);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  // const [csvData, setCsvData] = useState([]);
  const [csvData, mutateAll, csvIsloading, csvIsSuccess] =
    useMontlyCsv(yearNow);
  console.log(csvData);
  // const { data, status } = useQuery({
  //   queryKey: ['dailyCapitalShare'],
  //   queryFn: getDailyCapitalShare,
  // });

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/paginated-monthly-capital-share/?year=${year}&page=${page}&search=${search}`
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [
          'paginatedMonthlyShareCapital',
          { year: year, page: page, search: search },
        ],
        () => {
          return data;
        }
      );
    },
  });

  const {
    isLoading: csvMonthlyPending,
    isSuccess: csvMonthlySuccess,
    data: csvMonthlyData,
    mutate: csvMonthlySutate,
  } = useMutation({
    mutationFn: () => {
      return axios.get(`${baseURL}/daily_jues/monthly/?year=${year}`);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['csvMonthly', { year: year }], () => {
        return data;
      });
    },
  });
  const {
    isLoading: operator_total_pending,
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
    isLoading: asso_operator_total_pending,
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
    isLoading: driver_total_pending,
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
    isLoading: sub_driver_total_pending,
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
    isLoading: barker_total_pending,
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
    isLoading: regular_member_total_pending,
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
  const handleChangeDate = ([year, month, day]) => {
    setYear(year);
    mutate();
    mutateAll();
    // csvMonthlySutate();
    // operator_total_mutate();
    // asso_operator_total_mutate();
    // driver_total_mutate();
    // sub_driver_total_mutate();
    // barker_total_mutate();
    // regular_member_total_mutate();
  };
  const handleSearch = (e) => {
    setSearch(e);
    mutate();
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
        transformNumber(item.year),
        transformNumber(item.january),
        transformNumber(item.febuary),
        transformNumber(item.march),
        transformNumber(item.april),
        transformNumber(item.may),
        transformNumber(item.june),
        transformNumber(item.july),
        transformNumber(item.august),
        transformNumber(item.september),
        transformNumber(item.october),
        transformNumber(item.november),
        transformNumber(item.december),
        transformNumber(item.total),
        transformNumber(item.total_capital_share),
      ]);
    return filtered;
  };

  const transformTotal = (memberStatus, title, data) => {
    if (memberStatus === 'BARKER' || memberStatus === 'REGULAR_MEMBER') {
      const transformedArray = [data].map((item) => [
        '',
        `${title}`,
        transformNumber(item.year),
        transformNumber(item.january_total),
        transformNumber(item.febuary_total),
        transformNumber(item.march_total),
        transformNumber(item.april_total),
        transformNumber(item.may_total),
        transformNumber(item.june_total),
        transformNumber(item.july_total),
        transformNumber(item.august_total),
        transformNumber(item.september_total),
        transformNumber(item.october_total),
        transformNumber(item.november_total),
        transformNumber(item.december_total),
        transformNumber(item.total),
        transformNumber(item.year_total),
      ]);
      return transformedArray;
    } else {
      const transformedArray = [data].map((item) => [
        '',
        `${title}`,
        transformNumber(item.year),
        transformNumber(item.january_total),
        transformNumber(item.febuary_total),
        transformNumber(item.march_total),
        transformNumber(item.april_total),
        transformNumber(item.may_total),
        transformNumber(item.june_total),
        transformNumber(item.july_total),
        transformNumber(item.august_total),
        transformNumber(item.september_total),
        transformNumber(item.october_total),
        transformNumber(item.november_total),
        transformNumber(item.december_total),
        transformNumber(item.total),
        transformNumber(item.year_total),
      ]);
      return transformedArray;
    }
  };
  useEffect(() => {
    if (
      csvMonthlySuccess &&
      operator_total_success &&
      asso_operator_total_success &&
      driver_total_success &&
      sub_driver_total_success &&
      barker_total_success &&
      regular_member_total_success
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
      const operators = transformData(csvMonthlyData?.data, 'OPERATOR');
      const asso_operators = transformData(
        csvMonthlyData?.data,
        'ASSOCIATE_OPERATOR'
      );
      const driver = transformData(csvMonthlyData?.data, 'DRIVER');
      const sub_driver = transformData(
        csvMonthlyData?.data,
        'SUBTITUTE_DRIVER'
      );
      const barker = transformData(csvMonthlyData?.data, 'BARKER');
      const regular_member = transformData(
        csvMonthlyData?.data,
        'REGULAR_MEMBER'
      );
      setCsvData([]);
      setCsvData((prev) => {
        return [
          ...prev,
          ['REGULAR OPERATOR'],
          [
            'NO.',
            'NAMES',
            `${year - 1}`,
            `JAN ${year} PAYMENT`,
            `FEB ${year} PAYMENT`,
            `MARCH ${year} PAYMENT`,
            `APRIL ${year} PAYMENT`,
            `MAY ${year} PAYMENT`,
            `JUNE ${year} PAYMENT`,
            `JULY ${year} PAYMENT`,
            `AUG ${year} PAYMENT`,
            `SEPT ${year} PAYMENT`,
            `OCT ${year} PAYMENT`,
            `NOV ${year} PAYMENT`,
            `DEC ${year} PAYMENT`,
            `TOTAL OF ${year} `,
            `TOTAL CAPITAL SHARE `,
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
    }
  }, [
    csvMonthlySuccess,
    operator_total_success,
    asso_operator_total_success,
    driver_total_success,
    sub_driver_total_success,
    barker_total_success,
    regular_member_total_success,
  ]);
  return (
    <AdminLayout>
      {csvIsloading && <Spinner />}

      {csvIsSuccess && <CSVLink data={csvData}>Download</CSVLink>}

      {/* <MonthlyCapitalSharePdf ref={printRef} /> */}
      <Toaster position='top-right' reverseOrder={false} />
      <Box>
        <Heading>Monthly Capital Share</Heading>
      </Box>
      <Editable defaultValue='Search' onSubmit={(e) => handleSearch(e)}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <input
        type='date'
        onChange={(e) => handleChangeDate(e.target.value.split('-'))}
      />
      <MonthlyShareCapitalTable
        year={year}
        page={page}
        search={search}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        isLoading={isLoading}
      />
    </AdminLayout>
  );
};

export default MonthlyCapitalShare;
