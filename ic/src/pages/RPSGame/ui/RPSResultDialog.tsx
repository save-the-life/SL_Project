import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui';
import { HiX } from 'react-icons/hi';
import Images from '@/shared/assets/images';

const RPSResultDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  result: string;
}> = ({ isOpen, onClose, result }) => {
  const resultImage = () => {
    switch (result) {
      case 'Rock':
        return Images.Rock;
      case 'Paper':
        return Images.Paper;
      case 'Scissors':
        return Images.Scissors;
      default:
        return Images.Rock; // 기본값으로 Rock 설정
    }
  };

  const resultText = () => {
    switch (result) {
      case 'Rock':
        return 'You chose Rock!';
      case 'Paper':
        return 'You chose Paper!';
      case 'Scissors':
        return 'You chose Scissors!';
      default:
        return 'No result available!';
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="rounded-3xl bg-[#21212F] text-white border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold text-xl">
            <div className="flex flex-row items-center justify-between">
              <div> &nbsp;</div>
              <p>Game Result</p>
              <HiX className="w-6 h-6 cursor-pointer" onClick={onClose} />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          <div className="mt-20 w-40 h-40 bg-gradient-to-b from-[#2660f4] to-[#3937a3] rounded-[40px] flex items-center justify-center">
            <div className="w-[158px] h-[158px] logo-bg rounded-[40px] flex items-center justify-center">
              <img src={resultImage()} className="w-16 h-16" alt="Result" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-xl font-semibold">{resultText()}</p>
            <p className="text-[#a3a3a3]">Good luck on your next round!</p>
          </div>
          <div className="space-y-3 w-full">
            <button
              className="w-full h-14 rounded-full bg-[#0147e5]"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RPSResultDialog;
