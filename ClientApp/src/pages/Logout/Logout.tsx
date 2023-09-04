import React from "react";
import styled from "styled-components/macro";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { Flex } from "src/components/atoms/Flex";
import { LimitWidthContainer } from "src/components/layouts/LimitWidthContainer";
import { AppName } from "src/components/molecules/AppName/AppName";
import { Logo } from "src/components/molecules/Logo/Logo";
import { useLogout } from "src/components/utils/AuthCheck";
import { Span } from "src/components/atoms/Span";

interface IProps { }

const Icon = styled(FontAwesomeIcon)`
  font-size: 64px;
  color: ${p => p.theme.palette.primary.main};
`;

const H1 = styled.h1`
  color: ${p => p.theme.palette.primary.main};
`;

export const Logout: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();
  const logout = useLogout();

  React.useEffect(() => logout(), [logout]);

  return (
    <>
      <div className="px-3">
        <Logo />
      </div>

      <LimitWidthContainer>
        <Flex col alignItems="center" className="mt-5">

          <Icon icon={faDoorOpen} fixedWidth className="mb-3" />

          <H1 className="mb-3">
            Signed Out
          </H1>

          <div className="text-center mb-5">
            <Span size="lg">Thanks for using
              <span> </span>
              <AppName size="lg" />
            </Span>
          </div>

          <Button label="Sign in again" onClick={() => nav(AppRoutes.login)} />

        </Flex>
      </LimitWidthContainer>
    </>
  );
}
