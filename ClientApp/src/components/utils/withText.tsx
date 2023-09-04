import styled, { css } from "styled-components/macro";

export type TextProps = {
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'white';
  bold?: boolean;
  italic?: boolean;
  size?: 'inherit' | 'sm' | 'normal' | 'lg';
}

export const textCss = css<TextProps>`
  font-size: ${p =>
    p.size === 'inherit' ? 'inherit'
      : p.size === 'sm' ? '12px'
        : p.size === 'lg' ? '20px'
          : '16px'
  };

  color: ${p =>
    p.color === 'primary' ? p.theme.palette.primary.main
      : p.color === 'secondary' ? p.theme.palette.secondary.main
        : p.color === 'accent' ? p.theme.palette.accent.main
          : p.color === 'white' ? p.theme.palette.white
            : 'inherit'
  };

  ${p => p.bold && css`font-weight: 500;`}
  ${p => p.italic && css`font-style: italic;`}
`;

export function withText<T>(Component: React.ComponentType<T>, additionalProps: TextProps) {
  const ComponentWithText = styled(Component) <TextProps>`${textCss}`;

  const result: React.FC<T> = props => (
    <ComponentWithText {...props} {...(additionalProps as any)} />
  );

  return result
}
