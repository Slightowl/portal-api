import { Pixels, PixelsAll, PixelsGroup } from "src/utils/types";
import styled, { css } from "styled-components/macro";

export type MarginProps = {
  margin?: PixelsAll | PixelsGroup | Pixels,
  top?: Pixels,
  bottom?: Pixels,
  right?: Pixels,
  left?: Pixels,
}

export const marginCss = css<MarginProps>`
  ${p => p.margin && `margin: ${p.margin};`}
  ${p => !p.margin && p.top && `margin-top: ${p.top};`}
  ${p => !p.margin && p.bottom && `margin-bottom: ${p.bottom};`}
  ${p => !p.margin && p.right && `margin-right: ${p.right};`}
  ${p => !p.margin && p.left && `margin-left: ${p.left};`}
`;

export function withMargin<T>(Component: React.ComponentType<T>, additionalProps: MarginProps) {
  const ComponentWithMargin = styled(Component) <MarginProps>`${marginCss}`;

  const result: React.FC<T> = props => (
    <ComponentWithMargin {...props} {...(additionalProps as any)} />
  );

  return result
}
