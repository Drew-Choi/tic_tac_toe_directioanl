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
    idx: number;
    name: string;
    icon: number;
    color: string;
  }

  interface PlayerInfoChangeIconType extends Omit<PlayerInfoType, 'icon'> {
    icon: ReactNode | null;
  }

  interface PlayerMarkPositionType {
    0: {
      rollBack: number;
      history: { x: number; y: number }[] | [];
    };
    1: {
      rollBack: number;
      history: { x: number; y: number }[] | [];
    };
  }
}

export {};
