import { formatDisplayDateTime } from "src/utils/cui-utils";
import { FormItem } from "../FormItem";

interface IProps {
  sentAt: Date;
  dueAt: Date;
}

export const ExpiredFormItem: React.FC<IProps> = (props): JSX.Element => {

  return (
    <FormItem status="Expired">
      <small>
        <strong>Sent:</strong> {formatDisplayDateTime(props.sentAt)}
      </small>
      <small>
        <strong>Expired:</strong> {formatDisplayDateTime(props.dueAt)}
      </small>
    </FormItem>
  );
}
