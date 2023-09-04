
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from 'src/AppRoutes';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner/LoadingSpinner';
import { FormAccessError } from 'src/components/organisms/FormAccessError/FormAccessError';
import { RootState } from 'src/store/store';
import { FormView } from './FormView';

interface IProps extends StoreProps {
  formName: string;
  compositionId: string;
}

type StoreProps = ConnectedProps<typeof connector>;

const connector = connect(
  (state: RootState) => ({
    ehrId: state.userDetails.ehrId,
    authToken: state.userDetails.jwt,
  }), {}
);

const FormViewContainer: React.FC<IProps> = (props): JSX.Element => {

  // no auth token, back to login
  if (!props.authToken) {
    return <Navigate to={AppRoutes.login} />;
  }

  // still fetching ehr id, so show a spinner
  if (props.ehrId.status === 'pending') {
    return <LoadingSpinner />;
  }

  // we've finished loading but don't have all the required info, so show an error
  if (!props.ehrId.value) {
    return <FormAccessError />;
  }

  return (
    <FormView
      formName={props.formName}
      compositionId={props.compositionId}
      ehrId={props.ehrId.value}
      authToken={props.authToken}
    />
  );
}

export default connector(FormViewContainer);
