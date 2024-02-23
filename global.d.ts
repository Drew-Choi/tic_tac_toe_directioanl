declare global {
  interface GroundDataType {
    [key: number]: (null | string)[];
  }

  interface GameConditionType {
    ground: number | null;
    victoryCondition: number;
  }

  interface PlayerNameType {
    idx: number;
    name: string;
    icon: number;
    color: string;
  }
}

export {};
