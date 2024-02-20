import { atom, selector } from 'recoil';

export const groundInputValue = atom<number>({
  key: 'groundInputValue',
  default: 3,
});

export const groundDataSet = selector({
  key: 'cartQuantity',
  get: ({ get }): GroundDataType | undefined | null => {
    const nuputNumber = get(groundInputValue);

    if (nuputNumber < 3) return null;

    return new Array(nuputNumber).fill(null).reduce((acc, _, index) => {
      acc[index] = new Array(nuputNumber).fill(null);
      return acc;
    }, {});
  },
});
