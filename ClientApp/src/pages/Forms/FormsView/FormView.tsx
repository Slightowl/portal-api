import FormRenderer from "src/components/organisms/FormRenderer/FormRenderer";

interface IProps {
  formName: string;
  compositionId: string;
  authToken: string;
  ehrId: string;
}

export const FormView: React.FC<IProps> = (props): JSX.Element => {

  // compositionId="013c9c1a-dfbb-4190-a83c-cd7cb387967f"

  return (
    <div>
      <FormRenderer
        formName={props.formName}
        authToken={props.authToken}
        ehrId={props.ehrId}
        presentationMode={true}
        compositionId={props.compositionId}
      />
    </div>
  );
}
