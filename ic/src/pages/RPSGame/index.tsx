import React, { useEffect } from 'react';
import Images from '@/shared/assets/images';
import { motion } from 'framer-motion';
import { formatNumber } from '@/shared/utils/formatNumber';
import RPSResultDialog from './ui/RPSResultDialog';
import RPSGameStart from './ui/RPSGameStart';
import { useRPSGameStore } from './store';

const rpsImages = [Images.Rock, Images.Scissors, Images.Paper];

const RPSGame: React.FC = () => {
  const {
    betAmount,
    isSpinning,
    slotResults,
    winMultiplier,
    isGameStarted,
    isDialogOpen,
    currentRound,
    gameResult,
    userPoints,
    setBetAmount,
    startGame,
    spin,
    stopSpin,
    checkResult,
    continueGame,
    endGame,
    closeDialog,
  } = useRPSGameStore();

  const handleSpin = (choice: string) => {
    if (isSpinning) return; // Prevent multiple spins

    spin();

    // Simulate the spinning effect
    const spinDuration = 2000; // 2 seconds
    const intervalDuration = 100; // Update every 100ms
    let elapsedTime = 0;

    const spinInterval = setInterval(() => {
      elapsedTime += intervalDuration;
      if (elapsedTime >= spinDuration) {
        clearInterval(spinInterval);
        stopSpin(choice);
        checkResult();
      }
    }, intervalDuration);
  };

  const handleGameStart = (amount: number) => {
    setBetAmount(amount);
    startGame();
  };

  const handleContinue = () => {
    continueGame();
  };

  const handleQuit = () => {
    endGame();
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
        <RPSGameStart onStart={handleGameStart} userPoints={userPoints} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="flex flex-row items-center justify-center h-[86px] w-[264px] border-2 border-[#21212f] rounded-3xl bg-white gap-3">
            <div className="flex flex-row items-center gap-1">
              <img src={Images.Star} alt="star" className="w-9 h-9" />
              <p className="text-3xl font-semibold">
                {formatNumber(betAmount * winMultiplier)}
              </p>
            </div>
            <div className="bg-[#21212f] rounded-full flex items-center justify-center h-8 w-11 text-sm font-semibold text-white">
              x {winMultiplier}
            </div>
          </div>
          <div className="mt-8 relative">
            <img
              src={Images.RPSGame}
              alt="RPSGame"
              className="w-[353px] h-[481px]"
            />
            <div
              id="First-RPS"
              className="absolute bottom-[211px] left-8 gap-2 flex flex-row items-center justify-center pl-1 w-[87px] overflow-y-hidden h-[80px] transform"
            >
              <motion.div
                className="flex flex-col items-center justify-center h-full"
                initial={{ y: 0 }}
                animate={{ y: isSpinning ? ['-100%', '0%'] : '0%' }}
                transition={{
                  duration: isSpinning ? 0.1 : 0.5,
                  ease: 'linear',
                  repeat: isSpinning ? Infinity : 0,
                }}
              >
                {rpsImages.map((slot, index) => (
                  <div
                    key={index}
                    className="slot-item text-5xl flex items-center justify-center"
                    style={{ height: '100%', width: '100%' }}
                  >
                    <img
                      src={slot}
                      alt={`slot-${index}`}
                      className="h-[70px] min-w-[50px] self-center"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div
              id="second-RPS"
              className="absolute bottom-[211px] left-[120px] gap-2 flex flex-row items-center justify-center pl-1 w-[87px] overflow-y-hidden h-[80px] transform"
            >
              {/* Similar motion.div as above */}
            </div>
            <div
              id="third-RPS"
              className="absolute bottom-[211px] left-[210px] gap-2 flex flex-row items-center justify-center pl-1 w-[87px] overflow-y-hidden h-[80px] transform"
            >
              {/* Similar motion.div as above */}
            </div>
            <div className="absolute bottom-20 left-5 gap-2 flex flex-row items-center justify-around w-[230px] px-8 transform">
              <img
                src={Images.RockButton}
                alt="rock"
                className="w-[68px] h-[68px]"
                onClick={() => handleSpin('rock')}
              />
              <img
                src={Images.PaperButton}
                alt="paper"
                className="w-[68px] h-[68px]"
                onClick={() => handleSpin('paper')}
              />
              <img
                src={Images.ScissorsButton}
                alt="scissors"
                className="w-[68px] h-[68px]"
                onClick={() => handleSpin('scissors')}
              />
            </div>
          </div>
        </div>
      )}
      <RPSResultDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        result={gameResult}
        winnings={betAmount * winMultiplier}
        onContinue={handleContinue}
        onQuit={handleQuit}
      />
    </div>
  );
};

export default RPSGame;
