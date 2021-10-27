import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EColors } from '../../interfaces';
import { useCategories, useCategory } from '../../Context';
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
  categoryId: number;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ categoryId }) => {
  const { category, setCategoryProperties } = useCategory(categoryId);
  const { deleteCategory } = useCategories();
  const [title, setTitle] = useState(category.title);
  const [editMode, setEditMode] = useState(title === '' ? true : false);
  const colorHeader = category.colorHeader;
  const id = category.id;
  const ref = useRef(null);
  const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

  useEffect(() => {
    if (!editMode) {
      if (title === '') {
        deleteCategory(id);
      } else {
        setCategoryProperties({ title });
      }
    }
  }, [editMode]);

  useOutsideClick(ref, () => setEditMode(false), editMode);
  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && setEditMode(false);
  };
  const onClickEditButton = () => {
    setEditMode(!editMode);
  };

  const changeColor = (colorHeader: EColors) => {
    setCategoryProperties({ colorHeader });
    setEditMode(false);
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
          onClick={onClickEditButton}
        >
          <EditIcon className="icon" />
        </button>
        <button
          data-testid="deleteButton"
          className="button"
          onClick={() => deleteCategory(id)}
        >
          <CloseIcon className="icon" />
        </button>
      </div>
    </CardHeaderWrapper>
  );
};
