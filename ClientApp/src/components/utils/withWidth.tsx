import styled from "styled-components/macro";
import { Percent, Pixels } from "src/utils/types";

export type WidthProps = {
  width: Pixels | Percent;
}

export function withWidth<T>(Component: React.ComponentType<T>, additionalProps: WidthProps) {
  const ComponentWithWidth = styled(Component) <WidthProps>`
    width: ${p => p.width};
  `;

  const result: React.FC<T> = props => (
    <ComponentWithWidth {...props} {...(additionalProps as any)} />
  );

  return result
}
