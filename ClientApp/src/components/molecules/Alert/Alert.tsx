import React from "react";
import clsx from "clsx";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "../../atoms/Flex";

interface IProps extends React.PropsWithChildren {
  text?: string;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  icon?: IconDefinition;
  dismissible?: boolean;
}

export const Alert: React.FC<IProps> = (props): JSX.Element => {

  const cls = clsx(
    'alert',
    `alert-${props.variant}`,
    props.dismissible && 'show fade',
    props.className,
  );

  return (
    <Flex alignItems="center" className={cls} role="alert">
      <div>
        {props.text ? props.text : props.children}
      </div>
      {
        props.icon && !props.dismissible &&
        <>
          <div className="flex-grow-1"></div>
          <FontAwesomeIcon fixedWidth icon={props.icon} className="me-2" />
        </>
      }
      {
        props.dismissible &&
        <button type="button" className="btn-close ms-3" data-bs-dismiss="alert" aria-label="Close" />
      }
    </Flex>
  );
}

Alert.defaultProps = {
  variant: 'success',
  dismissible: false,
}