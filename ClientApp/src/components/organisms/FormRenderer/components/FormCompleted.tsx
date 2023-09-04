import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { Div } from "src/components/atoms/Div";
import { Flex } from "src/components/atoms/Flex";

interface IProps { }

export const FormCompleted: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <>
      <h3 className="mb-3">Thank you.</h3>

      <Div className="mb-3">
        Your form has been submitted successfully.
      </Div>

      <Div className="mb-3">
        You can use the links below to view forms you have completed previously, or go back to your home page.
      </Div>

      <Flex>
        <Button label="Home page" fullWidth className="me-4" onClick={() => nav(AppRoutes.home)} />
        <Button label="My Forms" fullWidth onClick={() => nav(AppRoutes.forms)} />
      </Flex>
    </>
  );
}
