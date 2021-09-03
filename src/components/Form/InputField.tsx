import { useState, ChangeEvent } from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

interface InputFieldProps {
  value: string;
  label: string;
  className?: string;
  inputChange(fieldValue: string): void;
  setValidForm(isValid: boolean): void;
  validators: Array<Function>;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  inputChange,
  label,
  validators,
  setValidForm,
  className,
}) => {
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const checkValidation = (value: string) => {
    const error = validators
      .map((validator: Function) => validator(value))
      .find((error) => error);
    error ? setValidationMessage(error) : setValidationMessage(null);
    setValidForm(!Boolean(error));
  };

  const onChange = (value: string) => {
    inputChange(value);
    checkValidation(value);
  };

  return (
    <FormControl className={className}>
      <TextField
        error={Boolean(validationMessage) || undefined}
        label={label}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        aria-describedby="my-helper-text"
        helperText={validationMessage}
      />
    </FormControl>
  );
};
