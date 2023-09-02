import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Check for stored token in local storage or cookies
//const authToken = localStorage.getItem('authToken'); 
const userType = localStorage.getItem('user_type') || null; 
ReactDOM.render(
  <AuthProvider initialState={userType ?{userType: userType}  : null }>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
