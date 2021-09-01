import styled from 'styled-components';

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  className?: string;
}

const Input = styled.input`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  border: none;
`;

const InputEdit = ({ value, onChange, className, onBlur }: IProps) => (
  <Input
    className={className}
    autoFocus
    type="text"
    value={value}
    onBlur={onBlur}
    onChange={onChange}
  />
);

export default InputEdit;
