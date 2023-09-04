import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import promsApi from 'src/api/proms/proms-api';
import { FormRequest as ApiFormRequest } from 'src/api/proms/_types';
import { AppRoutes } from 'src/AppRoutes';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner/LoadingSpinner';
import { RootState } from 'src/store/store';
import { Logger } from 'src/utils/logger';
import { FormRequest, PageState } from './FormRequest';

interface IProps extends StoreProps {
  token: string;
}

type StoreProps = ConnectedProps<typeof connector>;

const connector = connect(
  (state: RootState) => ({
    christieNumber: state.userDetails.currentUser?.christieNumber,
  }), { }
);

const FormRequestContainer: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = React.useState<PageState>('options');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<ApiFormRequest>();

  const nav = useNavigate();

  React.useEffect(() => {
    const fetchRequest = async () => {
      try {
        const request = await promsApi.getFormRequest(props.token);

        if (request.christieNumber !== props.christieNumber) {
          setState('error');
          return;
        }

        setForm(request);

        if (request.status === 'Expired') {
          setState('expired');
          return;
        }

        if (request.status === 'Completed') {
          setState('edit');
          return;
        }

        setState('options');
      }
      catch (error) {
        Logger.error('Error fetching form request', error);
        setState('error');
      }
      finally {
        setLoading(false);
      }
    }

    fetchRequest();
  }, [props.christieNumber, props.token]);

  const handleSubmitDecline = async (reason: string) => {
    try {
      setSubmitting(true);
      await promsApi.decline(props.token, form?.formName ?? '', reason);
      nav(AppRoutes.formsRequestFeedback(props.token));
    }
    catch (error) {
      Logger.error("Error submitting form decline", error);
    }
    finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {
        loading
          ? <LoadingSpinner />
          : (
            <FormRequest
              state={state}
              disable={submitting}
              token={form?.token || ''}
              formName={form?.formName || ''}
              compositionId={form?.compositionId || ''}
              onUpdate={state => setState(state)}
              onSubmitDecline={handleSubmitDecline}
            />
          )
      }
    </>
  );
}

export default connector(FormRequestContainer);
