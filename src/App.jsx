import { useEffect, useState, useContext } from 'react';
// import App from './App'

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';

import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import GrantedLoan from './pages/GrantedLoan';
import DoneLoan from './pages/DoneLoan';
import DailyJues from './pages/DailyJues';
import AddDailyJues from './pages/AddDailyJues';
import UserLoan from './pages/UserLoan';
import LoanReport from './pages/LoanReport';
import DailyDuesReport from './pages/DailyDuesReport';
import AddLoanReport from './pages/AddLoanReport';
import UserPayments from './pages/UserPayments';
import UserProfile from './pages/UserProfile';
import UserJeep from './pages/UserJeep';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path='/' element={<Home />} exact />
                <Route path='/user-loan' element={<UserLoan />} exact />
                <Route
                  path='/change-password'
                  element={<ChangePassword />}
                  exact
                />
                <Route path='/dashboard' element={<Dashboard />} exact />
                <Route path='/members' element={<Members />} exact />
                <Route path='/grantedLoan' element={<GrantedLoan />} exact />
                <Route path='/doneLoan' element={<DoneLoan />} exact />
                <Route
                  path='/add-daily-jues'
                  element={<AddDailyJues />}
                  exact
                />
                <Route path='/daily-jues' element={<DailyJues />} exact />
                <Route
                  path='/daily-dues-reports'
                  element={<DailyDuesReport />}
                  exact
                />
                <Route path='/loan-reports' element={<LoanReport />} exact />
                <Route
                  path='/add-loan-reports'
                  element={<AddLoanReport />}
                  exact
                />
                <Route
                  path='/user-payments/:id'
                  element={<UserPayments />}
                  exact
                />
                <Route path='/user-jeep' element={<UserJeep />} exact />
                <Route path='/user-profile' element={<UserProfile />} exact />
              </Route>
              <Route path='/login' element={<Login />} />
            </Routes>
          </AuthProvider>
        </Router>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
