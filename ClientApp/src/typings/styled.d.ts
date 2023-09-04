import 'styled-components/macro';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

type Pixels = `${number}px`;

type Palette = {
  main: Color;
  hover: Color;
  contrastText: Color;
};

type PaletteWithDisabled = Palette & {
  disabled: Color;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    navHeight: Pixels;
    footerHeight: Pixels;
    borderRadius: Pixels;
    boxShadow: string;
    palette: {
      black: Color;
      white: Color;
      light: Color;
      dark: Color;
      greyDark: Color;
      grey: Color;
      greyLight: Color;
      primary: PaletteWithDisabled;
      secondary: Palette;
      accent: Palette;
      error: Palette;
      info: Color;
      success: Color;
      warning: Palette;
      danger: Color;
    };
    breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    breakpointPixels: {
      xs: Pixels;
      sm: Pixels;
      md: Pixels;
      lg: Pixels;
      xl: Pixels;
      xxl: Pixels;
    };
    formStatus: {
      pending: Color;
      expired: Color;
      declined: Color;
      completed: Color;
    };
  }
}