import React from "react";
import { Button } from "src/components/atoms/Button/Button";
import { OptionButton } from "src/components/molecules/OptionButton/OptionButton";

interface IProps {
  numbers: string[];
  disable?: boolean;
  onSelectNumber: (number: string) => void;
}

export const NumberSelect: React.FC<IProps> = (props): JSX.Element => {
  const [selected, setSelected] = React.useState<string>();

  return (
    <>
      <div className="mb-4">
        To complete the login process we need to send a verification code to your mobile phone.
      </div>

      <h6 className="mb-2">Please select your phone number:</h6>

      <div className="mb-3">
        {
          props.numbers.map((x, i) => (

            <OptionButton
              key={i}
              label={x}
              name="phone-number-group"
              disabled={props.disable}
              onChange={val => setSelected(val)}
            />

          ))
        }
      </div>

      <Button
        label="Send verification code"
        fullWidth
        disabled={!selected || props.disable}
        onClick={() => selected && props.onSelectNumber(selected)}
      />
    </>
  );
}
