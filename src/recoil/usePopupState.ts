import { atom } from 'recoil';

export const usePopupState = atom<UsePopupProps>({
  key: 'usePopupState',
  default: {
    show: false,
    title: '',
    content: '',
    onStart: null as (() => void) | null,
    onHistory: null as (() => void) | null,
  },
});
