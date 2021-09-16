import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../../api/localStorageAPI';
import { EColors } from '../../interfaces';
import { InputEdit } from '../Form/InputEdit';
import { ColorsCircles } from '../ColorCircle/ColorCircles';
import { useOutsideClick } from '../../utils/useOutsideClick';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

const CardHeaderWrapper = styled.div<{ headerColor: string }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.headerColor};
  color: white;
  margin: -15px -16px 0px -16px;
  padding: 5px 10px;
  .icon {
    margin: 6px 5px 3px 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
    color: white;
  }
  .inputCard {
    font-size: 1.25rem;
    width: 250px;
  }
  .colorCircles {
    margin-top: 5px;
    margin-right: 3px;
    width: 20px;
    height: 20px;
    border: 1px solid white;
  }
  .button {
    background-color: rgba(255, 255, 255, 0);
    border: none;
    margin: 0;
    padding: 0;
  }
`;

export interface CardHeaderProps {
  isEdit: boolean;
  title: string;
  id: number;
  colorHeader: EColors;
  closeCard(id: number): void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  id,
  title,
  colorHeader,
  isEdit,
  closeCard,
}) => {
  const [editMode, setEditMode] = useState(isEdit);
  const [cardTitle, setCardTitle] = useState(title);
  const [headerColor, setHeaderColor] = useState<EColors>(colorHeader);
  const ref = useRef(null);

  const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

  const finishEdit = () => {
    setEditMode(false);
    localStorageApi.changeTitleCategory(id, cardTitle);
  };
  useOutsideClick(ref, finishEdit);

  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && finishEdit();
  };

  const changeColor = (color: EColors) => {
    setHeaderColor(color);
    localStorageApi.changeColorHeaderCategory(id, color);
    finishEdit();
  };

  return (
    <CardHeaderWrapper
      data-testid="cardHeader"
      ref={ref}
      headerColor={headerColor}
    >
      {editMode ? (
        <>
          <InputEdit
            value={cardTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCardTitle(e.target.value)
            }
            onKeyPress={InputKeyPress}
            className="inputCard"
          />
          <ColorsCircles
            className="colorCircles"
            colors={colors}
            currentColor={headerColor}
            setColor={changeColor}
            hasBorder={true}
          />
        </>
      ) : (
        <Typography variant="h6">{cardTitle}</Typography>
      )}
      <div>
        <button
          className="button"
          data-testid="editButton"
          onClick={() => {
            setEditMode(!editMode);
            localStorageApi.changeTitleCategory(id, cardTitle);
          }}
        >
          <EditIcon className="icon" />
        </button>
        <button
          data-testid="deleteButton"
          className="button"
          onClick={() => closeCard(id)}
        >
          <CloseIcon className="icon" />
        </button>
      </div>
    </CardHeaderWrapper>
  );
};
