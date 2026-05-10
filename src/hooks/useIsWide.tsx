import { useEffect, useState } from 'react';

import { debounce } from '@/lib/utils';

export function useIsWide(wideWidth: number) {
  const [isWide, setIsWide] = useState(window.innerWidth > wideWidth);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsWide(window.innerWidth > wideWidth);
    }, 500);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isWide,
  };
}
