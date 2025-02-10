import {useEffect, useState} from 'react';

let isHydrating = true;

export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(() => !isHydrating);
  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);
  return isHydrated;
}
