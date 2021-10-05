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

const CardHeaderWrapper = styled.div<{ colorHeader: string }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.colorHeader};
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
  id: number;
  title: string;
  colorHeader: EColors;
  closeCard(id: number): void;
  editCard(key: string, value: unknown): void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  id,
  title,
  colorHeader,
  closeCard,
  editCard,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [textTitle, setTextTitle] = useState(title);
  const ref = useRef(null);

  const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

  const finishEdit = () => {
    localStorageApi.patchCategory<string>(id, 'title', textTitle);
    editCard('title', textTitle);
    setEditMode(false);
    console.log(textTitle);
  };

  useOutsideClick(ref, finishEdit, editMode);

  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && finishEdit();
  };

  const changeColor = (color: EColors) => {
    editCard('colorHeader', color);
    localStorageApi.patchCategory<EColors>(id, 'colorHeader', color);
    finishEdit();
  };

  return (
    <CardHeaderWrapper
      data-testid="cardHeader"
      ref={ref}
      colorHeader={colorHeader}
    >
      {editMode ? (
        <>
          <InputEdit
            value={textTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTextTitle(e.target.value)
            }
            onKeyPress={InputKeyPress}
            className="inputCard"
          />
          <ColorsCircles
            className="colorCircles"
            colors={colors}
            currentColor={colorHeader}
            setColor={changeColor}
            hasBorder={true}
          />
        </>
      ) : (
        <Typography variant="h6">{title}</Typography>
      )}
      <div>
        <button
          className="button"
          data-testid="editButton"
          onClick={() => {
            setEditMode(!editMode);
            localStorageApi.patchCategory<string>(id, 'title', title);
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
