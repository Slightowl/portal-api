import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { FieldSet } from "src/components/atoms/FieldSet";
import { ProgressBar } from "src/components/atoms/ProgressBar/ProgressBar";
import { DateOfBirth } from "src/components/molecules/DateOfBirth/DateOfBirth";
import { Form } from "src/components/molecules/Form";
import { FormInput } from "src/components/molecules/FormInput";
import { Logger } from "src/utils/logger";

interface IProps {
  disable?: boolean;
  onLogin: (lastName: string, postcode: string, dob: number) => void;
}

export const LoginForm: React.FC<IProps> = (props): JSX.Element => {
  const [lastName, setLastName] = React.useState<string | undefined>();
  const [postcode, setPostcode] = React.useState<string | undefined>();
  const [dob, setDob] = React.useState<number | undefined>();

  const nav = useNavigate();

  const handleSubmit = () => {
    Logger.log('login:', lastName, postcode, dob);

    if (lastName && postcode && dob) {
      props.onLogin(lastName, postcode, dob);
    }
    else {
      Logger.warn('Trying to login but there are,missing details');
    }
  };

  return (
    <Form id="login-form" onSubmit={handleSubmit}>

      <FieldSet disabled={props.disable}>

        <FormInput label="Last name" required onChange={val => setLastName(val)} />
        <FormInput label="Postcode" required onChange={val => setPostcode(val)} />

        <DateOfBirth onChange={(val) => setDob(val)} />

        <Button className="mt-4" label="Sign in" type="submit" fullWidth />
        <Button className="mt-2" label="I can't sign in" variant="link" fullWidth onClick={() => nav(AppRoutes.loginProblems)} />

      </FieldSet>

      {
        props.disable &&
        <ProgressBar className="mt-3" />
      }

    </Form>
  );
}
