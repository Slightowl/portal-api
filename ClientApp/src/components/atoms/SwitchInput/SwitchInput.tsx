import React from 'react';
import styled, { css } from 'styled-components/macro';
import { v4 as guid } from 'uuid';
import { Flex } from "../Flex";
import { Input } from "../Input";

interface IProps {
  label: string;
  size?: 'sm' | 'lg';
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

const InputStyled = styled(Input)<IProps>`
  ${p => p.size === 'lg' && css`
    width: 60px !important;
    height: 34px !important;
    margin-top: 0 !important;
    margin-right: 8px !important;
  `}

  ${p => p.size === 'sm' && css`
    margin-top: 0 !important;
    margin-right: 4px !important;
  `}
`;

export const SwitchInput: React.FC<IProps> = (props): JSX.Element => {
  const [id, setId] = React.useState<string>();

  React.useEffect(() => {
    setId(guid());
  }, []);

  return (
    <Flex alignItems="center" className="form-check form-switch mb-2 pointer">
      <InputStyled
        id={id}
        className="form-check-input form-switch-input-lg pointer"
        type="checkbox"
        role="switch"
        checked={props.checked}
        onCheckedChange={props.onCheckedChange}
        {...props}
      />
      <label htmlFor={id} className="form-check-label pointer">{props.label}</label>
    </Flex>
  );
}

SwitchInput.defaultProps = {
  size: 'sm',
}