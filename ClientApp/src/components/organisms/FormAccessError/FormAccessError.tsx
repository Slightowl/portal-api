import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { Flex } from "src/components/atoms/Flex";

interface IProps { }

export const FormAccessError: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <>
      <h3>Sorry, something went wrong.</h3>

      <div className="mb-3">
        There was a problem accessing the form. Please try again later, or use the links below to view forms you have
        completed previously.
      </div>

      <Flex className="d-flex">
        <Button label="Home page" fullWidth className="me-3" onClick={() => nav(AppRoutes.home)} />
        <Button label="My Forms" fullWidth onClick={() => nav(AppRoutes.forms)} />
      </Flex>
    </>
  );
}
