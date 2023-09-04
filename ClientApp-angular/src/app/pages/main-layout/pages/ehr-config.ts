import { environment } from 'src/environments/environment';

export type FormConfig = {
  formMetadata: FormMetadata;
  resourceUrl: string;
  credentials: Credentials;
  compositionId?: string | null;
  context: {
    language: string;
    readonly?: boolean;
    presentationMode?: boolean;
    showAllPages?: boolean;
    dataFormat?: string;
    theme?: FormTheme
  };
};

export type CompositionSavedEvent = Event & {
  detail?: {
    success: boolean;
    uid?: string;
    error?: { message: string };
  }
}

export type FormTheme = 'default' | 'white' | 'patient-portal';

export type Credentials = BasicCredentials | TokenCredentials;

export type BasicCredentials = {
  username: string | null;
  password: string | null;
};

export type TokenCredentials = {
  authType: 'oauth2';
  token: string;
};

export type FormMetadata = {
  name: string;
  version?: string;
};

export const isTokenCredentials = (creds: Credentials): creds is TokenCredentials => {
  return (creds as TokenCredentials).authType !== undefined;
};

export const getFormConfig = (
  formName: string,
  authToken: string,
  compositionId?: string,
  presentationMode: boolean = true,
  theme: FormTheme = 'patient-portal'
): FormConfig => {
  const creds: Credentials = environment.production
    ? {
      authType: 'oauth2',
      token: authToken
    }
    : {
      username: environment.ehrLocalUsername,
      password: environment.ehrLocalPassword
    };

  return {
    formMetadata: {
      name: formName,
    },
    resourceUrl: environment.ehrServerUrl,
    compositionId,
    context: {
      language: 'en',
      presentationMode,
      theme
    },
    credentials: creds
  };
};
