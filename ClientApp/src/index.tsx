import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { App } from './App';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// theme
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro';
import { defaultTheme } from './utils/theme';

// utils
import ErrorBoundary from './components/utils/ErrorBoundary';

// store
import { Provider } from 'react-redux'
import { store } from './store/store'

// custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['form-renderer']: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const GlobalStyle = createGlobalStyle`
  a, .nav-link {
    color: ${p => p.theme.palette.primary.main};
    &:hover {
      color: ${p => p.theme.palette.primary.hover};
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }

  /* better form renderer */
  .ehr-form .ehr-form--theme.patient-portal  {
    --b-ehr-form-background: none;
    --b-button-default-background-color: #{${p => p.theme.palette.white}};
    --b-button-selected-background-color: #005eb8;
    --b-button-selected-border-color: #043165;
    --b-button-selected-color: #{${p => p.theme.palette.white}};

    i.b-icon {
      color: ${p => p.theme.palette.white};
    }
  }

  @media only screen and (min-width: 415px) {
    .ehr-form .col-sm-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
