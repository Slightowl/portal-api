import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ehrApi from 'src/api/ehr/ehr-api';
import userDetails, { EHR_ID_UPDATED } from './slices/user-details-store';

export const store = configureStore({
  reducer: {
    userDetails,
  },
});

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// typed hooks
// use these throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// thunks (effects)
export const GET_OR_CREATE_EHR_ID = () => async (dispatch: AppDispatch) => {
  const { ehrId } = await ehrApi.getOrCreateEhrId();
  dispatch(EHR_ID_UPDATED({ ehrId }))
}
