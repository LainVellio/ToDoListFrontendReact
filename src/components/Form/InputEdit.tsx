import styled from 'styled-components';

interface InputEditProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  className?: string;
}

const Input = styled.input`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border: none;
`;

export const InputEdit: React.FC<InputEditProps> = ({
  value,
  onChange,
  className,
  onBlur,
}) => (
  <Input
    className={className}
    autoFocus
    type="text"
    value={value}
    onBlur={onBlur}
    onChange={onChange}
  />
);
