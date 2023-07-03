import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem('refreshToken')
      ? JSON.parse(localStorage.getItem('refreshToken'))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    const response = await fetch(`${baseURL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      // setAuthTokens(data);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setUser(jwt_decode(data.access));
      localStorage.setItem('accessToken', JSON.stringify(data.access));
      localStorage.setItem('refreshToken', JSON.stringify(data.refresh));
      const { is_superuser, is_change_password, user_id } = jwt_decode(
        data.access
      );
      console.log(is_superuser);
      console.log(is_change_password);
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
    console.log('refresh');
    const response = await fetch(`${baseURL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAccessToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem('accessToken', JSON.stringify(data.access));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  const changePassword = async (password) => {
    const response = await fetch(`${baseURL}/change-password/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ password: password }),
    });

    const { is_change_password } = await response.json();
    if (is_change_password) {
      navigate('/');
    }
  };

  const createUser = async (payload) => {
    // console.log(payload)
    // const response = await axios({
    //     method: 'post',
    //     url: `${baseURL}/createUser/`,
    //     data: payload,
    // });

    // console.log(response)
    console.log(payload);
    const response = await fetch(`${baseURL}/createUser/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data) {
      return { success: true, data: response };
    } else {
      return { success: false };
    }
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
    // console.log(data);
    return data;
  };

  const getUserInfo = async () => {
    const response = await fetch(`${baseURL}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
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
    // console.log(data);
    return data;
  };

  const editUser = async ({ id, ...payload }) => {
    console.log(`edit user ${id} and ${payload}`);
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
    console.log(response);
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
    const response = await fetch(`${baseURL}/daily_jues/report/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
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
    console.log(id);
    const response = await fetch(`${baseURL}/loan/user_payments/?loan_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.json();
    // console.log(data);
    return data;
  };

  const getUserLoan = async () => {
    const response = await fetch(`${baseURL}/loan/user_loan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens?.access}`,
      },
    });
    const data = await response.json();
    return data;
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

  const contextData = {
    user: user,
    // authTokens: authTokens,
    setUser: setUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
    // setAuthTokens: setAuthTokens,
    loginUser: loginUser,
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
  };

  useEffect(() => {
    console.log('useEffect');
    // if (accessToken) {
    //   const { is_superuser } = jwt_decode(accessToken);
    //   if (!is_superuser) {
    //     navigate('/');
    //   } else {
    //     navigate('/dashboard');
    //   }
    // }

    if (loading) {
      updateToken();
    }
    const fourMinute = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (accessToken) {
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
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
