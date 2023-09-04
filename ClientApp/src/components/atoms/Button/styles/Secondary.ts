import { css } from "styled-components/macro";
import { ButtonVariant } from "./_types";

const button = css`
  border: none;
  background-color: ${p => p.theme.palette.secondary.main};
  color: ${p => p.theme.palette.secondary.contrastText};
  &:hover {
    background-color: ${p => p.theme.palette.secondary.hover};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const trans = css`
  border: none;
  background-color: transparent;
  color: ${p => p.theme.palette.secondary.main};
  &:hover {
    background-color: ${p => p.theme.palette.secondary.main};
    color: ${p => p.theme.palette.secondary.contrastText};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const link = css`
  ${trans};
  text-decoration: underline;
  &:hover {
    color: ${p => p.theme.palette.secondary.hover};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const outline = css`
  ${trans};
  border: 1px solid ${p => p.theme.palette.secondary.main};
`;

export const secondary = {
  button,
  trans,
  outline,
  link,
  fromVariant: (v: ButtonVariant = 'standard') => (
    v === 'standard' ? button
      : v === 'transparent' ? trans
        : v === 'outline' ? outline
          : link
  ),
};