import React from 'react';
import SimpleBottomNavigation from '../components/BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className={`flex flex-col h-screen bg-neutral-100 ${className || ''}`}>
      <div className="flex-1 overflow-y-auto">{children}</div>
      <SimpleBottomNavigation />
    </div>
  );
};

export default MainLayout;
