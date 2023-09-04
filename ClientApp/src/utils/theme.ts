import { DefaultTheme } from 'styled-components/macro'

const _white = '#ffffff';
const _black = '#000000';
const _light = '#f8f8f8';
const _dark = '#212529';

const _breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const defaultTheme: DefaultTheme = {
  navHeight: '48px',
  footerHeight: '26px',
  borderRadius: '4px',
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 4px 0px',
  palette: {
    black: _black,
    white: _white,
    light: _light,
    dark: _dark,
    greyDark: '#757575',
    grey: '#ddd',
    greyLight: '#eee',
    primary: {
      main: '#005eb8',
      hover: '#1976d2',
      contrastText: _white,
      disabled: '#5285b5',
    },
    secondary: {
      main: '#e2e5f2',
      hover: '#f4f5fa',
      contrastText: _dark,
    },
    accent: {
      main: '#8c1237',
      hover: '#5f0c25',
      contrastText: _white,
    },
    error: {
      main: '#e57373',
      hover: '#d55c5c',
      contrastText: _white,
    },
    info: '#0dcaf0',
    success: '#198754',
    warning: {
      main: '#ffc107',
      contrastText: _white,
      hover: '#ffd146'
    },
    danger: '#dc3545',
  },
  breakpoints: _breakpoints,
  breakpointPixels: {
    xs: `${_breakpoints.xs}px`,
    sm: `${_breakpoints.sm}px`,
    md: `${_breakpoints.md}px`,
    lg: `${_breakpoints.lg}px`,
    xl: `${_breakpoints.xl}px`,
    xxl: `${_breakpoints.xxl}px`,
  },
  formStatus: {
    pending: '#6ea8fe',
    declined: '#ffda6a',
    expired: '#dee2e6',
    completed: '#75b798',
  },
}
