import { createSelector } from "@ngrx/store";
import { FormStatus } from "src/api/proms/proms.api";
import { AppState } from "./reducers";

export const getFormRequests = createSelector(
  (state: AppState) => state.proms,
  x => x.formRequests
);

export const getFormRequestsInStatus = (status: FormStatus) =>
  createSelector(
    (state: AppState) => state.proms,
    x => x.formRequests.filter(x => x.status === status)
  );

export const getEhrId =
  createSelector(
    (state: AppState) => state.userDetails,
    x => x.ehrId
  );
