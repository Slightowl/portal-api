import { cleanup, render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components/macro';
import { afterEach } from 'vitest';
import { defaultTheme } from './theme';

afterEach(() => {
  cleanup()
});

// https://testing-library.com/docs/react-testing-library/setup#custom-render

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // wrap provider(s) here if needed
    <ThemeProvider theme={defaultTheme}>
      <>
        {children}
      </>
    </ThemeProvider>
  )
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {
  wrapper: AllTheProviders,
  ...options
});

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render export
export { customRender as render };
