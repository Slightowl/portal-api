import React from 'react';
import authApi from 'src/api/auth/auth-api';
import { AuthUser } from 'src/api/auth/_types';
import { Logger } from 'src/utils/logger';
import { AuthStage, CodeSent, Login } from './Login';

interface IProps {
  onLoginSuccess: (jwt: string, user: AuthUser) => void;
}

export const LoginContainer: React.FC<IProps> = (props): JSX.Element => {
  const [stage, setStage] = React.useState<AuthStage>('login');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [numbers, setNumbers] = React.useState<string[]>([]);
  const [codeSent, setCodeSent] = React.useState<CodeSent>('none');
  const [requestId, setRequestId] = React.useState<string>();

  const handleLogin = async (lastName: string, postcode: string, dob: number) => (
    handle(async () => {

      const res = await authApi.login(lastName, postcode, dob);
      setRequestId(res.requestId);

      if (res.challengeType === 'nhs') {
        setStage('nhs-number');
      }
      else if (!res.numbers || res.numbers.length === 0) {
        // code sent via email
        setCodeSent('email');
        setStage('code');
      }
      else {
        // code sent via sms
        setNumbers(res.numbers || []);
        setCodeSent('sms');
        setStage('number');
      }

    })
  );

  const handleSelectNumber = (value: string) => (
    handle(async () => {

      if (!requestId) {
        setStage('error');
        return;
      }

      await authApi.sendVerificationCode(requestId, value);
      setStage('code');

    })
  );

  const handleSubmitCode = (code: string) => (
    handle(async () => {

      if (!requestId) {
        setStage('error');
        return;
      }

      const res = await authApi.checkVerificationCode(requestId, code);
      props.onLoginSuccess(res.jwt, res.user);

    })
  );

  const handleSubmitNhsNumber = (nhs: string) => (
    handle(async () => {

      if (!requestId) {
        setStage('error');
        return;
      }

      const res = await authApi.checkNhsNumber(requestId, nhs);
      props.onLoginSuccess(res.jwt, res.user);

    })
  );

  const handle = async (action: () => Promise<void>) => {
    try {
      setLoading(true);
      await action();
    }
    catch (error) {
      Logger.error('Login error', error);
      setStage('error');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Login
      stage={stage}
      loading={loading}
      numbers={numbers}
      codeSent={codeSent}
      onLogin={handleLogin}
      onSelectNumber={handleSelectNumber}
      onSubmitCode={handleSubmitCode}
      onSubmitNhsNumber={handleSubmitNhsNumber}
      onReset={() => setStage('login')}
    />
  );
}
