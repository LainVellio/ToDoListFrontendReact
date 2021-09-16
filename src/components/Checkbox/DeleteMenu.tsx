import styled from 'styled-components';

import { MenuWraper } from './MenuWraper';

const DeleteMenuWraper = styled.div`
  margin-top: 15px;
  .option {
    width: 100%;
    padding: 5px 10px 5px 10px;
  }
  .elementMenu {
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
  closeTodo: Function;
  setDeleteMenu: Function;
  useOutsideClick: Function;
  sendInArchive: Function;
}

export const DeleteMenu: React.FC<DeleteMenuProps> = ({
  id,
  closeTodo,
  sendInArchive,
  setDeleteMenu,
  useOutsideClick,
}) => {
  const closeMenu = () => {
    setDeleteMenu(false);
  };
  useOutsideClick(closeMenu);

  return (
    <DeleteMenuWraper>
      <MenuWraper topShift={60}>
        <div className="option">
          <div
            onClick={() => sendInArchive(id)}
            className="elementMenu inArchive"
          >
            В Архив
          </div>
          <div
            onClick={() => {
              closeTodo(id);
            }}
            className="elementMenu delete"
          >
            Удалить
          </div>
        </div>
      </MenuWraper>
    </DeleteMenuWraper>
  );
};
