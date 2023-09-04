import { Navigate, useParams } from 'react-router-dom';
import { AppRoutes } from 'src/AppRoutes';
import { isNullOrWhitespace } from 'src/utils/string-utils';
import FormViewContainer from './FormViewContainer';

type RouteParams = {
  formName: string;
  compositionId: string;
}

export const FormViewRoute: React.FC = (props): JSX.Element => {
  const { formName, compositionId } = useParams<RouteParams>();

  if (
    !formName
    || isNullOrWhitespace(formName)
    || !compositionId
    || isNullOrWhitespace(compositionId)
  ) {
    return <Navigate to={AppRoutes.forms} />
  }

  return (
    <FormViewContainer formName={formName} compositionId={compositionId} />
  );
}
