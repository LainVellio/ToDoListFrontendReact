import React, { ChangeEvent, useRef, useState } from 'react';

import { EColors } from '../../../interfaces';
import { useCategory } from '../../../Context';
import { InputEdit } from '../../Form/InputEdit';
import { ColorsCircles } from '../../ColorCircle/ColorCircles';
import { useOutsideClick } from '../../../utils/useOutsideClick';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import useEmptyDelete from '../../../utils/useEmptyDelete';
import CardHeaderWrapper from './CardHeader.style';
import checkMaxLengthString from '../../../utils/checkMaxLengthString';

export interface CardHeaderProps {
  categoryId: number;
}
const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

export const CardHeader: React.FC<CardHeaderProps> = ({ categoryId }) => {
  const { category, setCategoryProperties, deleteCategory } =
    useCategory(categoryId);
  const [title, setTitle] = useState(category.title);
  const [editMode, setEditMode] = useState(title === '' ? true : false);
  const colorHeader = category.colorHeader;
  const ref = useRef(null);
  const id = category.id;
  const [hasError, setError] = useState(false);
  console.log(hasError);

  useEmptyDelete(
    editMode,
    title,
    () => deleteCategory(id),
    () => setCategoryProperties({ title }),
  );

  useOutsideClick(ref, () => setEditMode(false), editMode);
  const changeColor = (colorHeader: EColors) => {
    setCategoryProperties({ colorHeader });
    setEditMode(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (checkMaxLengthString(title, 55)) {
      setTitle(title);
      setError(false);
    } else {
      setError(true);
    }
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
            onChange={onChange}
            setEditMode={() => setEditMode(false)}
            className={`inputCard ${hasError ? 'error' : ''}`}
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
        <Typography className="header" variant="h6">
          {title}
        </Typography>
      )}
      <div className="editButtons">
        <button
          className="button"
          data-testid="editButton"
          onClick={() => {
            setEditMode(!editMode);
            setError(false);
          }}
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
