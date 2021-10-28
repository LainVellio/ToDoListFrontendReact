import { useEffect } from 'react';

export const useOutsideClick = (
  ref: any,
  callback: () => void,
  editMode: boolean,
): any => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    editMode && document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, editMode, ref]);
};
