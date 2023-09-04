import { Pixels, PixelsAll, PixelsGroup } from "src/utils/types";
import styled, { css } from "styled-components/macro";

export type PaddingProps = {
  padding?: PixelsAll | PixelsGroup | Pixels,
  top?: Pixels,
  bottom?: Pixels,
  right?: Pixels,
  left?: Pixels,
}

export const paddingCss = css<PaddingProps>`
  ${p => p.padding && `padding: ${p.padding};`}
  ${p => !p.padding && p.top && `padding-top: ${p.top};`}
  ${p => !p.padding && p.bottom && `padding-bottom: ${p.bottom};`}
  ${p => !p.padding && p.right && `padding-right: ${p.right};`}
  ${p => !p.padding && p.left && `padding-left: ${p.left};`}
`;

export function withPadding<T>(Component: React.ComponentType<T>, additionalProps: PaddingProps) {
  const ComponentWithPadding = styled(Component) <PaddingProps>`${paddingCss}`;

  const result: React.FC<T> = props => (
    <ComponentWithPadding {...props} {...(additionalProps as any)} />
  );

  return result
}
