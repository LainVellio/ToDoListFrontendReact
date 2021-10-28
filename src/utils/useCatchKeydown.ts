import { useEffect } from 'react';

export const useCatchKeydown = (keys: string[], callback: () => void) => {
  useEffect(() => {
    const onKeypress = (event: KeyboardEvent) => {
      keys.map((key: string) => event.key === key && callback());
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);
};

export default useCatchKeydown;
