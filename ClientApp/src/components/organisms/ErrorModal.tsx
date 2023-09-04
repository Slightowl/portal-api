import React from "react";
import styled, { useTheme } from "styled-components/macro"
import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal } from "../molecules/Modal";

interface IProps {
  show: boolean;
  onRetry?: () => void;
}

const Icon = styled(FontAwesomeIcon)`
  font-size: 64px;
  color: ${p => p.theme.palette.white};
`;

export const ErrorModal: React.FC<IProps> = (props): JSX.Element => {
  const theme = useTheme();

  return (
    <Modal
      id="error_modal"
      show={props.show}
      headerColor={theme.palette.error.main}
      header={
        <Icon icon={faExclamation} fixedWidth />
      }
      body={
        <>
          Sorry, something went wrong. <br />Please try again.
        </>
      }
      okButtonText="Retry"
      okButtonColor="error"
      onClose={props.onRetry}
    />
  );
}
