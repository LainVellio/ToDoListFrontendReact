import React from 'react';
import styled from 'styled-components';
import useCatchKeydown from '../../utils/useCatchKeydown';

interface InputEditProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  setEditMode: () => void;
}

const Input = styled.input`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border: none;
`;

export const InputEdit: React.FC<InputEditProps> = ({
  value,
  className,
  onChange,
  onBlur,
  setEditMode,
}) => {
  useCatchKeydown(['Enter', 'Escape'], setEditMode);
  return (
    <Input
      autoFocus
      type="text"
      value={value}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
