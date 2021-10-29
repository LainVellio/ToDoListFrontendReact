import { useEffect } from 'react';

export const useCatchKeydown = (
  keys: string[] | string,
  callback: () => void,
) => {
  useEffect(() => {
    const onKeypress = (event: KeyboardEvent) =>
      typeof keys === 'string'
        ? keys === event.key && callback()
        : keys.map((key: string) => event.key === key && callback());

    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);
};

export default useCatchKeydown;
