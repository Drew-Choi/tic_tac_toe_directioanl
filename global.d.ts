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
    ground: number;
    history: number[][];
    time: string;
  }
  [];
}

export {};
