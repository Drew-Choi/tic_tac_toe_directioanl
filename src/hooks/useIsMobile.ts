import { useRecoilValue } from 'recoil';
import { isMobileValue } from '../recoil/isMobileValue';

export const useIsMobile = () => {
  const checkMobileValue = useRecoilValue(isMobileValue);

  return checkMobileValue;
};
