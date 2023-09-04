import React from "react";
import { CompositionSavedEvent, Credentials, FormConfig, FormRenderedEvent } from "form-renderer";
import { LoadingSpinner } from "../../atoms/LoadingSpinner/LoadingSpinner";
import { Logger } from "src/utils/logger";
import { ErrorModal } from "../ErrorModal";
import { FormCompleted } from "./components/FormCompleted";

interface IProps {
  formName: string;
  authToken: string;
  ehrId: string;
  formVersion?: string;
  compositionId?: string;
  presentationMode?: boolean;
  disableErrorModal?: boolean;
  onFormRendered?: (success: boolean) => void;
  onCompositionSaved?: (e: CompositionSavedEvent) => void;
}

interface IState {
  formRendered: boolean;
  formError: boolean;
  formComplete: boolean;
}

class FormRenderer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.formHandleRef = React.createRef<HTMLElement & FormConfig>();

    this.state = {
      formRendered: false,
      formError: false,
      formComplete: false,
    };

    const creds: Credentials = import.meta.env.PROD === true
      ? {
        authType: 'oauth2',
        token: props.authToken
      }
      : {
        username: import.meta.env.VITE_EHR_LOCAL_USERNAME,
        password: import.meta.env.VITE_EHR_LOCAL_PASSWORD
      };

    this.config = {
      formMetadata: {
        name: props.formName,
        version: props.formVersion,
      },
      resourceUrl: import.meta.env.VITE_EHR_SERVER_URL,
      credentials: creds,
      compositionId: props.compositionId,
      context: {
        language: 'en',
        presentationMode: props.presentationMode ?? true,
        theme: 'patient-portal',
      },
      formEnvironment: {
        variables: [
          { name: 'ehrId', value: props.ehrId }
        ]
      }
    };
  }

  private config: FormConfig;
  private formHandleRef: React.RefObject<HTMLElement & FormConfig>;

  componentDidMount() {
    if (!this.formHandleRef.current) {
      return
    }

    const component = this.formHandleRef.current;

    component.addEventListener(
      'onFormRendered',
      (event: FormRenderedEvent) => {
        this.setState({ formRendered: event.detail ?? false });
        this.props.onFormRendered && this.props.onFormRendered(event.detail ?? false);
      }
    );

    component.addEventListener(
      'onCompositionSaved',
      (event: CompositionSavedEvent) => {
        Logger.log(`handleSavedComposition\n${event}`);

        if (!event.detail?.success) {
          Logger.error(event.detail?.error?.message ?? 'Error saving composition');
          this.setState({ formError: true });
        }
        else {
          this.setState({ formComplete: true });
        }

        this.props.onCompositionSaved && this.props.onCompositionSaved(event);
      }
    );

    component.formMetadata = this.config.formMetadata;
    component.resourceUrl = this.config.resourceUrl;
    component.credentials = this.config.credentials;
    component.compositionId = this.config.compositionId;
    component.context = this.config.context;
    component.formEnvironment = this.config.formEnvironment;
  }

  render() {
    return (
      <>
        <div className="container">
          {
            !this.state.formRendered && <LoadingSpinner />
          }
          {
            this.state.formComplete
              ? <FormCompleted />
              : <form-renderer ref={this.formHandleRef}></form-renderer>
          }
        </div>

        <ErrorModal
          show={this.state.formError === true && this.props.disableErrorModal === false}
          onRetry={() => this.setState({ formError: false })}
        />
      </>
    );
  }
}

export default FormRenderer;
