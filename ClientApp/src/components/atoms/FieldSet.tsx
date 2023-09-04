import React from "react";
import styled from "styled-components/macro";

interface IProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> { }

const FieldSetStyled = styled.fieldset<IProps>`
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const FieldSet: React.FC<IProps> = (props): JSX.Element => {

  return (
    <FieldSetStyled {...props}>
      {props.children}
    </FieldSetStyled>
  );
}
