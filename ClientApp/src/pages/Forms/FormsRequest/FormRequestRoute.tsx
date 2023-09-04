import { useParams } from "react-router-dom";
import FormRequestContainer from "./FormRequestContainer";

interface IProps { }

type RouteParams = {
  token: string;
}

export const FormRequestRoute: React.FC<IProps> = (props): JSX.Element => {
  const { token } = useParams<RouteParams>();

  return (
    <FormRequestContainer token={token || ''} />
  );
}
