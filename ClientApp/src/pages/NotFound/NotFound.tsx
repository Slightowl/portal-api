import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { Flex } from "src/components/atoms/Flex";
import { Img } from "src/components/atoms/Img";

interface IProps { }

export const NotFound: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <Flex col alignItems="center" className="container">

      <Img name="404.png" alt="Page Not Found" className="mt-3 mb-3" />

      <h1 className="text-center mb-3">Sorry, we can't find that page!</h1>
      <h4 className="mb-5">It might be an old link or it's been moved.</h4>

      <div>
        <Button label="Back to homepage" onClick={() => nav(AppRoutes.home)} />
      </div>

    </Flex>
  );
}
