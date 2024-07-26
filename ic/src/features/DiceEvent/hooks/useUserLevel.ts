import { useState, useEffect } from 'react';
import Images from '@/shared/assets/images';

const useUserLevel = () => {
  const [userLv, setUserLv] = useState<number>(10);
  const [mainColorClassName, setMainColorClassName] = useState<string>('');
  const [charactorImageSrc, setCharactorImageSrc] = useState<string>('');

  const getMainColorForUserLv = () => {
    if (userLv >= 1 && userLv <= 4) {
      return 'lv1to4-box';
    } else if (userLv >= 5 && userLv <= 8) {
      return 'lv5to8-box';
    } else if (userLv >= 9 && userLv <= 12) {
      return 'lv9to12-box';
    } else if (userLv >= 13 && userLv <= 16) {
      return 'lv13to16-box';
    } else if (userLv >= 17 && userLv <= 20) {
      return 'lv17to20-box';
    } else {
      return '';
    }
  };

  const getCharactorForUserLv = () => {
    if (userLv >= 1 && userLv <= 2) {
      return Images.Lv1to2;
    } else if (userLv >= 3 && userLv <= 4) {
      return Images.Lv3to4;
    } else if (userLv >= 5 && userLv <= 6) {
      return Images.Lv5to6;
    } else if (userLv >= 7 && userLv <= 8) {
      return Images.Lv7to8;
    } else if (userLv >= 9 && userLv <= 10) {
      return Images.Lv9to10;
    } else if (userLv >= 11 && userLv <= 12) {
      return Images.Lv11to12;
    } else if (userLv >= 13 && userLv <= 14) {
      return Images.Lv13to14;
    } else if (userLv >= 15 && userLv <= 16) {
      return Images.Lv15to16;
    } else if (userLv >= 17 && userLv <= 18) {
      return Images.Lv17to18;
    } else if (userLv >= 19 && userLv <= 20) {
      return Images.Lv19to20;
    } else {
      return '';
    }
  };

  useEffect(() => {
    setMainColorClassName(getMainColorForUserLv());
    setCharactorImageSrc(getCharactorForUserLv());
  }, [userLv]);

  return { userLv, setUserLv, mainColorClassName, charactorImageSrc };
};

export default useUserLevel;
