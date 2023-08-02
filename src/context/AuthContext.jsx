import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Flex } from '@chakra-ui/react';
const AuthContext = createContext();

export default AuthContext;

const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

export const AuthProvider = ({ children }) => {
  // const [authTokens, setAuthTokens] = useState(() =>
  //   localStorage.getItem('authTokens')
  //     ? JSON.parse(localStorage.getItem('authTokens'))
  //     : null
  // );
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null
  );
  const [refreshToken, setRefreshToken] = useState();
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (payload) => {
    const response = axios.post(`${baseURL}/token/`, payload);
    // const response = await fetch(`${baseURL}/token/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username: username, password: password }),
    // });

    const data = await response.json();

    if (response.status === 200) {
      // setAuthTokens(data);
      console.log('data', data);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setUser(jwt_decode(data.access));
      localStorage.setItem('accessToken', JSON.stringify(data.access));
      localStorage.setItem('refreshToken', JSON.stringify(data.refresh));
      const { is_superuser, is_change_password, user_id } = jwt_decode(
        data.access
      );

      if (!is_superuser) {
        if (is_change_password) {
          navigate('/');
        } else {
          navigate('/change-password');
        }
      } else {
        return navigate('/dashboard');
      }
    } else {
      return alert(
        'You have entered an invalid username or password. Please try again'
      );
    }
  };

  const logoutUser = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const updateToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    console.log('refresh');

    const response = await fetch(`${baseURL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: JSON.parse(localStorage.getItem('refreshToken')),
      }),
    });
    const data = await response.json();
    console.log('refresh data', data);
    if (response.status === 200) {
      setAccessToken(data.access);
      setUser(jwt_decode(data.access));
      localStorage.setItem('accessToken', JSON.stringify(data.access));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  const changePassword = async (payload) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    return axios.post(`${baseURL}/change-password/`, {
      headers: headers,
      body: payload,
    });
    // const response = await fetch(`${baseURL}/change-password/`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify(payload),
    // });

    // const { is_change_password } = await response.json();
    // if (is_change_password) {
    //   navigate('/');
    // }
  };

  const createUser = async (payload) => {
    return fetch(`${baseURL}/createUser/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };

  const getUsers = async (page) => {
    const response = await fetch(`${baseURL}/genericcreateUser/?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.json();
    return data;
  };

  const getUser = async (id) => {
    // return axios.get(`${baseURL}/userDetail/${id}`).then((res) => res.data);
    const response = await fetch(`${baseURL}/userDetail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  };

  const getUserInfo = async () => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    return axios.get(`${baseURL}/user/`, { headers: headers });
  };

  const searchUser = async (search) => {
    // return axios.get(`${baseURL}/userDetail/${id}`).then((res) => res.data);
    const response = await fetch(`${baseURL}/searchUsers/?search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.json();

    return data;
  };

  const editUser = async ({ id, ...payload }) => {
    const response = await fetch(`${baseURL}/userDetail/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  };

  const editJeep = async ({ id, ...payload }) => {
    const response = await fetch(`${baseURL}/jeep/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response;
  };

  const createDailyJues = async (payload) => {
    const response = await fetch(`${baseURL}/daily_jues/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  };

  const postLoanReport = async (payload) => {
    const response = await fetch(`${baseURL}/loan/report/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  };

  const postDailyDuesReport = async (payload) => {
    return axios.post(`${baseURL}/daily_jues/report/`, payload);
    // const response = await fetch(`${baseURL}/daily_jues/report/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });
    // const data = await response.json();
    // return data;
  };

  const postLoanPayments = async (payload) => {
    const response = await fetch(`${baseURL}/loan/payments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  };
  const postLoanPenalty = async (payload) => {
    const response = await fetch(`${baseURL}/loan/penalty/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  };

  const getLoanPayments = async (id) => {
    const response = await fetch(
      `${baseURL}/loan/user_payments/?loan_id=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = response.json();

    return data;
  };

  const getUserLoan = async () => {
    console.log('accessToken', accessToken);
    const headers = { Authorization: `Bearer ${accessToken}` };
    return axios.get(`${baseURL}/loan/user_loan`, { headers: headers });
    // const response = await fetch(`${baseURL}/loan/user_loan`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${authTokens?.access}`,
    //   },
    // });
    // const data = await response.json();
    // return data;
  };

  const getLoanReport = async () => {
    const response = await fetch(`${baseURL}/loan/report/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const getDailyDuesReport = async () => {
    const response = await fetch(`${baseURL}/daily_jues/report/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const getLoans = async () => {
    const response = await fetch(`${baseURL}/loan/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };
  const updateLoanStatus = async ({ id, ...payload }) => {
    const response = await fetch(`${baseURL}/loan/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response;
  };
  const pendingLoan = async () => {
    return axios.get(`${baseURL}/loan/filter/?filter=GRANTED`);
  };
  const filterDoneLoan = async () => {
    return axios.get(`${baseURL}/loan/filter/?filter=DONE`);
  };
  const getUserLoanPayments = async (id) => {
    return axios.get(`${baseURL}/loan/user_payments/?loan_id=${id}`);
  };

  const contextData = {
    user: user,
    // authTokens: authTokens,
    setUser: setUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
    setRefreshToken: setRefreshToken,
    setAccessToken: setAccessToken,
    // setAuthTokens: setAuthTokens,
    loginUser: loginUser,
    pendingLoan: pendingLoan,
    filterDoneLoan: filterDoneLoan,
    logoutUser: logoutUser,
    changePassword: changePassword,
    createUser: createUser,
    getUsers: getUsers,
    getUser: getUser,
    createDailyJues: createDailyJues,
    getUserLoan: getUserLoan,
    editUser: editUser,
    editJeep: editJeep,
    searchUser: searchUser,
    getLoanPayments: getLoanPayments,
    getLoanReport: getLoanReport,
    postLoanReport: postLoanReport,
    getDailyDuesReport: getDailyDuesReport,
    postDailyDuesReport: postDailyDuesReport,
    getUserInfo: getUserInfo,
    getLoans: getLoans,
    postLoanPayments: postLoanPayments,
    postLoanPenalty: postLoanPenalty,
    updateLoanStatus: updateLoanStatus,
    getUserLoanPayments: getUserLoanPayments,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    if (accessToken) {
      const { is_superuser } = jwt_decode(accessToken);
      if (!is_superuser) {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    }

    const fourMinute = 1000 * 60 * 0.5;

    let interval = setInterval(() => {
      console.log('interval');

      if (localStorage.getItem('refreshToken')) {
        updateToken();
      }
    }, fourMinute);

    if (accessToken) {
      setUser(jwt_decode(accessToken));
    }
    setLoading(false);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <Flex alignItems='center' justifyContent='center' height='100vh'>
          <Spinner
            thickness='10px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            style={{ width: '150px', height: '150px' }}
          />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
