import React, { useState, useEffect } from 'react';
import { TopTitle } from '@/shared/components/ui';
import { motion } from 'framer-motion';
import './SlotMachine.css';

const images = ['✊', '✌️', '🖐️']; // 슬롯의 이미지

const SlotMachine: React.FC = () => {
  const [slotIndex, setSlotIndex] = useState<number>(0); // 초기값은 '주먹'
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<string>('✊'); // 초기 결과는 '주먹'
  const [spinSpeed, setSpinSpeed] = useState<number>(100); // 애니메이션 속도 초기값

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isSpinning) {
      interval = setInterval(() => {
        setSlotIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, spinSpeed); // 애니메이션 속도 적용
    }

    return () => {
      if (interval) clearInterval(interval); // 클린업 함수에서 interval을 제거
    };
  }, [isSpinning, spinSpeed]);

  const mockServerRequest = async () => {
    // 서버 요청 시뮬레이션
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('✌️'); // 가정: 서버에서 '가위' 결과 반환
      }, 500);
    });
  };

  const handleSpin = async () => {
    setIsSpinning(true);
    setSpinSpeed(50); // 애니메이션 속도를 빠르게 설정

    // 서버로부터 결과 받기
    const serverResult = await mockServerRequest();

    setTimeout(() => {
      setIsSpinning(false);
      setSpinSpeed(100); // 애니메이션 속도 기본값으로 설정
      setResult(serverResult); // 결과를 슬롯에 표시
    }, 500); // 3초 후에 슬롯 멈춤
  };

  return (
    <div className="flex flex-col mx-6 mb-44 text-white items-center md:mx-28">
      <TopTitle title="Slot Machine" />
      <div className="slot-machine bg-white p-4 rounded-md overflow-hidden relative h-24 w-24 shadow-lg">
        <motion.div
          className="flex flex-col items-center justify-center h-full"
          initial={{ y: 0 }}
          animate={{ y: isSpinning ? ['-100%', '0%'] : '0%' }}
          transition={{
            duration: isSpinning ? 0.1 : 0.5, // 애니메이션 속도 조절
            ease: 'linear',
            repeat: isSpinning ? Infinity : 0,
          }}
          style={{
            height: '300%',
            display: 'flex',
            flexDirection: 'column',
            perspective: '1000px',
          }}
        >
          {images.map((slot, index) => (
            <div
              key={index}
              className="slot-item text-5xl"
              style={{
                height: '33.33%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotateX(${
                  index === 1 ? '0' : index === 0 ? '-15' : '15'
                }deg)`, // Adjusted 3D rotation effect
                opacity: index === 1 ? 1 : 0.5, // Less visible for non-center items
              }}
            >
              {slot}
            </div>
          ))}
        </motion.div>
      </div>
      <button
        onClick={handleSpin}
        className="spin-button bg-white text-[#171717] p-2 mt-4 rounded-full"
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
};

export default SlotMachine;
