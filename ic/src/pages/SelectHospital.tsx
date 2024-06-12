import React from 'react';
import HospitalSearch from '@/widgets/HospitalSearch';
import HospitalList from '@/widgets/HospitalList';
import PageHeader from '@/widgets/PageHeader';

const hospitals = [
  {
    name: 'Acme Hospital',
    address: '123 Main St, Springfield, USA',
    logo: 'https://picsum.photos/536/354',
  },
  {
    name: 'Apex Medical Center',
    address: '456 Oak Rd, Somewhere City',
    logo: 'https://picsum.photos/536/354',
  },
];

const SelectHospital: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <PageHeader title="Choose a hospital" />
      <HospitalSearch />
      <HospitalList hospitals={hospitals} />
    </div>
  );
};

export default SelectHospital;
