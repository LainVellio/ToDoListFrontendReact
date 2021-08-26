import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

interface IProps {
  value: string;
  inputChange: Function;
  label: string;
  validators: Array<Function>;
  setValidForm: Function;
  className?: string;
}

const InputField = ({
  value,
  inputChange,
  label,
  validators,
  setValidForm,
  className,
}: IProps) => {
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

  const onChange = (e: any) => {
    inputChange(e);
    checkValidation(e);
  };

  return (
    <FormControl className={className}>
      <TextField
        error={Boolean(validationMessage) || undefined}
        label={label}
        value={value}
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
        aria-describedby="my-helper-text"
        helperText={validationMessage}
      />
    </FormControl>
  );
};

export default InputField;