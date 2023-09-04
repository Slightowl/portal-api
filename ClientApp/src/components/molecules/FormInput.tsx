import React from 'react';
import clsx from 'clsx';
import { v4 as guid } from 'uuid';
import { Input } from 'src/components/atoms/Input'
import { Label } from 'src/components/atoms/Label/Label'


interface IProps {
  label?: string;
  inputType?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  invalidFeedback?: string;
  size?: 'default' | 'sm' | 'lg';

  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export const FormInput: React.FC<IProps> = (props): JSX.Element => {
  const [id, setId] = React.useState<string>();

  React.useEffect(() => {
    setId(guid());
  }, []);

  const handleInputChange = (value: string) => {
    props.onChange && props.onChange(value)
  }

  const handleInputSubmit = (value: string) => {
    props.onSubmit && props.onSubmit(value)
  }

  const inputClasses = clsx(
    'form-control',
    props.size === 'sm' && 'form-control-sm',
    props.size === 'lg' && 'form-control-lg',
  );

  return (
    <div className="mb-3">
      {
        props.label &&
        <Label htmlFor={id}>{props.label}</Label>
      }
      <Input
        id={id}
        type={props.inputType}
        className={inputClasses}
        placeholder={props.placeholder}
        required={props.required}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
      />
      {
        props.required &&
        <div className="invalid-feedback">{props.invalidFeedback}</div>
      }
    </div>
  )
}

FormInput.defaultProps = {
  inputType: 'text',
  required: false,
  invalidFeedback: 'Please provide a value',
  size: 'default',
}
