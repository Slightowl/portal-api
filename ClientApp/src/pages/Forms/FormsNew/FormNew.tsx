import { CompositionSavedEvent } from "form-renderer";
import FormRenderer from "src/components/organisms/FormRenderer/FormRenderer";

interface IProps {
  formName: string;
  authToken: string;
  ehrId: string;
  onCompositionSaved: (e: CompositionSavedEvent) => void;
}

export const FormNew: React.FC<IProps> = (props): JSX.Element => {

  return (
    <div>
      <FormRenderer
        formName={props.formName}
        authToken={props.authToken}
        ehrId={props.ehrId}
        presentationMode={false}
        onCompositionSaved={props.onCompositionSaved}
      />
    </div>
  );
}
