import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import Typography from '@/shared/components/typography';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center space-x-4 justify-between">
      <button onClick={() => navigate(-1)}>
        <IoChevronBackOutline className="w-6 h-6" />
      </button>
      <Typography.H3>{title}</Typography.H3>
      <span> </span>
    </header>
  );
};

export default PageHeader;
