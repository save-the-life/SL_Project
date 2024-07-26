import { useState, useRef } from 'react';

const useDice = (
  initialPosition: number,
  setPosition: (position: number) => void,
) => {
  const diceRef = useRef<any>(null);
  const [diceValue, setDiceValue] = useState<number>(0);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [moving, setMoving] = useState<boolean>(false);

  const rollDice = () => {
    setButtonDisabled(true);
    diceRef.current?.roll();
  };

  const handleRollComplete = (value: number) => {
    setDiceValue(value);
    movePiece(value);
  };

  const movePiece = (steps: number) => {
    if (moving) return;
    setMoving(true);
    let currentPosition = initialPosition;
    const moveStep = () => {
      currentPosition = (currentPosition + 1) % 20;
      setPosition(currentPosition);
      if (steps > 1) {
        steps--;
        setTimeout(moveStep, 300);
      } else {
        setMoving(false);
        setButtonDisabled(false);
      }
    };
    moveStep();
  };

  return {
    diceRef,
    diceValue,
    rollDice,
    handleRollComplete,
    buttonDisabled,
    setButtonDisabled,
  };
};

export default useDice;
