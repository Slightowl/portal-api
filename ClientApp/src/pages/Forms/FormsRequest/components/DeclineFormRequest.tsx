import React from "react";
import { Button } from "src/components/atoms/Button/Button";
import { FieldSet } from "src/components/atoms/FieldSet";
import { Input } from "src/components/atoms/Input";
import { ProgressBar } from "src/components/atoms/ProgressBar/ProgressBar";
import { RadioButton } from "src/components/molecules/RadioButton/RadioButton";

interface IProps {
  disable: boolean;
  onLater: () => void;
  onCancel: () => void;
  onDecline: (reason: string) => void;
}

type Option = {
  value: string,
  description: string;
}

export const DeclineFormRequest: React.FC<IProps> = (props): JSX.Element => {
  const [reason, setReason] = React.useState<string>('other');
  const [selectedOption, setSelectedOption] = React.useState<Option>();

  const handleOption = (value: string, description: string) => {
    setSelectedOption({ value, description });
  }

  const handleDecline = () => {
    !selectedOption || selectedOption.value === 'other'
      ? props.onDecline(reason)
      : props.onDecline(selectedOption.description);
  }

  return (
    <>
      <h3>
        New questionnaire
      </h3>

      <div className="mb-2">
        Click here if you want to complete this questionnaire later...
      </div>

      <div>
        <Button label="I'll complete this later" variant="link" fullWidth disabled={props.disable} onClick={props.onLater} />
      </div>

      <div className="mt-4 mb-2">
        Otherwise, we'd be grateful if you'd tell us why you'd rather not complete this questionnaire...
      </div>

      <FieldSet disabled={props.disable}>

        <div className="mb-2">
          <RadioButton name="declineOption" value="not-relevant" description="This is not relevant to me" onChange={handleOption} />
          <RadioButton name="declineOption" value="not-known" description="I don't know why I received this" onChange={handleOption} />
          <RadioButton name="declineOption" value="other" description="Other:" onChange={handleOption} />
        </div>

        <div className="mb-3">
          <Input disabled={selectedOption?.value !== 'other' || props.disable} onChange={val => setReason(val)} />
        </div>

        <div>
          <Button label="Submit" fullWidth disabled={!selectedOption || (selectedOption?.value === 'other' && !reason) || props.disable} onClick={handleDecline} />
          <Button label="Cancel" variant="link" fullWidth onClick={props.onCancel} />
        </div>

      </FieldSet >

      {
        props.disable && <ProgressBar className="mt-3" />
      }
    </>
  );
}
