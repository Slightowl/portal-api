import { environment } from 'src/environments/environment';
import { BasicCredentials, FormConfig, getFormConfig, isTokenCredentials, TokenCredentials } from './ehr-config';

describe('ehr-config', () => {

  it('isTokenCredentials: return true when creds are token creds', () => {
    const creds: TokenCredentials = {
      token: 'token',
      authType: 'oauth2'
    };

    expect(isTokenCredentials(creds)).toBe(true);
  });

  it('isTokenCredentials: return false when creds are basic creds', () => {
    const creds: BasicCredentials = {
      username: 'user',
      password: 'pass'
    };

    expect(isTokenCredentials(creds)).toBe(false);
  });

  it('getFormConfig: returns expected config with basic creds', () => {
    environment.production = false;
    environment.ehrLocalUsername = 'user';
    environment.ehrLocalPassword = 'pass';

    const expected: FormConfig = {
      formMetadata: {
        name: 'form-name',
      },
      resourceUrl: environment.ehrServerUrl,
      compositionId: 'cid',
      context: {
        language: 'en',
        readonly: true,
        theme: 'white'
      },
      credentials: {
        username: 'user',
        password: 'pass'
      }
    };

    expect(getFormConfig('form-name', 'token', 'cid')).toEqual(expected);
  });

  it('getFormConfig: returns expected config with token creds', () => {
    environment.production = true;
    environment.ehrLocalUsername = 'user';
    environment.ehrLocalPassword = 'pass';

    const expected: FormConfig = {
      formMetadata: {
        name: 'form-name',
      },
      resourceUrl: environment.ehrServerUrl,
      compositionId: 'cid',
      context: {
        language: 'en',
        readonly: true,
        theme: 'white'
      },
      credentials: {
        authType: 'oauth2',
        token: 'token'
      }
    };

    expect(getFormConfig('form-name', 'token', 'cid')).toEqual(expected);
  });
});
