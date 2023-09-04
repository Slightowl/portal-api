import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthUser } from "src/api/auth/_types";

interface UserDetailsState {
  currentUser: AuthUser | null;
  jwt: string | null;
  ehrId: {
    status: 'pending' | 'available',
    value: string | null;
  };
}

const initialState: UserDetailsState = {
  currentUser: null,
  jwt: null,
  ehrId: {
    status: 'pending',
    value: null,
  },
};

const userDetailsSlice = createSlice({
  name: 'userDetails',

  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  reducers: {
    USER_LOGGED_IN: (state, action: PayloadAction<{ jwt: string, user: AuthUser }>) => {
      const { jwt, user } = action.payload;
      state.currentUser = user;
      state.jwt = jwt;
    },
    EHR_ID_UPDATED: (state, action: PayloadAction<{ ehrId: string }>) => {
      state.ehrId = {
        status: 'available',
        value: action.payload.ehrId,
      };
    },
    LOGOUT: (state) => {
      state = initialState;
    }
  },
});

// action creators
export const { USER_LOGGED_IN, EHR_ID_UPDATED, LOGOUT } = userDetailsSlice.actions;

// reducer
export default userDetailsSlice.reducer;
