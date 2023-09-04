import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppRoutes } from "src/AppRoutes";
import { AuthCheck } from "./AuthCheck";

interface IProps extends React.PropsWithChildren { }

export const RequireAuth: React.FC<IProps> = (props): JSX.Element => {
  const location = useLocation();

  return (
    <AuthCheck
      loggedIn={<>{props.children ? props.children : <Outlet />}</>}
      loggedOut={
        location.pathname === '/'
          ? <Navigate to={AppRoutes.publicHome} />
          : <Navigate to={`/login?returnUrl=${location.pathname}`} />
      }
    />
  );
}
