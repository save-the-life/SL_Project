// src/app/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from '../pages/HomePage';
import Images from '../pages/Images';
// import Wallet from '../pages/Wallet';
import Profile from '../pages/Profile';
import IntergratingHospital from '../pages/IntergratingHospital';
import DetailPage from '../pages/DetailPage';
import SendToken from '../pages/SendToken';
import EnterAmount from '../pages/EnterAmount';
import SendConfirmation from '../pages/SendConfirmation';
import TransferCompleted from '../pages/TransferCompleted';
import ReferralManagement from '../pages/ReferralManagement';
import InstallPrompt from './components/InstallPrompt';

const App: React.FC = () => {
  React.useEffect(() => {
    const preventContextMenu = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);

  return (
    <Router>
      <div>
        {/* <InstallPrompt /> */}
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

          {/* <Route
            path="/wallet"
            element={
              <MainLayout showBottomNav={true}>
                <Wallet />
              </MainLayout>
            }
          /> */}

          <Route
            path="/profile"
            element={
              <MainLayout showBottomNav={true}>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/intergrating-hospital"
            element={
              <MainLayout showBottomNav={false}>
                <IntergratingHospital />
              </MainLayout>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <MainLayout showBottomNav={false}>
                <DetailPage />
              </MainLayout>
            }
          />
          <Route
            path="/send-token"
            element={
              <MainLayout showBottomNav={false}>
                <SendToken />
              </MainLayout>
            }
          />
          <Route
            path="/enter-amount"
            element={
              <MainLayout showBottomNav={false}>
                <EnterAmount />
              </MainLayout>
            }
          />
          <Route
            path="/send-confirmation"
            element={
              <MainLayout showBottomNav={false}>
                <SendConfirmation />
              </MainLayout>
            }
          />
          <Route
            path="/transfer-completed"
            element={
              <MainLayout showBottomNav={false}>
                <TransferCompleted />
              </MainLayout>
            }
          />
          <Route
            path="/referral-management"
            element={
              <MainLayout showBottomNav={false}>
                <ReferralManagement />
              </MainLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
