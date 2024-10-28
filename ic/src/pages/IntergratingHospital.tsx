import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/widgets/PageHeader';
import Images from '@/shared/assets/images';
import { Scanner } from '@yudiel/react-qr-scanner';

const hospitals = [
  {
    name: 'Acme Hospital',
    address: '123 Main St, Springfield, USA',
    logo: Images.BaseLogo,
  },
  {
    name: 'Apex Medical Center',
    address: '456 Oak Rd, Somewhere City',
    logo: Images.BaseLogo,
  },
];

const IntergratingHospital: React.FC = () => {
  const navigate = useNavigate();

  const handleHospitalClick = () => {
    navigate('/image-list');
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader title="QR Code Scan" />
      <Scanner
        onScan={(result) => console.log(result)}
        onError={(e) => console.log(e)}
      />
    </div>
  );
};

export default IntergratingHospital;
