import * as React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App'
// import './index.scss'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Home />} exact />
              <Route
                path='/change-password'
                element={<ChangePassword />}
                exact
              />
              <Route path='/dashboard' element={<Dashboard />} exact />
              <Route path='/members' element={<Members />} exact />
              <Route path='/loans' element={<Loans />} exact />
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
