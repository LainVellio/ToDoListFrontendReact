import React, { RefObject } from 'react';

import useCatchKeydown from '../../../utils/useCatchKeydown';
import { useOutsideClick } from '../../../utils/useOutsideClick';

import { MenuWrapper } from '../MenuWrapper';
import DeleteMenuWrapper from './DeleteMenu.style';

interface DeleteMenuProps {
  outsideRef: RefObject<HTMLDivElement>;
  deleteTodo(): void;
  sendInArchive(): void;
  setDeleteMenu(deleteMenu: boolean): void;
}

export const DeleteMenu: React.FC<DeleteMenuProps> = ({
  outsideRef,
  deleteTodo,
  sendInArchive,
  setDeleteMenu,
}) => {
  const closeMenu = () => {
    setDeleteMenu(false);
  };
  useCatchKeydown('Escape', closeMenu);
  useOutsideClick(outsideRef, closeMenu, true);

  return (
    <DeleteMenuWrapper>
      <MenuWrapper topShift={60}>
        <div className="option">
          <div
            onClick={() => sendInArchive()}
            className="elementMenu inArchive"
          >
            В Архив
          </div>
          <div
            onClick={() => {
              deleteTodo();
            }}
            className="elementMenu delete"
          >
            Удалить
          </div>
        </div>
      </MenuWrapper>
    </DeleteMenuWrapper>
  );
};
