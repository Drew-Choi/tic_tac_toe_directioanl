import { atom, selector } from 'recoil';

export const gameCondition = atom<GameConditionType>({
  key: 'gameCondition',
  default: {
    ground: null,
    victoryCondition: 3,
  },
});

export const groundDataSet = selector({
  key: 'groundDataSet',
  get: ({ get }): GroundDataType | undefined | null => {
    const groundNumber = get(gameCondition).ground;

    if (!groundNumber) return null;

    if (groundNumber < 3) return null;

    return new Array(groundNumber).fill(null).reduce((acc, _, index) => {
      acc[index] = new Array(groundNumber).fill(null);
      return acc;
    }, {});
  },
});
