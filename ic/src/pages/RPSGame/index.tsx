import React, { useState, useEffect } from 'react';
import Images from '@/shared/assets/images';

const RPSGame: React.FC = () => {
  return (
    <div
      className="flex flex-col z-50 h-screen bg-white w-full drop-shadow"
      style={{
        backgroundImage: `url(${Images.BGRPSGame})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-[#fde047] font-jalnan ">
        Let's play,
        <br />
        Roullette Game!
      </h1>
    </div>
  );
};

export default RPSGame;
