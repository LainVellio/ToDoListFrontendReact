import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EColors } from '../../interfaces';
import { useCategory } from '../../Context';
import { InputEdit } from '../Form/InputEdit';
import { ColorsCircles } from '../ColorCircle/ColorCircles';
import { useOutsideClick } from '../../utils/useOutsideClick';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

const CardHeaderWrapper = styled.div<{ colorHeader: EColors }>`
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
  deleteCard(id: number): void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ id, deleteCard }) => {
  const [category, setCategory] = useCategory(id);
  const [title, setTitle] = useState(category.title);
  const [editMode, setEditMode] = useState(title === '' ? true : false);
  const [colorHeader, setColorHeader] = useState(category.colorHeader);
  const ref = useRef(null);
  const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

  useEffect(() => {
    if (!editMode) {
      title === ''
        ? deleteCard(id)
        : setCategory({ ...category, title, colorHeader });
    }
  }, [editMode]);

  useOutsideClick(ref, () => setEditMode(false), editMode);
  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && setEditMode(false);
  };
  const changeColor = (color: EColors) => {
    setColorHeader(color);
    setEditMode(false);
  };
  const onClickEditButton = () => {
    setEditMode(!editMode);
  };

  return (
    <CardHeaderWrapper
      data-testid="cardHeader"
      ref={ref}
      colorHeader={category.colorHeader}
    >
      {editMode ? (
        <>
          <InputEdit
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            onKeyPress={InputKeyPress}
            className="inputCard"
          />
          <ColorsCircles
            className="colorCircles"
            colors={colors}
            currentColor={category.colorHeader}
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
          onClick={onClickEditButton}
        >
          <EditIcon className="icon" />
        </button>
        <button
          data-testid="deleteButton"
          className="button"
          onClick={() => deleteCard(id)}
        >
          <CloseIcon className="icon" />
        </button>
      </div>
    </CardHeaderWrapper>
  );
};
