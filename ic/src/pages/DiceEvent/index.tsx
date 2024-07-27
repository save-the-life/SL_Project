import React, { useEffect, useState } from 'react';
import {
  Board,
  Gauge,
  StarTile,
  DiceTile,
  AirplaneTile,
  useDice,
  useGauge,
  useUserLevel,
} from '@/features/DiceEvent';
import UserLevel from '@/entities/User/components/UserLevel';
import '@/features/DiceEvent/DiceEvent.css';
import Dice from '@/widgets/Dice';
import Images from '@/shared/assets/images';

const DiceEventPage: React.FC = () => {
  const initialCharacterType: 'dog' | 'cat' = 'dog'; // 초기 캐릭터 유형을 설정
  const [position, setPosition] = useState<number>(0);
  const [moving, setMoving] = useState<boolean>(false); // 이동 상태 추가
  const {
    diceRef,
    diceValue,
    rollDice,
    handleRollComplete: originalHandleRollComplete,
    buttonDisabled,
    setButtonDisabled,
  } = useDice(position, setPosition);
  const { gaugeValue, isHolding, setIsHolding } = useGauge();
  const {
    userLv,
    setUserLv,
    mainColorClassName,
    charactorImageSrc,
    characterType,
    setCharacterType,
  } = useUserLevel(initialCharacterType);

  const [initialX, setInitialX] = useState<number>(140);
  const [initialY, setInitialY] = useState<number>(474);
  const [delta, setDelta] = useState<number>(56);

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

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (buttonDisabled) return;
    setIsHolding(true);
  };

  const handleMouseUp = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (buttonDisabled) return;
    setIsHolding(false);
    rollDice();
  };

  const movePiece = (steps: number) => {
    if (moving) return; // 이미 이동 중인 경우 동작하지 않음
    setMoving(true); // 이동 상태 설정

    let currentPosition = position;
    const moveStep = () => {
      currentPosition = (currentPosition + 1) % 20;
      setPosition(currentPosition);
      if (steps > 1) {
        steps--;
        setTimeout(moveStep, 300); // 0.3초마다 한 칸 이동
      } else {
        // 비행기 칸에 도착했을 때 특별한 행동 추가
        switch (currentPosition) {
          case 2:
            setPosition(15);
            break;
          case 8:
            setPosition(5);
            break;
          case 13:
            setPosition(0);
            break;
          // 18번 타일은 나중에 처리
          default:
            break;
        }
        setMoving(false); // 이동 상태 해제
        setButtonDisabled(false); // 버튼 활성화
      }
    };
    moveStep();
  };

  const handleRollComplete = (value: number) => {
    originalHandleRollComplete(value);
    movePiece(value);
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
    const activeStyle = 'active-tile';

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

  return (
    <div className="flex flex-col items-center h-screen bg-[#0D1226]">
      <div className="w-full flex justify-center mb-4 mt-8 gap-4">
        <UserLevel
          userLv={userLv}
          charactorImageSrc={charactorImageSrc}
          mainColorClassName={mainColorClassName}
        />
        <div className="flex flex-col items-center justify-center w-48 h-36 md:w-96 md:h-44 relative prize-box overflow-visible z-10 gap-2">
          <div className="absolute h-7 w-20 rounded-full border border-black bg-white flex items-center justify-center text-xs -top-4 z-20 font-medium box-border left-14 md:left-36 inset-2 ">
            Week 2
          </div>
          <img src={Images.SLSymbol} alt="token logo" className=" h-14 mt-2" />
          <div className="flex flex-col items-center">
            <p className=" font-semibold text-base">SL Coin</p>
            <p className=" text-xs font-normal">(Approx. $8,000)</p>
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
          <div className="w-full flex justify-center mb-4">
            <Gauge gaugeValue={gaugeValue} />
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
      <Board
        position={position}
        charactorImageSrc={charactorImageSrc}
        initialX={initialX}
        initialY={initialY}
        delta={delta}
      />
    </div>
  );
};

export default DiceEventPage;
