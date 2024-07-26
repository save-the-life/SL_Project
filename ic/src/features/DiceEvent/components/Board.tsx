import React from 'react';
import { motion } from 'framer-motion';
import calculateTilePosition from '@/shared/utils/calculateTilePosition';

interface BoardProps {
  position: number;
  charactorImageSrc: string;
  initialX: number;
  initialY: number;
  delta: number;
}

const Board: React.FC<BoardProps> = ({
  position,
  charactorImageSrc,
  initialX,
  initialY,
  delta,
}) => {
  const { x, y } = calculateTilePosition(position, initialX, initialY, delta);

  return (
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
        className="w-12 h-12 md:w-20 md:h-20"
      />
    </motion.div>
  );
};

export default Board;
