import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { Flex } from "src/components/atoms/Flex";

interface IProps { }

export const FormRequestExpired: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <>
      <h3>Link Expired.</h3>

      <div className="mb-3">
        Sorry, the link you've used has expired.
      </div>

      <div className="mb-3">
        You can use the links below to view forms you have completed previously, or go back to your home page.
      </div>

      <Flex>
        <Button label="Home page" fullWidth className="me-3" onClick={() => nav(AppRoutes.home)} />
        <Button label="My Forms" fullWidth onClick={() => nav(AppRoutes.forms)} />
      </Flex>
    </>
  );
}
