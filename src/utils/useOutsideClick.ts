import { RefObject, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
  editMode: boolean,
): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    editMode && document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, editMode, ref]);
};
