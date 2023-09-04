import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { LimitWidthContainer } from "src/components/layouts/LimitWidthContainer";
import { FormAccessError } from "src/components/organisms/FormAccessError/FormAccessError";
import { DeclineFormRequest } from "./components/DeclineFormRequest";
import { EditFormRequest } from "./components/EditFormRequest";
import { FormRequestExpired } from "./components/FormRequestExpired";
import { FormRequestOptions } from "./components/FormRequestOptions";

export type PageState = 'options' | 'edit' | 'decline' | 'expired' | 'error';

interface IProps {
  state: PageState;
  token: string;
  formName: string;
  compositionId: string;
  disable: boolean;
  onUpdate: (state: PageState) => void;
  onSubmitDecline: (reason: string) => void;
}

export const FormRequest: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  const handleContinueRequest = () => nav(AppRoutes.formsNew(props.token));
  const handleCompleteLater = () => nav(AppRoutes.home);
  const handleEdit = () => nav(AppRoutes.formsView(props.formName, props.compositionId));
  const handleTryDecline = () => props.onUpdate('decline');
  const handleCancelDecline = () => props.onUpdate('options');
  const handleSubmitDecline = (reason: string) => props.onSubmitDecline(reason);

  return (
    <LimitWidthContainer>
      {props.state === 'options' && <FormRequestOptions onContinue={handleContinueRequest} onLater={handleCompleteLater} onDecline={handleTryDecline} />}
      {props.state === 'edit' && <EditFormRequest onEdit={handleEdit} />}
      {props.state === 'decline' && <DeclineFormRequest disable={props.disable} onLater={handleCompleteLater} onCancel={handleCancelDecline} onDecline={handleSubmitDecline} />}
      {props.state === 'expired' && <FormRequestExpired />}
      {props.state === 'error' && <FormAccessError />}
    </LimitWidthContainer>
  );
}
