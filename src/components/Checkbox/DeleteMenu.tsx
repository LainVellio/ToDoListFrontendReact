import React from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../../utils/useOutsideClick';

import { MenuWrapper } from './MenuWrapper';

const DeleteMenuWrapper = styled.div`
  margin-top: 15px;
  .option {
    width: 100%;
    padding: 5px 10px 5px 10px;
  }
  .elementMenu {
    font-weight: normal;
    cursor: pointer;
  }
  .elementMenu:hover {
    background-color: #e9e9e9;
  }
  .inArchive {
  }
  .delete {
    color: #df0b52;
  }
`;

interface DeleteMenuProps {
  id: number;
  deleteTodo(categoryId: number): void;
  setDeleteMenu(deleteMenu: boolean): void;
  sendInArchive(categoryId: number): void;
  outsideRef: any;
}

export const DeleteMenu: React.FC<DeleteMenuProps> = ({
  id,
  deleteTodo,
  sendInArchive,
  setDeleteMenu,
  outsideRef,
}) => {
  const closeMenu = () => {
    setDeleteMenu(false);
  };
  useOutsideClick(outsideRef, closeMenu, true);

  return (
    <DeleteMenuWrapper>
      <MenuWrapper topShift={60}>
        <div className="option">
          <div
            onClick={() => sendInArchive(id)}
            className="elementMenu inArchive"
          >
            В Архив
          </div>
          <div
            onClick={() => {
              deleteTodo(id);
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
