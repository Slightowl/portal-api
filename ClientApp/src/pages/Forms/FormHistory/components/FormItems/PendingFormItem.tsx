import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { formatDisplayDateTime } from "src/utils/cui-utils";
import { FormItem } from "../FormItem";

interface IProps {
  token: string;
  sentAt: Date;
  dueAt: Date;
}

export const PendingFormItem: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <FormItem status="Pending" onClick={() => nav(AppRoutes.formsNew(props.token))}>
      <small>
        <strong>Sent:</strong> {formatDisplayDateTime(props.sentAt)}
      </small>
      <small>
        <strong>Due:</strong> {formatDisplayDateTime(props.dueAt)}
      </small>
    </FormItem>
  );
}
