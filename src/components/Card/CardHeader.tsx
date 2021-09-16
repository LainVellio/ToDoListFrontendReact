import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../../api/localStorageAPI';
import { EColors } from '../../interfaces';
import { InputEdit } from '../Form/InputEdit';
import { ColorsCircles } from '../ColorCircle/ColorCircles';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

const CardHeaderWraper = styled.div<{ headerColor: string }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.headerColor};
  color: white;
  margin: -15px -16px 0px -16px;
  padding: 5px 10px;
  .icon {
    margin: 6px 3px 3px 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
    color: white;
  }
  .inputCard {
    font-size: 1.25rem;
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
  isEdit,
  title,
  closeCard,
  colorHeader,
  id,
}) => {
  const [editMode, setEditMode] = useState(isEdit);
  const [cardTitle, setCardTitle] = useState(title);
  const [headerColor, setHeaderColor] = useState<EColors>(colorHeader);

  const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

  const onBlur = () => {
    setEditMode(false);
    localStorageApi.changeTitleCategory(id, cardTitle);
  };

  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onBlur();
  };

  const changeColor = (color: EColors) => {
    setHeaderColor(color);
    localStorageApi.changeColorHeaderCategory(id, color);
    onBlur();
  };

  return (
    <CardHeaderWraper headerColor={headerColor}>
      {editMode ? (
        <InputEdit
          value={cardTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCardTitle(e.target.value)
          }
          onKeyPress={InputKeyPress}
          className="inputCard"
          onBlur={onBlur}
        />
      ) : (
        <Typography variant="h6">{cardTitle}</Typography>
      )}
      {editMode && (
        <ColorsCircles
          className="colorCircles"
          colors={colors}
          currentColor={headerColor}
          setColor={changeColor}
          hasBorder={true}
        />
      )}
      <div>
        {!editMode ? (
          <button
            className="button"
            onClick={() => {
              setEditMode(!editMode);
              localStorageApi.changeTitleCategory(id, cardTitle);
            }}
          >
            <EditIcon className="icon" />
          </button>
        ) : (
          <span>
            <EditIcon className="icon" />
          </span>
        )}
        <button className="button" onClick={() => closeCard(id)}>
          <CloseIcon className="icon" />
        </button>
      </div>
    </CardHeaderWraper>
  );
};
