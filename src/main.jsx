import * as React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App'
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';

import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Loans from './pages/Loans';
import DailyJues from './pages/DailyJues';
import AddDailyJues from './pages/AddDailyJues';
import UserLoan from './pages/UserLoan';
import LoanReport from './pages/LoanReport';
import DailyDuesReport from './pages/DailyDuesReport';
import AddLoanReport from './pages/AddLoanReport';
import UserPayments from './pages/UserPayments';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
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
                <Route path='/loans' element={<Loans />} exact />
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
                <Route path='/userpayments/:id' element={<UserPayments />} />
              </Route>
              <Route path='/login' element={<Login />} />
            </Routes>
          </AuthProvider>
        </Router>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
