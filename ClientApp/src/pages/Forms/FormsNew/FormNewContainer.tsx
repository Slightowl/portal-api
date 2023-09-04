import { CompositionSavedEvent } from 'form-renderer';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import promsApi from 'src/api/proms/proms-api';
import { FormRequest } from 'src/api/proms/_types';
import { AppRoutes } from 'src/AppRoutes';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner/LoadingSpinner';
import { FormAccessError } from 'src/components/organisms/FormAccessError/FormAccessError';
import { RootState } from 'src/store/store';
import { Logger } from 'src/utils/logger';
import { FormNew } from './FormNew';

interface IProps extends StoreProps {
  token: string;
}

type StoreProps = ConnectedProps<typeof connector>;

const connector = connect(
  (state: RootState) => ({
    ehrId: state.userDetails.ehrId,
    christieNumber: state.userDetails.currentUser?.christieNumber,
    authToken: state.userDetails.jwt,
  }), { }
);

const FormNewContainer: React.FC<IProps> = (props): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [formRequest, setFormRequest] = React.useState<FormRequest>();

  React.useEffect(() => {

    const fetchFormDetails = async () => {
      try {
        setLoading(true);

        const details = await promsApi.getFormRequest(props.token);
        setFormRequest(details);
      }
      catch (error) {
        Logger.error('Error fetching new form request details', error)
      }
      finally {
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [props.token]);

  const handleCompositionSaved = async (e: CompositionSavedEvent): Promise<void> => {
    if (e.detail && e.detail.uid) {
      await promsApi.postNewPromCompleted(props.token, e.detail.uid);
    }
  }

  // we still fetching data so show a spinner
  if (loading || props.ehrId.status === 'pending') {
    return <LoadingSpinner />;
  }

  // no auth token, back to login
  if (!props.authToken) {
    return <Navigate to={AppRoutes.login} />;
  }

  // we've finished loading but don;t have all the required info, so show an error
  if (!formRequest || !props.ehrId.value || !props.christieNumber) {
    return <FormAccessError />;
  }

  // the request is for a different user, so redirect
  if (formRequest.christieNumber !== props.christieNumber) {
    Logger.warn('Trying to load new form request for a different user, redirecting to forms page');

    return <Navigate to={AppRoutes.forms} />;
  }

  // the form is already complete, so redirect
  if (formRequest.status === 'Completed') {
    Logger.log('Form is already complete, navigating to form view');

    return <Navigate to={AppRoutes.formsView(formRequest.formName, formRequest.compositionId || '')} />;
  }

  // show the form
  return (
    <FormNew
      formName={formRequest.formName}
      ehrId={props.ehrId.value}
      authToken={props.authToken}
      onCompositionSaved={handleCompositionSaved}
    />
  );
};

export default connector(FormNewContainer);
