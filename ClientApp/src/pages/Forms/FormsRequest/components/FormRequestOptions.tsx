import { Button } from "src/components/atoms/Button/Button";

interface IProps {
  onContinue: () => void;
  onLater: () => void;
  onDecline: () => void;
}

export const FormRequestOptions: React.FC<IProps> = (props): JSX.Element => {

  return (
    <>
      <h3>New questionnaire</h3>

      <div className="mb-3">
        You have been asked to complete a questionnaire.
      </div>

      <div className="mb-3">
        Please click <strong>Continue</strong> to complete it.
      </div>

      <div>
        <Button label="Continue" fullWidth className="mb-3" onClick={props.onContinue} />
        <Button label="I'll complete this later" variant="link" fullWidth onClick={props.onLater} />
        <Button label="I don't want to complete this questionnaire" variant="link" fullWidth onClick={props.onDecline} />
      </div>

    </>
  );
}
