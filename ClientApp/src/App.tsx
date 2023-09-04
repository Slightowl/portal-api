import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Flex } from './components/atoms/Flex';
import { MainLayout } from './components/layouts/MainLayout';
import { RequireAuth } from './components/utils/RequireAuth';
import { FormHistoryContainer } from './pages/Forms/FormHistory/FormHistoryContainer';
import { FormNewRoute } from './pages/Forms/FormsNew/FormNewRoute';
import { FormRequestRoute } from './pages/Forms/FormsRequest/FormRequestRoute';
import { FormRequestFeedback } from './pages/Forms/FormsRequestFeedback/FormRequestFeedback';
import { FormViewRoute } from './pages/Forms/FormsView/FormViewRoute';
import { Help } from './pages/Help/Help';
import { HomeContainer } from './pages/Home/HomeContainer';
import { TokenRedirect } from './pages/Login/PromsLogin/components/TokenRedirect';
import { LoginRoute } from './pages/Login/LoginRoute';
import { LoginProblems } from './pages/LoginProblems/LoginProblems';
import { Logout } from './pages/Logout/Logout';
import { MyDetailsContainer } from './pages/MyDetails/MyDetailsContainer';
import { NotFound } from './pages/NotFound/NotFound';
import { PublicHome } from './pages/PublicHome/PublicHome';

interface IProps { }

const CloudsSvg = styled.svg`
  position: fixed;
  bottom: -160px;
  left: -230px;
  z-index: -10;
  width: 1920px;
`;

const Content = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
`;

const Copyright = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${p => p.theme.footerHeight};
  color: ${p => p.theme.palette.white};
  background-color: ${p => p.theme.palette.primary.main};
  font-size: 12px;
  padding: 4px 16px;
`;

export const App: React.FC<IProps> = (props): JSX.Element => {
  return (
    <BrowserRouter>
      <Flex col className='h-100'>
        <Content>

          <Routes>

            {/* PUBLIC LINKS */}
            {
              /**
               * link shortening
               *
               * These routes follow a convention to allow link shortening for a specific
               * redirect after login. Each route should use the TokenRedirectComponent and
               * start with a single letter that will be mapped to specific page by the
               * login component.
               *
               * The TokenRedirectComponent simply turns the route in to
               * query params and redirects to login; ie:
               *
               *  - f/ABC123 => /login?token=ABC123&path=f
               *
               * the login flow then uses the PATH_MAP (in the login component) to redirect
               * after a successful login, appending the token. So the example above would
               * be redirected to:
               *
               *  - /forms/request/ABC123
               */
            }
            <Route path="f/:token" element={<TokenRedirect />} />

            {/* PUBLIC */}
            <Route path="public" element={<PublicHome />} />
            <Route path="login" element={<LoginRoute />} />
            <Route path="login-problems" element={<LoginProblems />} />
            <Route path="logout" element={<Logout />} />

            {/* PROTECTED */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomeContainer />} />
                <Route path="forms/request/:token/feedback" element={<FormRequestFeedback />} />
                <Route path="forms/request/:token" element={<FormRequestRoute />} />
                <Route path="forms/new/:token" element={<FormNewRoute />} />
                <Route path="forms/new" element={<Navigate to="/forms" />} />
                <Route path="forms/view/:formName/:compositionId" element={<FormViewRoute />} />
                <Route path="forms/view" element={<Navigate to="/forms" />} />
                <Route path="forms" element={<FormHistoryContainer />} />
                <Route path="my-details" element={<MyDetailsContainer />} />
                <Route path="help" element={<Help />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>

        </Content>
        <Copyright>
          © 2021-{new Date().getFullYear()} The Christie NHS Foundation Trust
        </Copyright>
      </Flex>

      <CloudsSvg xmlns="http://www.w3.org/2000/svg" width="2611.084" height="520" viewBox="0 0 2611.084 520">
        <title>Grey Clouds Background</title>
        <path id="Path_39" data-name="Path 39"
          d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z"
          transform="translate(142.69 -634.312)" fill="#f8f8f8" />
      </CloudsSvg>
    </BrowserRouter>
  );
}

export default App;
