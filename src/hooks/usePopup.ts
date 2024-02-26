// 팝업창 커스텀 훅
import { useRecoilState } from 'recoil';
import { usePopupState } from '../recoil/usePopupState';

export const usePopup = () => {
  const [popup, setPopup] = useRecoilState(usePopupState);

  const openPopup = ({
    title = '',
    content = '',
    onStart = null,
    onHistory = null,
  }: UsePopupProps) => {
    setPopup({
      show: true,
      title,
      content,
      onStart,
      onHistory,
    });
  };

  const closePopup = () => {
    setPopup({
      show: false,
      title: '',
      content: '',
      onStart: null,
      onHistory: null,
    });
  };

  return { popup, openPopup, closePopup };
};
