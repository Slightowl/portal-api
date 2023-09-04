import styled from "styled-components/macro";
import { marginCss, MarginProps } from "../utils/withMargin";
import { paddingCss, PaddingProps } from "../utils/withPadding";
import { textCss, TextProps } from "../utils/withText";

interface IProps extends MarginProps, PaddingProps, TextProps, React.PropsWithChildren {
  className?: string;
}

const SpanStyled = styled.span<IProps>`
  ${marginCss}
  ${paddingCss}
  ${textCss}
`;

export const Span: React.FC<IProps> = (props): JSX.Element => {

  return (
    <SpanStyled className={props.className} {...props}>
      {props.children}
    </SpanStyled>
  );
}
