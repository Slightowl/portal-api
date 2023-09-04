import React from 'react';
import promsApi from 'src/api/proms/proms-api';
import { Logger } from 'src/utils/logger';
import { Home, PendingForms } from './Home';

export const HomeContainer: React.FC = (props): JSX.Element => {
  const [pendingForms, setPendingForms] = React.useState<PendingForms>({ status: 'fetching', forms: [] });

  React.useEffect(() => {

    const fetchPendingForms = async () => {
      try {
        const forms = await promsApi.getFormRequests();
        const pending = forms.filter(x => x.status === 'Pending');
        setPendingForms({ status: 'complete', forms: pending });
      }
      catch (error) {
        Logger.error('Error fetching pending forms', error);
        setPendingForms({ status: 'complete', forms: [] });
      }
    };

    fetchPendingForms();
  }, []);

  return (
    <Home pendingForms={pendingForms} />
  );
}
