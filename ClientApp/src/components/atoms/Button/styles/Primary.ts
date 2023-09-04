import { css } from "styled-components/macro";
import { ButtonVariant } from "./_types";

const button = css`
  border: none;
  background-color: ${p => p.theme.palette.primary.main};
  color: ${p => p.theme.palette.primary.contrastText};
  &:hover {
    background-color: ${p => p.theme.palette.primary.hover};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: ${p => p.theme.palette.primary.disabled};
  }
`;

const trans = css`
  border: none;
  background-color: transparent;
  color: ${p => p.theme.palette.primary.main};
  &:hover {
    background-color: ${p => p.theme.palette.primary.main};
    color: ${p => p.theme.palette.primary.contrastText};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    color: ${p => p.theme.palette.primary.disabled};
  }
`;

const link = css`
  ${trans};
  text-decoration: underline;
  &:hover {
    background-color: transparent;
    color: ${p => p.theme.palette.primary.hover};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    color: ${p => p.theme.palette.primary.disabled};
  }
`;

const outline = css`
  ${trans};
  border: 1px solid ${p => p.theme.palette.primary.main};
`;

export const primary = {
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