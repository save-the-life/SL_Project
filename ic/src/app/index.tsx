import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from '../pages/HomePage';
import Images from '../pages/Images';
import Wallet from '../pages/Wallet';
import Profile from '../pages/Profile';
import SelectHospital from '../pages/SelectHospital';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout showBottomNav={true}>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/images"
          element={
            <MainLayout showBottomNav={true}>
              <Images />
            </MainLayout>
          }
        />
        <Route
          path="/wallet"
          element={
            <MainLayout showBottomNav={true}>
              <Wallet />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout showBottomNav={true}>
              <Profile />
            </MainLayout>
          }
        />
        <Route
          path="/select-hospital"
          element={
            <MainLayout showBottomNav={false}>
              <SelectHospital />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
