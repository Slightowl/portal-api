import styled from "styled-components/macro";
import { marginCss, MarginProps } from "../utils/withMargin";
import { paddingCss, PaddingProps } from "../utils/withPadding";
import { textCss, TextProps } from "../utils/withText";

interface IProps extends MarginProps, PaddingProps, TextProps, React.PropsWithChildren {
  className?: string;
}

const DivStyled = styled.div<IProps>`
  ${marginCss}
  ${paddingCss}
  ${textCss}
`;

export const Div: React.FC<IProps> = (props): JSX.Element => {

  return (
    <DivStyled className={props.className} {...props}>
      {props.children}
    </DivStyled>
  );
}
