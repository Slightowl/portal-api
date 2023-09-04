import React from "react";
import styled, { css } from "styled-components/macro";
import { faFileMedicalAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "src/components/atoms/Flex";

export type FormItemStatus = 'Pending' | 'Completed' | 'Declined' | 'Expired';

interface IProps extends React.PropsWithChildren {
  status: FormItemStatus;
  onClick?: () => void;
}

const leftBorderFromStatus = (status: FormItemStatus) => {
  switch (status) {
    case 'Pending': return css`border-left: 10px solid ${p => p.theme.formStatus.pending};`;
    case 'Completed': return css`border-left: 10px solid ${p => p.theme.formStatus.completed};`;
    case 'Declined': return css`border-left: 10px solid ${p => p.theme.formStatus.declined};`;
    case 'Expired': return css`border-left: 10px solid ${p => p.theme.formStatus.expired};`;
    default:
      throw new Error(`Unhandled FormItemStats: ${status}`);
  }
}

const Div = styled.div<IProps>`
  display: flex;
  align-items: center;
  padding: 8px;
  height: 60px;

  // cursor
  ${p => p.onClick && css`cursor: pointer;`}

  // border-left
  ${p => leftBorderFromStatus(p.status)}

  &:hover {
    background-color: ${p => p.onClick ? p.theme.palette.greyLight : 'inherit'};
    color: inherit;
  }
`;

export const FormItem: React.FC<IProps> = (props): JSX.Element => {

  return (
    <Div {...props} className="list-group-item" onClick={props.onClick}>
      <FontAwesomeIcon icon={faFileMedicalAlt} fixedWidth className="fs-5" />
      <Flex col grow className="ps-2">
        <small>
          <span><strong>Status:</strong></span>
          <span> {props.status}</span>
        </small>
      </Flex>
      <Flex col grow alignItems="flex-end">
        {props.children}
      </Flex>
    </Div>
  );
}
