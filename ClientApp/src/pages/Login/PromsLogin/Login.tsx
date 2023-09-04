import styled from "styled-components/macro";
import { Flex } from "src/components/atoms/Flex";
import { AppName } from "src/components/molecules/AppName/AppName";
import { Logo } from "src/components/molecules/Logo/Logo";
import { LoginError } from "./components/LoginError";
import { LoginForm } from "./components/LoginForm";
import { NhsNumber } from "./components/NhsNumber";
import { NumberSelect } from "./components/NumberSelect";
import { OneTime } from "./components/OneTime";

export type AuthStage = 'login' | 'nhs-number' | 'number' | 'code' | 'error';

export type CodeSent = 'none' | 'sms' | 'email';

interface IProps {
  stage: AuthStage;
  loading: boolean;
  numbers: string[];
  codeSent: CodeSent;
  onLogin: (lastName: string, postcode: string, dob: number) => void;
  onSelectNumber: (value: string) => void;
  onSubmitCode: (code: string) => void;
  onSubmitNhsNumber: (nhs: string) => void;
  onReset: () => void;
}

const LoginFlex = styled(Flex)`
  width: 375px;
  margin: auto;
  margin-top: 128px;
`;

export const Login: React.FC<IProps> = (props): JSX.Element => {

  return (
    <Flex col fullHeight fullWidth>

      <LoginFlex col>

        <Logo />
        <AppName size="h2" />

        {props.stage === "login" && <LoginForm disable={props.loading} onLogin={props.onLogin} />}

        {props.stage === "nhs-number" && <NhsNumber disable={props.loading} onSubmit={props.onSubmitNhsNumber} />}

        {props.stage === "number" && <NumberSelect disable={props.loading} numbers={props.numbers} onSelectNumber={props.onSelectNumber} />}

        {props.stage === "code" && <OneTime disable={props.loading} viaSms={props.codeSent === 'sms'} onSubmit={props.onSubmitCode} onTryAgain={props.onReset} />}

        {props.stage === "error" && <LoginError onBack={props.onReset} />}

      </LoginFlex>

      <Flex alignItems="center" justifyContent="center">
        <a className="p-2" href="https://www.christie.nhs.uk/about-us/data-protection" target="_blank" rel="noreferrer">
          <small>Data Protection</small>
        </a>
        <a className="p-2" href="https://www.christie.nhs.uk/about-us/terms-and-conditions" target="_blank" rel="noreferrer">
          <small>Terms & Conditions</small>
        </a>
      </Flex>

    </Flex>
  );
}
