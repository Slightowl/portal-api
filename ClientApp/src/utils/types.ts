// color
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

// size
export type Pixels = `${number}px`;
export type PixelsGroup = `${number}px ${number}px`;
export type PixelsAll = `${number}px ${number}px ${number}px ${number}px`;

export type REM = `${number}rem`;

export type Percent = `${number}%`;

export type CssSize = Pixels | REM | Percent;
