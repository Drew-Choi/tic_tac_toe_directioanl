import { atom, selector } from 'recoil';
import SVG_LIST from '../constant/SVG_LIST';

export const playerInfo = atom<PlayerInfoType[] | []>({
  key: 'playerInfo',
  default: [],
});

export const playerInfoChangeIcon = selector({
  key: 'playerInfoChangeIcon',
  get: ({ get }): PlayerInfoType[] | null => {
    const playersInfos = get(playerInfo);

    if (!playersInfos) return null;

    return playersInfos.map((player) => ({
      ...player,
      icon: {
        ...player.icon,
        label: SVG_LIST.find((icon) => icon.value === player.icon.value)?.label || null,
      },
    }));
  },
});
