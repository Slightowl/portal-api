import { Navigate, useParams } from 'react-router-dom';
import { AppRoutes } from 'src/AppRoutes';
import { isNullOrWhitespace } from 'src/utils/string-utils';
import FormNewContainer from './FormNewContainer';

type RouteParams = {
  token: string;
}

export const FormNewRoute: React.FC = (): JSX.Element => {
  const { token } = useParams<RouteParams>();

  if (!token || isNullOrWhitespace(token)) {
    return <Navigate to={AppRoutes.forms} />
  }

  return (
    <FormNewContainer token={token} />
  );
}
