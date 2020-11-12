import React, { useEffect, useState } from 'react';
import theme from 'src/app/theme';
import useWindowSize from './useWindowSize';

function useIsDesktop() {
  const [width, height] = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(width >= Number(theme.mobileL.split('p')[0]));

  useEffect(() => {
    setIsDesktop(width >= Number(theme.mobileL.split('p')[0]));
  }, [width]);

  return isDesktop;
}

export default useIsDesktop;