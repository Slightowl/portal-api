import React from "react";
import styled from "styled-components/macro";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalResult } from "../molecules/Modal";

interface IProps {
  show: boolean;
  question?: string;
  okButtonText?: string
  cancelButtonText?: string;
  onOK: () => void;
  onCancel?: () => void;
}

const Icon = styled(FontAwesomeIcon)`
  font-size: 64px;
  color: ${p => p.theme.palette.white};
`;

export const ConfirmationModal: React.FC<IProps> = (props): JSX.Element => {

  const handleClose = (result: ModalResult) => {
    if (result === 'ok') {
      props.onOK();
    }
    else {
      props.onCancel && props.onCancel();
    }
  };

  return (
    <Modal
      id="confirm_modal"
      show={props.show}
      header={
        <Icon icon={faSignOutAlt} fixedWidth />
      }
      body={
        <>
          {props.question}
        </>
      }
      okButtonText={props.okButtonText}
      cancelButtonText={props.cancelButtonText}
      onClose={handleClose}
    />
  );
}

ConfirmationModal.defaultProps = {
  question: 'Are you sure?',
  okButtonText: 'Yes',
  cancelButtonText: 'Cancel',
}
