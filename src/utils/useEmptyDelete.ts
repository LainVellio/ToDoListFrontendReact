import { useEffect } from 'react';

const useEmptyDelete = (
  editMode: boolean,
  text: string,
  deleteCallback: () => void,
  setCallback: () => void,
) => {
  useEffect(() => {
    if (!editMode) {
      if (text === '') {
        deleteCallback();
      } else {
        setCallback();
      }
    }
  }, [editMode]);
};

export default useEmptyDelete;
