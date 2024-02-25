import { ReactNode } from 'react';

declare global {
  interface GroundDataType {
    [key: number]: (null | (0 | 1))[];
  }

  interface GameConditionType {
    ground: number | null;
    victoryCondition: number;
  }

  interface PlayerInfoType {
    name: string;
    icon: { value: number; label?: ReactNode };
    color: string;
  }

  interface PlayerHistroyType {
    0: {
      rollBack: number;
      history: number[][] | [];
    };
    1: {
      rollBack: number;
      history: number[][] | [];
    };
  }

  interface LocalStorageHistoryType {
    players: PlayerInfoType[];
    gameCondition: GameConditionType;
    history: number[][];
    winner: 0 | 1;
    victoryPosition: number[][];
    time: string;
  }
  [];

  interface HistoryGroundDataType {
    [key: number]: (null | { player: { iconLabel: ReactNode; color: string }; index: number })[];
  }

  type HistoryGroundDataIndividualType = null | {
    player: { iconLabel: ReactNode; color: string };
    index: number;
  };

  type CheckVictoryReturnType = { win: boolean; victoryPosition: number[][] };
}

export {};
