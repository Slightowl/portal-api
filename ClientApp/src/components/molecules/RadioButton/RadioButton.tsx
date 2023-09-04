import React from 'react';
import { v4 as guid } from 'uuid';

interface IProps {
  name: string;
  value: string;
  description: string;
  onChange: (value: string, desc: string) => void;
}

export const RadioButton: React.FC<IProps> = (props): JSX.Element => {
  const [id, setId] = React.useState<string>();

  React.useEffect(() => {
    setId(guid());
  }, []);

  return (
    <div className="form-check">
      <input name={props.name} className="form-check-input pointer" type="radio" value={props.value} id={id} onChange={() => props.onChange(props.value, props.description)} />
      <label className="form-check-label pointer" htmlFor={id}>
        {props.description}
      </label>
    </div>
  );
}
