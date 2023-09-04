import { FormRequest } from "src/api/proms/_types";
import { Button } from "src/components/atoms/Button/Button";
import { PendingFormItem } from "./FormItems/PendingFormItem";

interface IProps {
  forms: FormRequest[];
  onViewAll: () => void;
}

export const ViewPendingTab: React.FC<IProps> = (props): JSX.Element => {

  if (props.forms.length === 0) {
    return (
      <>
        <span className="text-center">You currently have no pending form requests.</span>
        <Button label="View previous form requests" variant="link" onClick={props.onViewAll} />
      </>
    );
  }

  return (
    <>
      {
        props.forms
          .sort((a, b) => new Date(a.submissionDueAt).getTime() - new Date(b.submissionDueAt).getTime())
          .map((x, i) => (

            <PendingFormItem key={i} sentAt={x.sentAt} dueAt={x.submissionDueAt} token={x.token} />

          ))
      }
    </>
  );
}
