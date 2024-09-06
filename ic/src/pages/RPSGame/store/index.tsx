import create from 'zustand';

interface RPSGameState {
  betAmount: number;
  currentRound: number;
  totalRounds: number;
  isSpinning: boolean;
  slotResults: string[];
  winMultiplier: number;
  isGameStarted: boolean;
  isDialogOpen: boolean;
  gameResult: 'win' | 'lose' | null;
  userPoints: number;

  setBetAmount: (amount: number) => void;
  setUserPoints: (points: number) => void;
  startGame: () => void;
  spin: () => void;
  stopSpin: (result: string) => void;
  checkResult: () => void;
  continueGame: () => void;
  endGame: () => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useRPSGameStore = create<RPSGameState>((set, get) => ({
  betAmount: 0,
  currentRound: 1,
  totalRounds: 3,
  isSpinning: false,
  slotResults: [],
  winMultiplier: 1,
  isGameStarted: false,
  isDialogOpen: false,
  gameResult: null,
  userPoints: 10000,

  setBetAmount: (amount: number) => set({ betAmount: amount }),
  setUserPoints: (points: number) => set({ userPoints: points }),

  startGame: () =>
    set({
      isGameStarted: true,
      currentRound: 1,
      slotResults: [],
      winMultiplier: 1,
    }),

  spin: () => set({ isSpinning: true }),

  stopSpin: (result: string) =>
    set((state) => ({
      isSpinning: false,
      slotResults: [...state.slotResults, result],
    })),

  checkResult: () => {
    const { slotResults, currentRound, totalRounds, betAmount, userPoints } =
      get();
    const playerChoice = slotResults[currentRound - 1];
    const computerChoice = ['rock', 'paper', 'scissors'][
      Math.floor(Math.random() * 3)
    ];

    let roundResult;
    if (playerChoice === computerChoice) roundResult = 'draw';
    else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      roundResult = 'win';
    } else {
      roundResult = 'lose';
    }

    if (roundResult === 'win') {
      if (currentRound === totalRounds) {
        set((state) => ({
          gameResult: 'win',
          winMultiplier: state.winMultiplier * 2,
          userPoints: userPoints + betAmount * state.winMultiplier * 2,
        }));
      } else {
        set((state) => ({ currentRound: state.currentRound + 1 }));
      }
    } else if (roundResult === 'lose') {
      set({
        gameResult: 'lose',
        userPoints: userPoints - betAmount,
      });
    }

    set({ isDialogOpen: true });
  },

  continueGame: () =>
    set((state) => ({
      currentRound: 1,
      slotResults: [],
      winMultiplier: state.winMultiplier * 2,
      gameResult: null,
      isDialogOpen: false,
    })),

  endGame: () =>
    set({
      isGameStarted: false,
      betAmount: 0,
      currentRound: 1,
      slotResults: [],
      winMultiplier: 1,
      gameResult: null,
      isDialogOpen: false,
    }),

  openDialog: () => set({ isDialogOpen: true }),

  closeDialog: () => set({ isDialogOpen: false }),
}));
