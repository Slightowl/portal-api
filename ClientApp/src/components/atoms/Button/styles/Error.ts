import { css } from "styled-components/macro";
import { ButtonVariant } from "./_types";

const button = css`
  border: none;
  background-color: ${p => p.theme.palette.error.main};
  color: ${p => p.theme.palette.error.contrastText};
  &:hover {
    background-color: ${p => p.theme.palette.error.hover};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const trans = css`
  border: none;
  background-color: transparent;
  color: ${p => p.theme.palette.error.main};
  &:hover {
    background-color: ${p => p.theme.palette.error.main};
    color: ${p => p.theme.palette.error.contrastText};
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
    background-color: transparent;
    color: ${p => p.theme.palette.error.hover};
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const outline = css`
  ${trans};
  border: 1px solid ${p => p.theme.palette.error.main};
`;

export const error = {
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