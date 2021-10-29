import React, { ChangeEvent, useRef, useState } from 'react';

import { EColors } from '../../../interfaces';
import { useCategories, useCategory } from '../../../Context';
import { InputEdit } from '../../Form/InputEdit';
import { ColorsCircles } from '../../ColorCircle/ColorCircles';
import { useOutsideClick } from '../../../utils/useOutsideClick';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import useCatchKeydown from '../../../utils/useCatchKeydown';
import useEmptyDelete from '../../../utils/useEmptyDelete';
import CardHeaderWrapper from './CardHeader.style';

export interface CardHeaderProps {
  categoryId: number;
}
const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

export const CardHeader: React.FC<CardHeaderProps> = ({ categoryId }) => {
  const { category, setCategoryProperties } = useCategory(categoryId);
  const { deleteCategory } = useCategories();
  const [title, setTitle] = useState(category.title);
  const [editMode, setEditMode] = useState(title === '' ? true : false);
  const colorHeader = category.colorHeader;
  const ref = useRef(null);
  const id = category.id;

  useEmptyDelete(
    editMode,
    title,
    () => deleteCategory(id),
    () => setCategoryProperties({ title }),
  );
  useCatchKeydown(['Enter', 'Escape'], () => {
    setEditMode(false);
  });
  useOutsideClick(ref, () => setEditMode(false), editMode);
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
          onClick={() => setEditMode(!editMode)}
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
