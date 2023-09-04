import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";

interface IProps {
  onEdit: () => void;
}

export const EditFormRequest: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <>
      <h3>All done!</h3>

      <div className="mb-3">
        Thankyou, you've already completed this form.
      </div>

      <div className="mb-3">
        You can use the links below to take a look at your answers or go back to your homepage.
      </div>

      <div>
        <Button label="Take a look at my answers" fullWidth className="mb-3" onClick={props.onEdit} />
        <Button label="Go to my homepage" fullWidth onClick={() => nav(AppRoutes.home)} />
      </div>
    </>
  );
}
