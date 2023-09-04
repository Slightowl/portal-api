import React from "react";
import styled from "styled-components/macro";
import { Outlet } from "react-router-dom";
import { NavBar } from "../organisms/NavBar/NavBar";

interface IProps { }

const MainDiv = styled.div`
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 auto 0;
`;

const ContentDiv = styled.div`
  width: 100%;
  flex-grow: 1;
  margin-bottom: ${p => p.theme.footerHeight};
`;

export const MainLayout: React.FC<IProps> = (props): JSX.Element => {

  return (
    <MainDiv>
      <NavBar />
      <ContentDiv>
        <Outlet />
      </ContentDiv>
    </MainDiv>
  );
}
