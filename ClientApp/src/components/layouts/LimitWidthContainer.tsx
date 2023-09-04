import React from "react";
import styled from "styled-components/macro";

interface IProps extends React.PropsWithChildren { }

const Div = styled.div`
  max-width: 375px;
  margin: auto;

  @media (min-width: ${p => p.theme.breakpointPixels.md}) {
    max-width: 540px;
  }
`;

export const LimitWidthContainer: React.FC<IProps> = (props): JSX.Element => {

  return (
    <Div className="container">
      {props.children}
    </Div>
  );
}
