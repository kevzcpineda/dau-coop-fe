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
  const [csvData, setCsvData] = useState([
    ['REGULAR OPERATOR'],
    ['NO.', 'NAMES', '1', '2'],
  ]);

  const { data: csvShareCapitalData, status: csvShareCapitalDataStatus } =
    useQuery({
      queryKey: [
        'csvShareCapital',
        {
          year: year,
          month: month,
        },
      ],
      queryFn: () => {
        return axios.get(
          `${baseURL}/daily_jues/days/?month=${month}&year=${year}`
        );
      },
    });
  const { data: csvOperatorTotal, status: csvOperatorTotalStatus } = useQuery({
    queryKey: [
      'csvShareCapitalOperatorTotal',
      {
        year: year,
        month: month,
      },
    ],
    queryFn: () => {
      return axios.get(
        `${baseURL}/daily_jues/daily_jues_total/?month=${month}&year=${year}&member_status=OPERATOR`
      );
    },
  });
  if (csvOperatorTotalStatus === 'success') {
    const arr = Object.values(csvOperatorTotal.data);
    console.log('arr', arr);
  }
  useEffect(() => {
    if (csvShareCapitalDataStatus === 'success') {
      const data = [
        ['OPERATOR'],
        [
          'NO.',
          'NAMES',
          '1',
          '2',
          // '3',
          // '4',
          // '5',
          // '6',
          // '7',
          // '8',
          // '9',
          // '10',
          // '11',
          // '12',
          // '13',
          // '14',
          // '15',
          // '16',
          // '17',
          // '18',
          // '19',
          // '20',
          // '21',
          // '22',
          // '23',
          // '24',
          // '25',
          // '26',
          // '27',
          // '28',
          // '29',
          // '30',
          // '31',
          // 'TOTAL',
          // 'OPERATION FEE',
          // 'SHARE CAPITAL',
        ],
      ];
      const operators = csvShareCapitalData?.data
        .filter((item) => {
          return item.member_status === 'OPERATOR';
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
          item.member_status,
          item.day1,
          item.total,
        ]);
      const asso_operators = csvShareCapitalData?.data
        .filter((item) => {
          return item.member_status === 'ASSOCIATE_OPERATOR';
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
          item.member_status,
          item.day1,
          item.total,
        ]);
      const driver = csvShareCapitalData?.data
        .filter((item) => {
          return item.member_status === 'DRIVER';
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
          item.member_status,
          item.day1,
          item.total,
        ]);
      const sub_driver = csvShareCapitalData?.data
        .filter((item) => {
          return item.member_status === 'SUBTITUTE_DRIVER';
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
          item.member_status,
          item.day1,
          item.total,
        ]);
      const barker = csvShareCapitalData?.data
        .filter((item) => {
          return item.member_status === 'BARKER';
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
          item.member_status,
          item.day1,
          item.total,
        ]);
      const regular_member = csvShareCapitalData?.data
        .filter((item) => {
          return item.member_status === 'REGULAR_MEMBER';
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
          item.member_status,
          item.day1,
          item.total,
        ]);

      operators.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['ASSOCIATE OPERATOR']];
      });
      asso_operators.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['REGULAR MEMBER']];
      });
      regular_member.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['REGULAR DRIVER']];
      });
      driver.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['SUBTITUTE DRIVER']];
      });
      sub_driver.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
      setCsvData((prev) => {
        return [...prev, [], [], ['BARKER']];
      });
      barker.map((item) => {
        setCsvData((prev) => {
          return [...prev, item];
        });
      });
    }
  }, [csvShareCapitalDataStatus]);

  // const convertedOperators = operators.map((item) => [
  //   item.last_name + ' ' + item.first_name,
  //   item.member_status,
  //   item.day1,
  //   item.total,
  // ]);
  // const convertedAssoOperators = asso_operators.map((item) => [
  //   item.last_name + ' ' + item.first_name,
  //   item.member_status,
  //   item.day1,
  //   item.total,
  // ]);
  // const convertedDriver = driver.map((item) => [
  //   item.last_name + ' ' + item.first_name,
  //   item.member_status,
  //   item.day1,
  //   item.total,
  // ]);
  // const convertedSubDriver = sub_driver.map((item) => [
  //   item.last_name + ' ' + item.first_name,
  //   item.member_status,
  //   item.day1,
  //   item.total,
  // ]);
  // const convertedBarker = barker.map((item) => [
  //   item.last_name + ' ' + item.first_name,
  //   item.member_status,
  //   item.day1,
  //   item.total,
  // ]);
  // const convertedRegularMember = regular_member.map((item) => [
  //   item.last_name + ' ' + item.first_name,
  //   item.member_status,
  //   item.day1,
  //   item.total,
  // ]);
  // console.log('convertedOperators', convertedOperators);
  // console.log('convertedAssoOperators', convertedAssoOperators);

  // const { data: dailyCapitalShareData, status: dailyCapitalShareStatus } =
  //   useQuery({
  //     queryKey: ['dailyCapitalShare', year, month],
  //     queryFn: () => getDailyCapitalShare(year, month),
  //   });

  // const {
  //   data: CapitalShareTotalOperatorData,
  //   status: CapitalShareTotalOperatorStatus,
  // } = useQuery({
  //   queryKey: ['CapitalShareTotal', 'Operator'],
  //   queryFn: () => getDailyCapitalShareTotal(year, month, 'OPERATOR'),
  // });

  // const reactToPrintContent = useCallback(() => {
  //   return printRef.current;
  // }, [printRef.current]);

  // useEffect(() => {
  //   if (isPrinting && promiseResolveRef.current) {
  //     promiseResolveRef.current();
  //   }
  // }, [isPrinting]);

  // const handlePrint = useReactToPrint({
  //   content: () => reactToPrintContent(),
  //   pageStyle: ' @page { size: landscape; }',
  //   onBeforeGetContent: () => {
  //     return new Promise((resolve) => {
  //       promiseResolveRef.current = resolve;
  //       setIsPrinting(true);
  //     });
  //   },
  //   onAfterPrint: () => {
  //     // Reset the Promise resolve so we can print again
  //     promiseResolveRef.current = null;
  //     setIsPrinting(false);
  //   },
  // });

  // const print = () => {
  //   handlePrint();
  // };

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
    console.log('click next');
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
  };
  const handleSearch = async (e) => {
    setSearch(e);
    mutate();
  };

  return (
    <AdminLayout>
      {csvShareCapitalDataStatus == 'success' && (
        <CSVLink data={csvData}>Download me</CSVLink>
      )}

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
