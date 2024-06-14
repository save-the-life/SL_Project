import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AuthPage from './tests/pages/AuthPage';
import UserPage from './tests/pages/UserPage';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserPage />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
