import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes';

import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} exact />
                <Route path="/change-password" element={<ChangePassword />} exact />
                <Route path='/dashboard' element={<Dashboard />} exact />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </Router>
  </React.StrictMode>
)
