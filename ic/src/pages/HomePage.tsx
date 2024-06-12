import React from 'react';
import NotificationCarousel from '@/widgets/NotificationCarousel';
import TokenBalance from '@/widgets/TokenBalance';
import ReceiveMedicalImagesButton from '@/widgets/ReceiveMedicalImagesButton';
import RecentDiagnosis from '@/widgets/RecentDiagnosis';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <TokenBalance />

      <div className="p-4 pt-0">
        <NotificationCarousel />
        <ReceiveMedicalImagesButton />
        <RecentDiagnosis />
      </div>
    </div>
  );
};

export default HomePage;
