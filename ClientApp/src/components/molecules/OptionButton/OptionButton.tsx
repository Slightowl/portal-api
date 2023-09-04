import React from "react";
import styled from "styled-components/macro";
import { v4 as guid } from 'uuid';

interface IProps {
  label: string;
  name?: string;
  disabled?: boolean;
  onChange?: (val: string) => void;
}

const Div = styled.div`
  font-size: 18px;
  padding: 0.25rem 0;
`;

export const OptionButton: React.FC<IProps> = (props): JSX.Element => {
  const [id, setId] = React.useState<string>();

  React.useEffect(() => {
    setId(guid());
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(props.label);
  }

  return (
    <Div>
      <input
        type="radio"
        className="btn-check"
        name={props.name}
        id={id}
        disabled={props.disabled}
        onChange={handleInputChange}
      />
      <label className="btn btn-outline-dark w-100" htmlFor={id}>{props.label}</label>
    </Div>
  );
}
