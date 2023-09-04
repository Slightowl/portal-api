import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { AppRoutes } from "src/AppRoutes";
import { Button } from "src/components/atoms/Button/Button";
import { Flex } from "src/components/atoms/Flex";
import { AppName } from "src/components/molecules/AppName/AppName";
import { Logo } from "src/components/molecules/Logo/Logo";
import { withMargin } from "src/components/utils/withMargin";
import { withWidth } from "src/components/utils/withWidth";
import { Img } from "src/components/atoms/Img";

interface IProps { }

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  font-size: 18px;
  text-align: center;
`;

const FlexFooter = styled(Flex)`
  width: 100%;
  margin-top: 8px;
  padding: 8px 24px;
  position: fixed;
  left: 0;
  bottom: ${p => p.theme.footerHeight};

  .footer-address {
    font-size: 14px;
  }

  .footer-nhs-logo-wrap {
    cursor: pointer;
    transition: all .2s ease-in-out;
    img {
      height: 48px;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const AppNameWithMargin = withMargin(AppName, { top: '32px', bottom: '32px' })

const ButtonWithWidth = withWidth(Button, { width: '160px' });

export const PublicHome: React.FC<IProps> = (props): JSX.Element => {
  const nav = useNavigate();

  return (
    <Flex col className="px-3">

      <Logo />

      <AppNameWithMargin center />

      <Div>
        This service helps your team at The Christie monitor your symptoms and quality of life at home, and better understand your health.
      </Div>

      <Div>
        You should have received a text message or email from The Christie which gives you access to the My Christie, My Health questionnaires.
      </Div>

      <Flex grow col alignItems="center">
        <Div>
          If you have used this portal before, you can sign in here:
        </Div>
        <ButtonWithWidth label="Sign in" onClick={() => nav(AppRoutes.login)} />
      </Flex>

      <FlexFooter alignItems="center">
        <div className="footer-address">
          <p>
            The Christie NHS Foundation Trust
            <br />Wilmslow Road
            <br />Manchester
            <br />M20 4BX
            <br />United Kingdom
          </p>
          <p>+44 (0) 161 446 3000</p>
        </div>
        <div className="flex-grow-1"></div>
        <a href="https://www.christie.nhs.uk/" target="_blank" rel="noreferrer" className="footer-nhs-logo-wrap">
          <Img alt="Christie Heart Logo" name="heart-logo.png" />
        </a>
      </FlexFooter>

    </Flex>
  );
}
