import { Button } from "src/components/atoms/Button/Button";

interface IProps {
  onBack: () => void;
}

export const LoginError: React.FC<IProps> = (props): JSX.Element => {

  return (
    <>
      <h3 className="mb-3">
        Sorry, something went wrong.
      </h3>

      <div className="mb-3">
        Unfortunately we couldn't log you in this time. Please try again later.
      </div>

      <div className="mb-5">
        If the problem persists, please contact The Christie.
      </div>

      <div>
        <Button label="Back to login page" fullWidth onClick={props.onBack} />
      </div>
    </>
  );
}
