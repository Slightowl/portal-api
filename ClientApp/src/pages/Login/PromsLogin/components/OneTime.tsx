import React from "react";
import { Button } from "src/components/atoms/Button/Button";
import { Flex } from "src/components/atoms/Flex";
import { Input } from "src/components/atoms/Input";

interface IProps {
  viaSms: boolean;
  disable?: boolean;
  onSubmit: (code: string) => void;
  onTryAgain: () => void;
}

export const OneTime: React.FC<IProps> = (props): JSX.Element => {
  const [code, setCode] = React.useState<string>();

  const instruction = props.viaSms
    ? 'to your mobile device'
    : 'to your registered email address';

  return (
    <>
      <div className="mb-4">
        To complete the login process please enter the 6-digit verification code sent {instruction}.
      </div>

      <h5 className="mb-2">Please enter the 6-digit code:</h5>

      <div className="mb-3">
        <Input type="text" maxLength={6} disabled={props.disable} onChange={val => setCode(val)} />
      </div>

      <div className="mb-5">
        <Button
          label="Submit"
          fullWidth
          disabled={!(code && code.length === 6) || props.disable}
          onClick={() => code && code.length === 6 && props.onSubmit(code)}
        />
      </div>

      <Flex col alignItems="center">
        <h6>Didn't receive a code?</h6>
        <div>
          Click the link below to try signing in again
        </div>
        <Button label="Sign in again" fullWidth variant="link" onClick={props.onTryAgain} />
      </Flex>
    </>
  );
}
