import React, { useState, useEffect } from 'react';

import moment from 'moment';
import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from 'react-query';

import transformNumber from '../utils/transformNumber';

export function useMontlyCsv(year) {
  const queryClient = useQueryClient();
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
  const [csvData, setCsvData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
  const mutateAll = () => {
    operator_total_mutate();
    csvMonthlySutate();
    asso_operator_total_mutate();
    driver_total_mutate();
    sub_driver_total_mutate();
    barker_total_mutate();
    regular_member_total_mutate();
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
      operator_total_success &&
      csvMonthlySuccess &&
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
    if (
      csvMonthlyPending &&
      operator_total_pending &&
      asso_operator_total_pending &&
      driver_total_pending &&
      sub_driver_total_pending &&
      barker_total_pending &&
      regular_member_total_pending
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    if (
      csvMonthlySuccess &&
      operator_total_success &&
      asso_operator_total_success &&
      driver_total_success &&
      sub_driver_total_success &&
      barker_total_success &&
      regular_member_total_success
    ) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [
    year,
    csvMonthlySuccess,
    operator_total_success,
    asso_operator_total_success,
    driver_total_success,
    sub_driver_total_success,
    barker_total_success,
    regular_member_total_success,
  ]);

  return [csvData, mutateAll, isloading, isSuccess];
}
