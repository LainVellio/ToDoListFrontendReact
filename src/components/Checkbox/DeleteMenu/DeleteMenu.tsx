import React, { RefObject } from 'react';

import useCatchKeydown from '../../../utils/useCatchKeydown';
import { useOutsideClick } from '../../../utils/useOutsideClick';

import { MenuWrapper } from '../MenuWrapper';
import DeleteMenuWrapper from './DeleteMenu.style';

interface DeleteMenuProps {
  outsideRef: RefObject<HTMLDivElement>;
  deleteTodo(): void;
  sendInArchive(): void;
  closeDeleteMenu(): void;
}

export const DeleteMenu: React.FC<DeleteMenuProps> = ({
  outsideRef,
  deleteTodo,
  sendInArchive,
  closeDeleteMenu,
}) => {
  useCatchKeydown('Escape', closeDeleteMenu);
  useOutsideClick(outsideRef, closeDeleteMenu, true);

  return (
    <DeleteMenuWrapper data-testid="deleteMenu">
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
