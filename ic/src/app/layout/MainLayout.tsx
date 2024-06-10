import React from 'react';
import SimpleBottomNavigation from '../components/BottomNavigation';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
      <SimpleBottomNavigation />
    </div>
  );
};

export default MainLayout;
