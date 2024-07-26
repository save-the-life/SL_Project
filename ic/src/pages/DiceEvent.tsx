import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './DiceEvent.css';
import Dice from '@/widgets/Dice'; // 주사위 컴포넌트를 가져옵니다.
import Images from '@/shared/assets/images';
import GaugeComponent from 'react-gauge-component';

const DiceEvent: React.FC = () => {
  const diceRef = useRef<any>(null);
  const [diceValue, setDiceValue] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [gaugeValue, setGaugeValue] = useState<number>(0.5);
  const [isIncreasing, setIsIncreasing] = useState<boolean>(true);
  const [moving, setMoving] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [initialX, setInitialX] = useState<number>(140);
  const [initialY, setInitialY] = useState<number>(474);
  const [delta, setDelta] = useState<number>(56);
  const [userLv, setUserLv] = useState<number>(20);
  const [mainColorClassName, setMainColorClassName] = useState<string>('');
  const [charactorImageSrc, setCharactorImageSrc] = useState<string>('');

  const getMainColorForUserLv = () => {
    if (userLv >= 1 && userLv <= 4) {
      return 'lv1to4-box';
    } else if (userLv >= 5 && userLv <= 8) {
      return 'lv5to8-box';
    } else if (userLv >= 9 && userLv <= 12) {
      return 'lv9to12-box';
    } else if (userLv >= 13 && userLv <= 16) {
      return 'lv13to16-box';
    } else if (userLv >= 17 && userLv <= 20) {
      return 'lv17to20-box';
    } else {
      return '';
    }
  };

  const getCharactorForUserLv = () => {
    if (userLv >= 1 && userLv <= 2) {
      return Images.Lv1to2;
    } else if (userLv >= 3 && userLv <= 4) {
      return Images.Lv3to4;
    } else if (userLv >= 5 && userLv <= 6) {
      return Images.Lv5to6;
    } else if (userLv >= 7 && userLv <= 8) {
      return Images.Lv7to8;
    } else if (userLv >= 9 && userLv <= 10) {
      return Images.Lv9to10;
    } else if (userLv >= 11 && userLv <= 12) {
      return Images.Lv11to12;
    } else if (userLv >= 13 && userLv <= 14) {
      return Images.Lv13to14;
    } else if (userLv >= 15 && userLv <= 16) {
      return Images.Lv15to16;
    } else if (userLv >= 17 && userLv <= 18) {
      return Images.Lv17to18;
    } else if (userLv >= 19 && userLv <= 20) {
      return Images.Lv19to20;
    } else {
      return '';
    }
  };

  useEffect(() => {
    setMainColorClassName(getMainColorForUserLv());
    setCharactorImageSrc(getCharactorForUserLv());
  }, [userLv]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setInitialX(250);
        setInitialY(730);
        setDelta(100);
      } else {
        setInitialX(140);
        setInitialY(474);
        setDelta(56);
      }
    };

    handleResize(); // 초기 설정
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isHolding) {
      interval = setInterval(() => {
        setGaugeValue((prev) => {
          if (prev >= 6) {
            setIsIncreasing(false);
            return prev - 0.25;
          } else if (prev <= 0) {
            setIsIncreasing(true);
            return prev + 0.25;
          }
          return isIncreasing ? prev + 0.25 : prev - 0.25;
        });
      }, 21);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHolding, isIncreasing]);

  const handleMouseDown = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    if (buttonDisabled) return; // 버튼이 비활성화 상태인 경우 동작하지 않음
    setIsHolding(true);
  };

  const handleMouseUp = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    if (buttonDisabled) return; // 버튼이 비활성화 상태인 경우 동작하지 않음
    setIsHolding(false);
    rollDice();
  };

  const rollDice = () => {
    setButtonDisabled(true); // 버튼 비활성화
    diceRef.current?.roll();
  };

  const handleRollComplete = (value: number) => {
    setDiceValue(value);
    movePiece(value);
  };

  const movePiece = (steps: number) => {
    if (moving) return;
    setMoving(true);
    let currentPosition = position;
    const moveStep = () => {
      currentPosition = (currentPosition + 1) % 20;
      setPosition(currentPosition);
      if (steps > 1) {
        steps--;
        setTimeout(moveStep, 300); // 0.3초마다 한 칸 이동
      } else {
        setMoving(false);
        setButtonDisabled(false); // 버튼 활성화
      }
    };
    moveStep();
  };

  const getTileStyle = (tileNumber: number) => {
    const baseStyle =
      'flex items-center justify-center w-[52px] h-[52px] md:w-24 md:h-24 text-center font-semibold text-xs md:text-sm z-0 ';
    const startStyle =
      baseStyle +
      ' ' +
      'start-tile text-white text-sm md:text-base font-jalnan';
    const airplaneStyle = baseStyle + ' ' + 'airplane-tile';
    const gameStyle = baseStyle + ' ' + 'game-tile';
    const starStyle = baseStyle + ' ' + 'star-tile';
    const diceStyle = baseStyle + ' ' + 'dice-tile';
    const activeStyle = 'active-tile'; // 캐릭터가 위치한 타일의 추가 스타일

    switch (tileNumber) {
      case 0:
        return `${startStyle} ${position === tileNumber ? activeStyle : ''}`;
      case 2:
      case 8:
      case 13:
      case 18:
        return `${airplaneStyle} ${position === tileNumber ? activeStyle : ''}`;
      case 1:
      case 4:
      case 6:
      case 9:
      case 11:
      case 14:
      case 16:
      case 19:
        return `${starStyle} ${position === tileNumber ? activeStyle : ''}`;
      case 5:
      case 10:
      case 15:
        return `${gameStyle} ${position === tileNumber ? activeStyle : ''}`;
      default:
        return `${diceStyle} ${position === tileNumber ? activeStyle : ''}`;
    }
  };

  const calculateTilePosition = (tileNumber: number) => {
    let x = initialX;
    let y = initialY;

    if (tileNumber >= 0 && tileNumber <= 5) {
      y -= delta * tileNumber;
    } else if (tileNumber >= 6 && tileNumber <= 10) {
      x -= delta * (tileNumber - 5);
      y -= delta * 5;
    } else if (tileNumber >= 11 && tileNumber <= 15) {
      x -= delta * 5;
      y -= delta * (15 - tileNumber);
    } else if (tileNumber >= 16 && tileNumber <= 19) {
      x -= delta * (20 - tileNumber);
    }

    return { x, y };
  };

  const { x, y } = calculateTilePosition(position);

  interface StarTileProps {
    count: number;
  }

  interface DiceTileProps extends StarTileProps {}

  interface AirplaneTileProps {
    text: string;
  }

  const StarTile: React.FC<StarTileProps> = ({ count }) => (
    <div className="flex flex-col gap-1 items-center ">
      <img src={Images.Star} alt="star" className="h-6 w-6 md:h-10 md:w-10" />
      <p>x {count}</p>
    </div>
  );

  const DiceTile: React.FC<DiceTileProps> = ({ count }) => (
    <div className="flex flex-col gap-1 items-center">
      <img src={Images.Dice} alt="dice" className="h-6 w-6 md:h-10 md:w-10" />
      <p>x {count}</p>
    </div>
  );

  const AirplaneTile: React.FC<AirplaneTileProps> = ({ text }) => (
    <div className="flex flex-col gap-1 items-center">
      <img
        src={Images.Airplane}
        alt="airplane"
        className=" max-h-6  md:max-h-10"
      />
      <p className="text-[10px] md:text-sm">{text}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center h-screen bg-[#0D1226]">
      <div className="w-full flex justify-center mb-4 mt-8">
        <div
          className={`flex flex-col items-center justify-center w-32 h-36 md:w-40 md:h-44  lv-box ${mainColorClassName}`}
        >
          <img src={charactorImageSrc} className="w-24 h-24 md:w-32 md:h-32" />
          <div className="flex flex-row items-center w-full px-4 gap-2">
            <p className="font-semibold text-[8px] md:text-xs">Lv.{userLv}</p>
            <div className="flex flex-row border border-[#F59E0B] rounded-full w-full h-2 gap-[1px]">
              <div
                className={`bg-[#DD2726] w-[5%] rounded-l-full ${
                  userLv < 1 ? 'hidden' : ''
                }`}
              ></div>
              <div
                className={`bg-[#DD2726] w-[5%] ${userLv < 2 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#DD2726] w-[5%] ${userLv < 3 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#DD2726] w-[5%] ${userLv < 4 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#F59E0B] w-[5%] ${userLv < 5 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#F59E0B] w-[5%] ${userLv < 6 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#F59E0B] w-[5%] ${userLv < 7 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#F59E0B] w-[5%] ${userLv < 8 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#FACC15] w-[5%] ${userLv < 9 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#FACC15] w-[5%] ${userLv < 10 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#FACC15] w-[5%] ${userLv < 11 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#FACC15] w-[5%] ${userLv < 12 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#22C55E] w-[5%] ${userLv < 13 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#22C55E] w-[5%] ${userLv < 14 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#22C55E] w-[5%] ${userLv < 15 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#22C55E] w-[5%] ${userLv < 16 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#0147E5] w-[5%] ${userLv < 17 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#0147E5] w-[5%] ${userLv < 18 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#0147E5] w-[5%] ${userLv < 19 ? 'hidden' : ''}`}
              ></div>
              <div
                className={`bg-[#0147E5] w-[5%] rounded-r-full ${
                  userLv < 20 ? 'hidden' : ''
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 grid-rows-6 gap-1 text-xs md:text-base ">
        <div id="10" className={getTileStyle(10)}>
          11
        </div>
        <div id="9" className={getTileStyle(9)}>
          <StarTile count={100} />
        </div>
        <div id="8" className={getTileStyle(8)}>
          <AirplaneTile text="Go Game" />
        </div>
        <div id="7" className={getTileStyle(7)}>
          <DiceTile count={1} />
        </div>
        <div id="6" className={getTileStyle(6)}>
          <StarTile count={30} />
        </div>
        <div id="5" className={getTileStyle(5)}>
          6
        </div>
        <div id="11" className={getTileStyle(11)}>
          <StarTile count={30} />
        </div>
        <div className="col-span-4 row-span-4 flex flex-col items-center justify-evenly bg-center rotate-background">
          <div className="w-full flex justify-center mb-4 ">
            <GaugeComponent
              className=" z-0  w-64 -top-4 absolute md:w-96 md:top-2 max-h-24"
              type="semicircle"
              value={(gaugeValue / 6) * 6}
              maxValue={6}
              arc={{
                colorArray: ['#ffffff', '#FF2121'],
                padding: 0.02,
                subArcs: [
                  { limit: 1 },
                  { limit: 2 },
                  { limit: 3 },
                  { limit: 4 },
                  { limit: 5 },
                  { limit: 6 },
                ],
              }}
              pointer={{
                type: 'blob',
                animationDelay: 0,
                animationDuration: 0,
              }}
              labels={{
                valueLabel: { hide: true },
                tickLabels: { hideMinMax: true, ticks: [] },
              }}
            />
          </div>
          <div className="relative w-[120px] h-[120px] bg-[#F59E0B] rounded-full md:w-44 md:h-44">
            <div className="bg-[#FACC15] rounded-full w-[110px] h-[110px] object-center absolute left-[5px] top-[5px] md:left-2 md:top-2 md:w-40 md:h-40"></div>
            <div className="flex flex-col w-full h-full items-center justify-center dice-container">
              <Dice ref={diceRef} onRollComplete={handleRollComplete} />
            </div>
            <p className="absolute text-white text-sm font-semibold drop-shadow bottom-6 right-5 z-30 md:bottom-11 md:right-9">
              x 10
            </p>
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              className={`bg-white rounded-full h-10 w-24 self-center absolute -bottom-5 left-2 md:w-40 md:h-14 border border-[#E5E5E5] text-sm md:text-lg font-medium ${
                buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={buttonDisabled}
            >
              Roll Dice
            </button>
          </div>
          <div> &nbsp;</div>
        </div>
        <div id="4" className={getTileStyle(4)}>
          <StarTile count={30} />
        </div>
        <div id="12" className={getTileStyle(12)}>
          <DiceTile count={1} />
        </div>
        <div id="3" className={getTileStyle(3)}>
          <DiceTile count={1} />
        </div>
        <div id="13" className={getTileStyle(13)}>
          <AirplaneTile text="Go Home" />
        </div>
        <div id="2" className={getTileStyle(2)}>
          <AirplaneTile text="Go Spin" />
        </div>
        <div id="14" className={getTileStyle(14)}>
          <StarTile count={50} />
        </div>
        <div id="1" className={getTileStyle(1)}>
          <StarTile count={30} />
        </div>
        <div id="15" className={getTileStyle(15)}>
          16
        </div>
        <div id="16" className={getTileStyle(16)}>
          <StarTile count={50} />
        </div>
        <div id="17" className={getTileStyle(17)}>
          <DiceTile count={2} />
        </div>
        <div id="18" className={getTileStyle(18)}>
          <AirplaneTile text="Anywhere" />
        </div>
        <div id="19" className={getTileStyle(19)}>
          <StarTile count={50} />
        </div>
        <div id="0" className={getTileStyle(0)}>
          Home
        </div>
      </div>
      <div className="text-white mt-4">
        Current Position: {position} <br />
        Dice Value: {diceValue}
      </div>
      <motion.div
        className="absolute"
        initial={{ x: initialX, y: initialY }}
        animate={{ x, y }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 25 },
          y: { type: 'spring', stiffness: 300, damping: 15 },
        }}
      >
        <img
          src={charactorImageSrc}
          alt="userLv20"
          className="w-12 h-12  md:w-20 md:h-20"
        />
      </motion.div>
    </div>
  );
};

export default DiceEvent;
