import { FormRequest } from "src/api/proms/_types";
import { CompletedFormItem } from "./FormItems/CompletedFormItem";
import { DeclinedFormItem } from "./FormItems/DeclinedFormItem";
import { ExpiredFormItem } from "./FormItems/ExpiredFormItem";
import { PendingFormItem } from "./FormItems/PendingFormItem";

interface IProps {
  forms: FormRequest[];
}

export const ViewAllTab: React.FC<IProps> = (props): JSX.Element => {

  if (props.forms.length === 0) {
    return (
      <span className="text-center">You currently have no form requests.</span>
    );
  }

  return (
    <>
      {
        props.forms
          .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
          .map((x, i) => {

            switch (x.status) {
              case 'Pending': return <PendingFormItem key={i} sentAt={x.sentAt} dueAt={x.submissionDueAt} token={x.token} />;
              case 'Expired': return <ExpiredFormItem key={i} sentAt={x.sentAt} dueAt={x.submissionDueAt} />;
              case 'Declined': return <DeclinedFormItem key={i} sentAt={x.sentAt} declinedAt={x.declinedAt} />;
              case 'Completed': return <CompletedFormItem key={i} sentAt={x.sentAt} completedAt={x.completedAt} formName={x.formName} compositionId={x.compositionId} />;
              default: return null;
            }

          })
      }
    </>
  );
}
