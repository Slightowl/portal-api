declare module 'form-renderer' {
  type FormConfig = {
    formMetadata: {
      name: string;
      version?: string;
    };
    resourceUrl: string;
    credentials: Credentials;
    compositionId?: string | null;
    formEnvironment: {
      variables: { [key: string]: string }[]
    };
    context: {
      language: string;
      readonly?: boolean;
      presentationMode?: boolean;
      showAllPages?: boolean;
      dataFormat?: string;
      theme?: 'default' | 'white' | 'patient-portal';
    };
  };

  type Credentials = BasicCredentials | TokenCredentials;

  type BasicCredentials = {
    username: string | null;
    password: string | null;
  };

  type TokenCredentials = {
    authType: 'oauth2';
    token: string;
  };

  type FormRenderedEvent = Event & {
    detail?: boolean;
  }

  type CompositionSavedEvent = Event & {
    detail?: {
      success: boolean;
      uid?: string;
      error?: { message: string };
    }
  }
}