import React from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import authApi from "src/api/auth/auth-api";
import { AuthUser } from "src/api/auth/_types";
import { LOGOUT, USER_LOGGED_IN } from "src/store/slices/user-details-store";
import { GET_OR_CREATE_EHR_ID, useAppDispatch, useAppSelector } from "src/store/store";
import { Logger } from "src/utils/logger";
import { LoadingSpinner } from "../atoms/LoadingSpinner/LoadingSpinner";
import { storage } from "src/utils/storage";

interface IProps {
  loggedIn: JSX.Element;
  loggedOut: JSX.Element;
}

export const useLogin = (): (jwt: string, user: AuthUser) => void => {
  const dispatch = useAppDispatch();

  return (jwt: string, user: AuthUser) => {
    storage.set('jwt', jwt);
    dispatch(USER_LOGGED_IN({ jwt, user }));
    dispatch(GET_OR_CREATE_EHR_ID());
  };
}

export const useLogout = (): () => void => {
  const dispatch = useAppDispatch();

  return () => {
    storage.remove('jwt');
    dispatch(LOGOUT);
  };
}

export const AuthCheck: React.FC<IProps> = (props): JSX.Element => {
  const [checking, setChecking] = React.useState<boolean>(true);
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  const login = useLogin();
  const logout = useLogout();

  const currentUser = useAppSelector(state => state.userDetails.currentUser);

  React.useEffect(() => {

    const checkUser = async () => {
      const jwt = storage.get('jwt');

      if (!jwt) {
        logout();
        setLoggedIn(false);
      }
      else {
        const decoded = jwtDecode<JwtPayload>(jwt || '');
        const currentTime = new Date().getTime() / 1000;

        if (!decoded?.exp || currentTime > decoded.exp) {
          logout();
          setLoggedIn(false);
        }
        else if (currentUser !== null) {
          login(jwt, currentUser);
          setLoggedIn(true);
        }
        else {
          try {
            const authUser = await authApi.getAuthUser();
            login(jwt, authUser);
            setLoggedIn(true);
          }
          catch (error) {
            Logger.error('Error fetching authenticated user', error);
            logout();
            setLoggedIn(false);
          }
        }
      }
      setChecking(false);
    }

    checkUser();
  }, [currentUser, login, logout]);

  if (checking) {
    return <LoadingSpinner />;
  }

  return loggedIn ? props.loggedIn : props.loggedOut;
}
