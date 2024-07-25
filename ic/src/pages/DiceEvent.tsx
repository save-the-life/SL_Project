import React, { useState, useEffect, useRef } from 'react';
import ReactDice, { ReactDiceRef } from 'react-dice-complete';
import Images from '@/shared/assets/images';
import './DiceEvent.css';

const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const DiceEvent: React.FC = () => {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [rolling, setRolling] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [moving, setMoving] = useState<boolean>(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(randomValue);
      setRolling(false);
      movePiece(randomValue);
    }, 1000);
  };

  const movePiece = (steps: number) => {
    setMoving(true);
    let currentPosition = position;
    const moveInterval = setInterval(() => {
      currentPosition = (currentPosition + 1) % 24;
      setPosition(currentPosition);
      steps--;
      if (steps === 0) {
        clearInterval(moveInterval);
        setMoving(false);
      }
    }, 300);
  };

  const getTileStyle = (tileNumber: number) => {
    const baseStyle =
      'flex items-center justify-center w-[52px] h-[52px] md:w-24 md:h-24  text-center';
    const startStyle = baseStyle + ' ' + 'start-tile text-white';
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

  const reactDice = useRef<ReactDiceRef>(null);

  const rollDone = (totalValue: number, values: number[]) => {
    console.log('individual die values array:', values);
    console.log('total dice value:', totalValue);
  };

  const rollAll = () => {
    reactDice.current?.rollAll();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0D1226]   ">
      <div className="grid grid-cols-6 grid-rows-6 gap-1 text-xs md:text-base">
        <div className={getTileStyle(10)}>11</div>
        <div className={getTileStyle(4)}>10</div>
        <div className={getTileStyle(8)}>9</div>{' '}
        <div className={getTileStyle(7)}>8</div>{' '}
        <div className={getTileStyle(6)}>7</div>{' '}
        <div className={getTileStyle(5)}>6</div>{' '}
        <div className={getTileStyle(11)}>12</div>
        <div
          className="col-span-4 row-span-4 flex flex-col items-center justify-center  bg-center "
          style={{
            backgroundImage: `url(${Images.DiceBackgroundEffect})`,
          }}
        >
          <div className="relative  w-[120px] h-[120px] bg-[#F59E0B] rounded-full md:w-44 md:h-44">
            <div className=" bg-[#FACC15]  rounded-full  w-[110px] h-[110px] object-center absolute left-[5px] top-[5px] md:left-2 md:top-2 md:w-40 md:h-40 "></div>
            <div className="flex flex-col w-full h-full items-center justify-center dice-container">
              <ReactDice
                numDice={1}
                ref={reactDice}
                rollDone={rollDone}
                rollTime={2}
                dieSize={60}
                defaultRoll={3}
                dieCornerRadius={5}
                dotColor="#FFFFFF"
                faceColor="#D92323"
              />
            </div>
            <button className="bg-white rounded-full h-10 w-24 self-center absolute -bottom-5 left-2 md:w-40 md:h-14 border border-[#E5E5E5] text-sm md:text-lg font-medium">
              Click Here!
            </button>
          </div>
        </div>
        <div className={getTileStyle(4)}>5</div>
        <div className={getTileStyle(12)}>13</div>{' '}
        <div className={getTileStyle(3)}>4</div>{' '}
        <div className={getTileStyle(13)}>14</div>{' '}
        <div className={getTileStyle(2)}>3</div>{' '}
        <div className={getTileStyle(14)}>15</div>{' '}
        <div className={getTileStyle(1)}>2</div>{' '}
        <div className={getTileStyle(15)}>16</div>{' '}
        <div className={getTileStyle(16)}>17</div>{' '}
        <div className={getTileStyle(17)}>18</div>{' '}
        <div className={getTileStyle(18)}>19</div>{' '}
        <div className={getTileStyle(19)}>20</div>{' '}
        <div className={getTileStyle(0)}>1</div>
      </div>
    </div>
  );
};

export default DiceEvent;
