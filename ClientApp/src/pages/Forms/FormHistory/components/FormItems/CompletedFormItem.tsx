import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { formatDisplayDateTime } from "src/utils/cui-utils";
import { FormItem } from "../FormItem";

interface IProps {
  sentAt: Date;
  completedAt: Date | null | undefined;
  formName: string | null | undefined;
  compositionId: string | null | undefined;
}

export const CompletedFormItem: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  const handleClick = props.formName && props.compositionId
    ? () => nav(AppRoutes.formsView(props.formName as string, props.compositionId as string))
    : undefined;

  return (
    <FormItem status="Completed" onClick={handleClick}>
      <small>
        <strong>Sent:</strong> {formatDisplayDateTime(props.sentAt)}
      </small>
      <small>
        <strong>Completed:</strong> {props.completedAt ? formatDisplayDateTime(props.completedAt) : 'unknown'}
      </small>
    </FormItem>
  );
}
