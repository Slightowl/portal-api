import React from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { AuthUser } from "src/api/auth/_types";
import { AuthCheck, useLogin } from "src/components/utils/AuthCheck";
import { LoginContainer } from "./PromsLogin/LoginContainer";

/**
 * for the link shortening described in the app-routing.module
 */
const PATH_MAP: { [key: string]: string } = {
  f: '/forms/request',
}

const url = (path: string): string =>
  path === ''
    ? '/'
    : path.substring(0, 1) === '/'
      ? path
      : `/${path}`;

export const LoginRoute: React.FC = (): JSX.Element => {
  const nav = useNavigate();
  const login = useLogin();

  const [params] = useSearchParams();

  const returnUrl = params.get('returnUrl') || '/';
  const token = params.get('token') || '';
  const path = params.get('path') || '';

  const handleLoginSuccess = (jwt: string, user: AuthUser) => {
    login(jwt, user);

    if (token === '') {
      nav(url(returnUrl));
    }
    else {
      nav(url(`${PATH_MAP[path]}/${token}`));
    }
  };

  return (
    <AuthCheck
      loggedIn={<Navigate to={url(returnUrl)} />}
      loggedOut={<LoginContainer onLoginSuccess={handleLoginSuccess} />}
    />
  );
}
