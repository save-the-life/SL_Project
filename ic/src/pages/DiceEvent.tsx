import React, { useState, useRef, useEffect } from 'react';
import './DiceEvent.css';
import Dice from '@/widgets/Dice'; // 주사위 컴포넌트를 가져옵니다.
import Images from '@/shared/assets/images';
import GaugeComponent from 'react-gauge-component';

const DiceEvent: React.FC = () => {
  const diceRef = useRef<any>(null);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [position, setPosition] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [gaugeValue, setGaugeValue] = useState<number>(0.5);
  const [isIncreasing, setIsIncreasing] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isHolding) {
      interval = setInterval(() => {
        setGaugeValue((prev) => {
          if (prev >= 6) {
            setIsIncreasing(false);
            return prev - 0.5;
          } else if (prev <= 1) {
            setIsIncreasing(true);
            return prev + 0.5;
          }
          return isIncreasing ? prev + 0.5 : prev - 0.5;
        });
      }, 33);
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
    setIsHolding(true);
  };

  const handleMouseUp = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    setIsHolding(false);
    rollDice();
  };

  const rollDice = () => {
    diceRef.current?.roll();
  };

  const handleRollComplete = (value: number) => {
    setDiceValue(value);
    movePiece(value);
  };

  const movePiece = (steps: number) => {
    setPosition((prevPosition) => (prevPosition + steps) % 20);
  };

  const getTileStyle = (tileNumber: number) => {
    const baseStyle =
      'flex items-center justify-center w-[52px] h-[52px] md:w-24 md:h-24 text-center font-semibold text-xs md:text-sm ';
    const startStyle =
      baseStyle +
      ' ' +
      'start-tile text-white text-sm md:text-base  font-jalnan';
    const airplaneStyle = baseStyle + ' ' + 'airplane-tile';
    const gameStyle = baseStyle + ' ' + 'game-tile';
    const starStyle = baseStyle + ' ' + 'star-tile';
    const diceStyle = baseStyle + ' ' + 'dice-tile ';

    switch (tileNumber) {
      case 0:
        return startStyle;
      case 2:
      case 8:
      case 13:
      case 18:
        return airplaneStyle;
      case 1:
      case 4:
      case 6:
      case 9:
      case 11:
      case 14:
      case 16:
      case 19:
        return starStyle;
      case 5:
      case 10:
      case 15:
        return gameStyle;
      default:
        return diceStyle;
    }
  };

  interface StarTileProps {
    count: number;
  }

  interface DiceTileProps extends StarTileProps {}

  interface AirplaneTileProps {
    text: string;
  }

  const StarTile: React.FC<StarTileProps> = ({ count }) => (
    <div className="flex flex-col gap-1 items-center">
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
    <div className="flex flex-col items-center justify-center h-screen bg-[#0D1226]">
      <div className="w-full flex justify-center mb-4"></div>
      <div className="grid grid-cols-6 grid-rows-6 gap-1 text-xs md:text-base ">
        <div className={getTileStyle(10)}>11</div>
        <div className={getTileStyle(4)}>
          <StarTile count={100} />
        </div>
        <div className={getTileStyle(8)}>
          <AirplaneTile text="Go Game" />
        </div>
        <div className={getTileStyle(7)}>
          <DiceTile count={1} />
        </div>
        <div className={getTileStyle(6)}>
          <StarTile count={30} />
        </div>
        <div className={getTileStyle(5)}>6</div>
        <div className={getTileStyle(11)}>
          <StarTile count={30} />
        </div>
        <div className="col-span-4 row-span-4 flex flex-col items-center justify-evenly bg-center rotate-background">
          <div className="w-full flex justify-center mb-4 ">
            <GaugeComponent
              className=" z-10  w-64 -top-4 absolute md:w-96 md:top-2 max-h-24"
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
              pointer={{ type: 'blob', animationDelay: 10 }}
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
              className="bg-white rounded-full h-10 w-24 self-center absolute -bottom-5 left-2 md:w-40 md:h-14 border border-[#E5E5E5] text-sm md:text-lg font-medium"
            >
              Roll Dice
            </button>
          </div>
          <div> &nbsp;</div>
        </div>
        <div className={getTileStyle(4)}>
          <StarTile count={30} />
        </div>
        <div className={getTileStyle(12)}>
          <DiceTile count={1} />
        </div>
        <div className={getTileStyle(3)}>
          <DiceTile count={1} />
        </div>
        <div className={getTileStyle(13)}>
          <AirplaneTile text="Go Home" />
        </div>
        <div className={getTileStyle(2)}>
          <AirplaneTile text="Go Spin" />
        </div>
        <div className={getTileStyle(14)}>
          <StarTile count={50} />
        </div>
        <div className={getTileStyle(1)}>
          <StarTile count={30} />
        </div>
        <div className={getTileStyle(15)}>16</div>
        <div className={getTileStyle(16)}>
          <StarTile count={50} />
        </div>
        <div className={getTileStyle(17)}>
          <DiceTile count={2} />
        </div>
        <div className={getTileStyle(18)}>
          <AirplaneTile text="Anywhere" />
        </div>
        <div className={getTileStyle(19)}>
          <StarTile count={50} />
        </div>
        <div className={getTileStyle(0)}>Home</div>
      </div>
      <div className="text-white mt-4">
        Current Position: {position} <br />
        Dice Value: {diceValue}
      </div>
    </div>
  );
};

export default DiceEvent;
