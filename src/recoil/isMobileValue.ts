import { atom } from 'recoil';

export const isMobileValue = atom<boolean>({
  key: 'isMobileValue',
  default: false,
});
