import React from "react";
import styled from "styled-components/macro";
import * as bootstrap from "bootstrap";
import { ButtonColor } from "../atoms/Button/styles/_types";
import { Button } from "../atoms/Button/Button";
import { Color } from "src/utils/types";

export type ModalResult = 'ok' | 'cancel';

interface IProps {
  id: string;
  show: boolean;
  header: JSX.Element;
  headerColor?: Color;
  body: JSX.Element;
  okButtonText?: string
  okButtonColor?: ButtonColor;
  cancelButtonText?: string;
  cancelButtonColor?: ButtonColor;
  onClose?: (result: ModalResult) => void;
}

const Div = styled.div<IProps>`
  .modal-content {
    border: none;
  }

  .modal-header {
    border: none;
    justify-content: center;
    background-color: ${p => p.headerColor};
  }

  .modal-body {
    text-align: center;
  }

  .modal-footer {
    border: none;
    justify-content: center;
  }
`;

export const Modal: React.FC<IProps> = (props): JSX.Element => {
  const [modal, setModal] = React.useState<bootstrap.Modal>();

  React.useEffect(() => {
    if (!modal) {
      const modalEl = document.getElementById(props.id);
      setModal(new bootstrap.Modal(modalEl as Element, {}));
    }

    if (props.show) {
      modal?.show();
    }
  }, [modal, props]);

  const ok = () => {
    modal?.hide();
    props.onClose && props.onClose('ok');
  };

  const cancel = () => {
    modal?.hide();
    props.onClose && props.onClose('cancel');
  };

  return (
    <Div {...props} className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={props.id} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {props.header}
          </div>
          <div className="modal-body">
            {props.body}
          </div>
          {
            (props.okButtonText || props.cancelButtonText) &&
            <div className="modal-footer">
              <Button label={props.okButtonText} color={props.okButtonColor} onClick={ok} />
              <Button label={props.cancelButtonText} color={props.cancelButtonColor} variant="link" onClick={cancel} />
            </div>
          }
        </div>
      </div >
    </Div>
  );
}

Modal.defaultProps = {
  headerColor: '#629fea',
  okButtonColor: 'primary',
  cancelButtonColor: 'primary',
}
