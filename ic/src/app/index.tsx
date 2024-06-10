import React from 'react';
import MainLayout from './layout/MainLayout';

const App: React.FC = () => {
  return (
    <MainLayout>
      <div className="App">
        <h1 className="text-2xl font-bold underline">
          Hello, ICP Blockchain Project!
        </h1>
      </div>
    </MainLayout>
  );
};

export default App;
