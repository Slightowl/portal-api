import React, { PropsWithChildren } from "react";
import { CssSize } from "src/utils/types";
import styled, { css } from "styled-components/macro";

export interface IProps extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  col?: boolean;
  justifyContent?: 'start' | 'flex-start' | 'end' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline';
  gap?: CssSize;
  grow?: boolean;
  wrap?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  onClick?: () => void;
}

const FlexStyled = styled.div<IProps>`
  display: flex;

  flex-direction: ${p => p.col ? 'column' : 'row'};
  justify-content: ${p => p.justifyContent};
  align-items: ${p => p.alignItems};
  gap: ${p => p.gap};

  ${p => p.wrap && p.wrap === true && css`flex-wrap: wrap;`}
  ${p => p.grow && p.grow === true && css`flex-grow: 1;`}

  ${p => p.fullWidth && p.fullWidth === true && css`width: 100%;`}
  ${p => p.fullHeight && p.fullHeight === true && css`height: calc(100vh - ${x => x.theme.footerHeight});`}
`;

export const Flex: React.FC<IProps> = (props): JSX.Element => {

  return (
    <FlexStyled {...props} className={props.className} onClick={() => props.onClick && props.onClick()}>
      {props.children}
      <div></div>
    </FlexStyled>
  )
}
