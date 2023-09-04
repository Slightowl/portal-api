import React from 'react';
import promsApi from 'src/api/proms/proms-api';
import { FormRequest } from 'src/api/proms/_types';
import { Logger } from 'src/utils/logger';
import { FormHistory } from './FormHistory';

export const FormHistoryContainer: React.FC = (props): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [forms, setForms] = React.useState<FormRequest[]>([]);

  React.useEffect(() => {

    const fetchProms = async () => {
      try {
        const forms = await promsApi.getFormRequests();
        setForms(forms);
      }
      catch (error) {
        Logger.error('Error fetching proms', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProms();
  }, []);

  return (
    <FormHistory loading={loading} formRequests={forms} />
  );
}
