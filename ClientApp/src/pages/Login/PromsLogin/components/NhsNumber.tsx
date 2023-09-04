import React from "react";
import { Button } from "src/components/atoms/Button/Button";
import { Input } from "src/components/atoms/Input";

interface IProps {
  disable?: boolean;
  onSubmit: (nhsNumber: string) => void;
}

export const NhsNumber: React.FC<IProps> = (props): JSX.Element => {
  const [nhs, setNhs] = React.useState<string>();

  return (
    <>
      <div className="mb-2">
        To complete the login process please enter your NHS number.
      </div>

      <div className="mb-4">
        You can find this on letters you've received from The Christie.
      </div>

      <h5 className="mb-2">Please enter your NHS number:</h5>

      <div className="mb-3">
        <Input type="text" onChange={val => setNhs(val)} disabled={props.disable} />
      </div>

      <Button label="Submit" fullWidth disabled={!nhs || props.disable} onClick={() => nhs && props.onSubmit(nhs)} />
    </>
  );
}
