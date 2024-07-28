import { Dispatch, SetStateAction, MouseEvent, TouchEvent } from 'react';

export const handleMouseDown = (
  event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
  buttonDisabled: boolean,
  diceCount: number,
  setIsHolding: Dispatch<SetStateAction<boolean>>,
) => {
  event.preventDefault();
  if (buttonDisabled || diceCount < 1) return;
  setIsHolding(true);
};

export const handleMouseUp = (
  event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
  buttonDisabled: boolean,
  diceCount: number,
  setIsHolding: Dispatch<SetStateAction<boolean>>,
  rollDice: () => void,
  setDiceCount: Dispatch<SetStateAction<number>>,
) => {
  event.preventDefault();
  if (buttonDisabled || diceCount < 1) return;
  setIsHolding(false);
  rollDice();
  setDiceCount((prevCount) => prevCount - 1);
};

export const applyReward = (
  tileNumber: number,
  setStarPoints: Dispatch<SetStateAction<number>>,
  setDiceCount: Dispatch<SetStateAction<number>>,
) => {
  const tile = document.getElementById(tileNumber.toString());
  if (tile) {
    const starReward = parseInt(tile.getAttribute('data-star') || '0', 10);
    const diceReward = parseInt(tile.getAttribute('data-dice') || '0', 10);
    setStarPoints((prev) => prev + starReward);
    setDiceCount((prev) => prev + diceReward);
  }
};

export const movePiece = (
  steps: number,
  position: number,
  setPosition: Dispatch<SetStateAction<number>>,
  setMoving: Dispatch<SetStateAction<boolean>>,
  setButtonDisabled: Dispatch<SetStateAction<boolean>>,
  setSelectingTile: Dispatch<SetStateAction<boolean>>,
  setStarPoints: Dispatch<SetStateAction<number>>,
  setDiceCount: Dispatch<SetStateAction<number>>,
) => {
  setMoving(true);

  let currentPosition = position;
  const moveStep = () => {
    currentPosition = (currentPosition + 1) % 20;
    setPosition(currentPosition);

    if (currentPosition === 0) {
      setStarPoints((prev) => prev + 200);
    }

    if (steps > 1) {
      steps--;
      setTimeout(moveStep, 300);
    } else {
      applyReward(currentPosition, setStarPoints, setDiceCount);

      switch (currentPosition) {
        case 2:
          setTimeout(() => {
            setPosition(15);
            applyReward(15, setStarPoints, setDiceCount);
            setMoving(false);
            setButtonDisabled(false);
          }, 300);
          break;
        case 8:
          setTimeout(() => {
            setPosition(5);
            applyReward(5, setStarPoints, setDiceCount);
            setMoving(false);
            setButtonDisabled(false);
          }, 300);
          break;
        case 13:
          setTimeout(() => {
            setPosition(0);
            applyReward(0, setStarPoints, setDiceCount);
            setMoving(false);
            setButtonDisabled(false);
          }, 300);
          break;
        case 18:
          setSelectingTile(true);
          setMoving(false);
          break;
        default:
          setMoving(false);
          setButtonDisabled(false);
          break;
      }
    }
  };
  moveStep();
};
