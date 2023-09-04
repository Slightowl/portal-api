import { formatDisplayDateTime } from "src/utils/cui-utils";
import { FormItem } from "../FormItem";

interface IProps {
  sentAt: Date;
  declinedAt: Date | null | undefined;
}

export const DeclinedFormItem: React.FC<IProps> = (props): JSX.Element => {

  return (
    <FormItem status="Declined">
      <small>
        <strong>Sent:</strong> {formatDisplayDateTime(props.sentAt)}
      </small>
      <small>
        <strong>Declined:</strong> {props.declinedAt ? formatDisplayDateTime(props.declinedAt) : 'unknown'}
      </small>
    </FormItem>
  );
}
