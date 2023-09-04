import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { AuthUser } from 'src/api/auth/auth.api';
import { FormRequest } from 'src/api/proms/proms.api';
import * as Actions from './actions';

export type AppState = {
  userDetails: UserDetailsState;
  proms: PromsState;
}

type UserDetailsState = {
  currentUser: AuthUser | null;
  jwt: string | null;
  ehrId: string | null;
}

type PromsState = {
  formRequests: FormRequest[];
}

const userDetailsReducer = createReducer<UserDetailsState>(
  {
    currentUser: null,
    jwt: null,
    ehrId: null,
  },
  on(Actions.USER_LOGGED_IN, (state, { jwt, user }) =>
  ({
    ...state,
    currentUser: user,
    jwt: jwt,
  })),
  on(Actions.EHR_ID_UPDATED, (state, { ehrId }) =>
  ({
    ...state,
    ehrId: ehrId
  }))
)

const promsReducer = createReducer<PromsState>(
  {
    formRequests: [],
  },
  on(Actions.FORM_REQUESTS_UPDATED, (state, { details }) =>
  ({
    ...state,
    formRequests: [...details],
  }))
);

export const reducers: ActionReducerMap<AppState> = {
  userDetails: userDetailsReducer,
  proms: promsReducer,
};
