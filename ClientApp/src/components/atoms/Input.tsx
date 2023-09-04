import clsx from "clsx";
import React from "react";

interface IProps {
  checked?: boolean;
  className?: string;
  clearOnSubmit?: boolean;
  disabled?: boolean;
  id?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
  role?: React.AriaRole;
  small?: boolean;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
  onCheckedChange?: (value: boolean) => void;
  onSubmit?: (value: string) => void;
}

export const Input: React.FC<IProps> = (props): JSX.Element => {
  const [value, setValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange && props.onChange(newValue)
    props.onCheckedChange && props.onCheckedChange(event.target.checked);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setValue('');
      props.onChange && props.onChange('');
      return;
    }

    if (event.key === 'Enter') {
      if (props.clearOnSubmit) {
        setValue('');
        props.onChange && props.onChange('');
      }
      props.onSubmit && props.onSubmit(value);
      return;
    }
  }

  const classes = clsx('form-control', props.small && 'form-control-sm', props.className);

  return (
    <input
      checked={props.checked}
      className={classes}
      disabled={props.disabled}
      id={props.id}
      inputMode={props.inputMode}
      max={props.max}
      maxLength={props.maxLength}
      min={props.min}
      minLength={props.minLength}
      name={props.name}
      placeholder={props.placeholder}
      required={props.required}
      role={props.role}
      type={props.type}
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  )
}

Input.defaultProps = {
  type: 'text',
  clearOnSubmit: false,
}