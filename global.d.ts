declare global {
  interface GroundDataType {
    [key: number]: (null | string)[];
  }

  interface GameConditionType {
    ground: number | null;
    victoryCondition: number;
  }

  interface PlayerNameType {
    name: string;
    icon: ReactNode;
    color: string;
  }
}

export {};
