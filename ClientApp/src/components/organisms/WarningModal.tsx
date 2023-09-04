import React from "react";
import styled, { useTheme } from "styled-components/macro"
import { faExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, ModalResult } from "../molecules/Modal";

interface IProps extends React.PropsWithChildren {
  show: boolean;
  onContinue?: () => void;
  onCancel?: () => void;
}

const Icon = styled(FontAwesomeIcon)`
  font-size: 64px;
  color: ${p => p.theme.palette.white};
`;

export const WarningModal: React.FC<IProps> = (props): JSX.Element => {
  const theme = useTheme();

  const handleClose = (result: ModalResult) => {
    if (result === 'ok') {
      props.onContinue && props.onContinue();
    }
    else {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <Modal
      id="warning_modal"
      show={props.show}
      headerColor={theme.palette.warning.main}
      header={
        <Icon icon={faExclamation} fixedWidth />
      }
      body={
        <>
          {props.children}
        </>
      }
      okButtonText="Continue"
      okButtonColor="warning"
      cancelButtonText="Cancel"
      cancelButtonColor="warning"
      onClose={handleClose}
    />
  );
}
