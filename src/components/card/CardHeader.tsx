import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

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
  }
  .inputCard {
    font-size: 1.25rem;
  }
`;

interface CardHeaderProps {
  isEdit: boolean;
  title: string;
  id: number;
  closeCategory(id: number): void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  isEdit,
  title,
  closeCategory,
  id,
}) => {
  const [editMode, setEditMode] = useState(isEdit);
  const [cardTitle, setCardTitle] = useState(title);
  const [headerColor, setHeaderColor] = useState<EColors>(EColors.blue);

  const colors: Array<EColors> = [EColors.red, EColors.blue, EColors.green];

  return (
    <CardHeaderWraper headerColor={headerColor}>
      {editMode ? (
        <InputEdit
          value={cardTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCardTitle(e.target.value)
          }
          className="inputCard"
          onBlur={() => setEditMode(false)}
        />
      ) : (
        <Typography variant="h6">{cardTitle}</Typography>
      )}
      {editMode && (
        <ColorsCircles
          colors={colors}
          currentColor={headerColor}
          setEditMode={setEditMode}
          setColor={setHeaderColor}
          hasBorder={true}
        />
      )}
      <div>
        {!editMode ? (
          <EditIcon onClick={() => setEditMode(!editMode)} className="icon" />
        ) : (
          <span>
            <EditIcon className="icon" />
          </span>
        )}
        <CloseIcon onClick={() => closeCategory(id)} className="icon" />
      </div>
    </CardHeaderWraper>
  );
};
