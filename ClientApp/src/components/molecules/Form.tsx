import React from "react";
import { clsx } from 'clsx';

interface IProps extends React.PropsWithChildren {
  id?: string;
  className?: string;
  onSubmit?: () => void;
}

export const Form: React.FC<IProps> = (props): JSX.Element => {
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    props.onSubmit && props.onSubmit();
  };

  const classes = clsx(props.className, 'needs-validation', validated && 'was-validated');

  return (
    <form id={props.id} className={classes} noValidate onSubmit={handleSubmit}>
      {props.children}
    </form>
  )
}
