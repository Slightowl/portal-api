import clsx from 'clsx';
import React from 'react';
import { FormRequest } from 'src/api/proms/_types';
import { Badge } from 'src/components/atoms/Badge/Badge';
import { PageHeader } from "src/components/atoms/PageHeader/PageHeader";
import { ProgressBar } from 'src/components/atoms/ProgressBar/ProgressBar';
import { ViewAllTab } from './components/ViewAllTab';
import { ViewPendingTab } from './components/ViewPendingTab';

interface IProps {
  loading: boolean;
  formRequests: FormRequest[];
}

export const FormHistory: React.FC<IProps> = (props): JSX.Element => {
  const [pending, setPending] = React.useState<FormRequest[]>([]);
  const [showPending, setShowPending] = React.useState<boolean>(true);

  React.useEffect(() => {
    const pendingForms = props.formRequests.filter(x => x.status === 'Pending');
    setPending(pendingForms);
  }, [props.formRequests]);

  const clsPending = clsx('nav-link', showPending && 'active');
  const clsAllForms = clsx('nav-link', !showPending && 'active');

  return (
    <>
      <PageHeader title="My Forms" />

      <div className="container">

        <ul className="nav nav-tabs my-3">
          <li className="nav-item" onClick={() => setShowPending(true)}>
            <button className={clsPending}>
              <span> Pending </span>
              <Badge variant="primary" text={pending.length.toString()} hint="Number of pending forms" />
            </button>
          </li>
          <li className="nav-item" onClick={() => setShowPending(false)}>
            <button className={clsAllForms}>
              <span> All </span>
              <Badge variant="primary" text={props.formRequests.length.toString()} hint="Number of forms" />
            </button>
          </li>
        </ul>

        {
          props.loading
            ? <ProgressBar />
            : showPending
              ? <ViewPendingTab forms={pending} onViewAll={() => setShowPending(false)} />
              : <ViewAllTab forms={props.formRequests} />
        }

      </div>
    </>
  );
}



