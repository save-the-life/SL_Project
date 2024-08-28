import React, { useState, useEffect } from 'react';
import Images from '@/shared/assets/images';
import { motion } from 'framer-motion';
import { AiFillQuestionCircle } from 'react-icons/ai';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui';
import { formatNumber } from '@/shared/utils/formatNumber';
import RPSResultDialog from './ui/RPSResultDialog';

const rpsImages = [Images.Rock, Images.Scissors, Images.Paper]; // 슬롯 이미지 배열

const RPSGameStart: React.FC<{ onStart: (betAmount: string) => void }> = ({
  onStart,
}) => {
  const [betAmount, setBetAmount] = useState<string>(''); // 베팅 금액 상태 관리

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(event.target.value); // input 값이 변경될 때 상태를 업데이트
  };

  const handleStartClick = () => {
    if (betAmount) {
      onStart(betAmount); // 베팅 금액이 설정된 경우 게임 시작
    }
  };

  return (
    <div>
      <h1 className="text-[#E20100] font-jalnan text-center text-[36px] mt-4 ">
        Let's play,
        <br />
        Roulette Game!
      </h1>

      <div className="flex flex-col items-center justify-center mt-4">
        <img
          src={Images.RPSGameExample}
          alt="RPSGameExample"
          className=" w-[280px]"
        />

        <div className="flex flex-row gap-3 mt-4">
          <Popover>
            <PopoverTrigger className=" flex flex-row gap-1 border-2 border-[#21212f] rounded-3xl text-center bg-white text-[#171717] font-medium w-[165px] h-[72px]  items-center justify-center">
              <AiFillQuestionCircle className="w-6 h-6" />
              <p>How to play</p>
            </PopoverTrigger>
            <PopoverContent
              className="rounded-3xl border-2 border-[#21212f] bg-white"
              style={{
                maxHeight: '65vh', // 최대 높이를 65vh로 설정하여 화면을 벗어나지 않도록 함
                overflowY: 'auto', // 높이를 넘치는 경우 스크롤이 가능하게 함
              }}
            >
              <div className="text-black p-4 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold text-center mb-4">
                  ✼ Game Instructions ✼
                </h2>
                <ol className="text-sm leading-loose space-y-4">
                  <li>
                    <strong>Enter Your Bet Amount</strong>
                    <ul className="list-disc pl-5">
                      <li>You can bet up to 50% of your total balance.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Play Rock-Paper-Scissors</strong>
                  </li>
                  <li>
                    <strong>Win Rewards</strong>
                    <ul className="list-disc pl-5">
                      <li>Win 1st round: Earn 2x your bet.</li>
                      <li>Win 2nd round in a row: Earn 4x your bet.</li>
                      <li>Win 3rd round in a row: Earn 8x your bet.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Continue or Cash Out</strong>
                    <ul className="list-disc pl-5">
                      <li>
                        After winning a round, you'll be prompted to continue to
                        the next round with your winnings.
                      </li>
                      <li>
                        Choose to proceed to the next round, and your new bet
                        will be increased.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Important Notice</strong>
                    <ul className="list-disc pl-5">
                      <li>
                        Leaving the game during a match may result in forfeiture
                        of any rewards.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex flex-col gap-1 border-2 border-[#21212f] rounded-3xl text-center bg-white text-[#171717] font-medium w-[165px] h-[72px]  items-center justify-center ">
            <p className="text-sm text-[#737373]">My point</p>
            <div className="flex flex-row items-center justify-center gap-3">
              <img src={Images.Star} alt="star" className="w-6 h-6" />
              <p>{formatNumber(12345)}</p>
            </div>
          </div>
        </div>
        <input
          placeholder="How many star would you like to bet?"
          type="number"
          value={betAmount}
          onChange={handleInputChange} // input 값이 변경될 때 호출되는 함수
          className="border-2 border-[#21212f] rounded-2xl h-12 text-sm font-medium px-4 mt-4 w-[342px]"
        />
        <div className="flex flex-row mt-4 gap-3">
          <button className="bg-gray-200 text-[#171717] rounded-full font-medium h-14 w-[165px]">
            Cancel
          </button>
          <button
            className={`${
              betAmount
                ? 'bg-[#21212F] text-white'
                : ' bg-[#21212F] opacity-70 text-white cursor-not-allowed'
            } rounded-full font-medium h-14 w-[165px]`}
            disabled={!betAmount} // betAmount가 없으면 비활성화
            onClick={handleStartClick} // Bet 버튼 클릭 시 게임 시작
          >
            Bet
          </button>
        </div>
      </div>
    </div>
  );
};

const RPSGame: React.FC = () => {
  const [betAmount, setBetAmount] = useState<string>(''); // 베팅 금액 상태
  const [isSpinning, setIsSpinning] = useState<boolean>(false); // 슬롯이 회전 중인지 상태 관리
  const [slotIndex, setSlotIndex] = useState<number>(0); // 현재 슬롯 인덱스
  const [result, setResult] = useState<string>(''); // 초기 결과는 빈 문자열
  const [spinSpeed, setSpinSpeed] = useState<number>(100); // 애니메이션 속도 초기값
  const [winMultiplier, setWinMultiplier] = useState<number>(1); // 승리 배수
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false); // 게임이 시작되었는지 여부
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // 다이얼로그 열림 상태

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isSpinning) {
      // 슬롯이 회전 중일 때 실행
      interval = setInterval(() => {
        setSlotIndex((prevIndex) => (prevIndex + 1) % rpsImages.length); // 이미지 배열의 다음 이미지로 이동
      }, spinSpeed);
    }

    return () => {
      if (interval) clearInterval(interval); // 슬롯 회전이 멈추면 interval을 클리어
    };
  }, [isSpinning, spinSpeed]); // isSpinning과 spinSpeed가 변경될 때마다 useEffect 실행

  const mockServerRequest = async () => {
    // 서버 요청 시뮬레이션 함수
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(rpsImages[Math.floor(Math.random() * rpsImages.length)]); // 서버에서 임의의 결과 반환
      }, 500);
    });
  };

  const handleSpin = async () => {
    setIsSpinning(true); // 슬롯 회전을 시작
    setSpinSpeed(50); // 애니메이션 속도를 빠르게 설정

    // 서버로부터 결과 받기
    const serverResult = await mockServerRequest();

    setTimeout(() => {
      setIsSpinning(false); // 슬롯 회전을 멈춤
      setSpinSpeed(100); // 애니메이션 속도를 기본값으로 설정
      setResult(serverResult); // 서버에서 받은 결과를 슬롯에 표시
      setWinMultiplier((prev) => prev * 2); // 승리 시 배수를 2배로 증가
      setIsDialogOpen(true); // 다이얼로그 열기
    }, 500); // 0.5초 후에 슬롯 멈춤
  };

  const handleGameStart = (betAmount: string) => {
    // 게임 시작 시 베팅 금액을 설정하고 게임 시작 상태로 전환
    setBetAmount(betAmount);
    setIsGameStarted(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // 다이얼로그 닫기
  };

  return (
    <div
      className="flex flex-col z-50 h-screen bg-white w-full drop-shadow"
      style={{
        backgroundImage: `url(${Images.BGRPSGame})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!isGameStarted ? (
        <RPSGameStart onStart={handleGameStart} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="flex flex-row items-center justify-center h-[86px] w-[264px] border-2 border-[#21212f] rounded-3xl bg-white gap-3">
            <div className="flex flex-row items-center gap-1">
              <img src={Images.Star} alt="star" className=" w-9 h-9" />
              <p className=" text-3xl font-semibold">{formatNumber(500)}</p>
            </div>
            <div className=" bg-[#21212f] rounded-full flex items-center justify-center  h-8 w-11 text-sm font-semibold text-white">
              x {winMultiplier}
            </div>
          </div>
          <div className="mt-8 relative">
            <img
              src={Images.RPSGame}
              alt="RPSGame"
              className=" w-[353px] h-[481px]"
            />
            <div className="absolute bottom-[211px] left-8 gap-2 flex flex-row items-center justify-around w-[87px]  overflow-y-hidden h-[80px] px-8 transform">
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {rpsImages.map((slot, index) => (
                  <div
                    key={index}
                    className="slot-item text-5xl"
                    style={{
                      height: '100%', // 슬롯 아이템의 높이로, 간격 조절에 영향을 줍니다.
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={slot}
                      alt={`slot-${index}`}
                      className=" h-[70px] min-x-[70px] " // 슬롯 아이템 크기 조정
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="absolute bottom-20 left-5 gap-2 flex flex-row items-center justify-around w-[230px] px-8 transform">
              <img
                src={Images.RockButton}
                alt="rock"
                className="w-[68px] h-[68px]"
                onClick={handleSpin}
              />
              <img
                src={Images.PaperButton}
                alt="paper"
                className="w-[68px] h-[68px]"
                onClick={handleSpin}
              />
              <img
                src={Images.ScissorsButton}
                alt="scissors"
                className="w-[68px] h-[68px]"
                onClick={handleSpin}
              />
            </div>
          </div>
        </div>
      )}

      {/* 결과 다이얼로그 */}
      <RPSResultDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        result={result}
      />
    </div>
  );
};

export default RPSGame;
