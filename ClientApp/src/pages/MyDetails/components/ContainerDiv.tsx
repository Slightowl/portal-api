import React from "react";
import styled from "styled-components/macro";

interface IProps extends React.PropsWithChildren { }

const Container = styled.div`
  margin: 24px auto;
  padding: 16px;
  background-color: ${p => p.theme.palette.greyLight};
  border-radius: 16px;
  min-height: 635px;
  max-width: 375px;

  @media (min-width: ${p => p.theme.breakpointPixels.md}) {
    max-width: 540px;
  }

  // bootstrap card override
  .card {
    &.card-trans {
      border: none;
      background-color: transparent;
    }
  }
`;

export const ContainerDiv: React.FC<IProps> = (props): JSX.Element => {

  return (
    <Container className="container">
      {props.children}
    </Container>
  );
}
