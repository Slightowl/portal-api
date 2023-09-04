import { useNavigate } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { LimitWidthContainer } from "src/components/layouts/LimitWidthContainer";
import { AppName } from "src/components/molecules/AppName/AppName";
import { Logo } from "src/components/molecules/Logo/Logo";

interface IProps { }

export const LoginProblems: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <LimitWidthContainer>

      <Logo />

      <AppName />

      <h3>
        Sorry we can't sign you in.
      </h3>

      <div>
        <p>If you have an appointment with us, you will be automatically registered and should be able to sign in with your details.</p>
        <p>It may be that we don't have the most up to date information for you. It could be:</p>
        <ul>
          <li>a typo in your name</li>
          <li>an incorrect address</li>
          <li>a mistake in your date of birth</li>
        </ul>
        <p>Please contact us directly to confirm we have the right details for you.</p>
        <p>If a member of staff has updated your details, it may take 1 or 2 days for that information to update here.</p>
      </div>

      <Button label="Back to login page" fullWidth onClick={() => nav(AppRoutes.login)} />

    </LimitWidthContainer>
  );
}
