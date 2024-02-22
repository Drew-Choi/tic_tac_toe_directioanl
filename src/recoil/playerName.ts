import { ReactNode } from 'react';
import { atom } from 'recoil';

export const playerName = atom<PlayerNameType[] | []>({
  key: 'playerName',
  default: [],
});
