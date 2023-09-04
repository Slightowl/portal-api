import { ThemeProvider } from 'styled-components/macro';
import { defaultTheme } from 'src/utils/theme';

import 'bootstrap/dist/css/bootstrap.css';
import 'src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <Story />
    </ThemeProvider>
  ),
];