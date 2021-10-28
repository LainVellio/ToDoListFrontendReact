import React from 'react';
import styled from 'styled-components';

interface InputEditProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
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
}) => (
  <Input
    autoFocus
    type="text"
    value={value}
    className={className}
    onChange={onChange}
    onBlur={onBlur}
  />
);
