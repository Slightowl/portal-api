import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  EHR_ID_UPDATED,
  NEW_PROM_COMPLETED,
  USER_LOGGED_IN,
  PUSH_API_LOG,
  FETCH_FORM_REQUESTS,
  FORM_REQUESTS_UPDATED,
} from './actions';
import { catchError, EMPTY, map, mergeMap, tap } from "rxjs";
import { PromsApi } from "src/api/proms/proms.api";
import { EhrApi } from "src/api/ehr/ehr.api";
import { LoggingApi } from "src/api/logging/logging.api";
import { Logger } from "../services/logging/logger";

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private promsApi: PromsApi,
    private ehrApi: EhrApi,
    private loggingApi: LoggingApi,
    private logger: Logger
  ) { }

  onFetchFormRequests$ = createEffect(() => this.actions$.pipe(
    ofType(FETCH_FORM_REQUESTS),
    mergeMap(() => 
      this.promsApi
          .getFormRequests()
          .pipe(
            map(details =>  {
              return ({ type: FORM_REQUESTS_UPDATED.type, details })
            }),
            catchError(() => {
              this.logger.error("EFFECT ERROR | onFetchFormRequests");
              return EMPTY;
            })
      ))
  ));

  onNewPromCompleted$ = createEffect(() => this.actions$.pipe(
    ofType(NEW_PROM_COMPLETED),
    mergeMap((props) => 
      this.promsApi
          .postNewPromCompleted(props.token, props.compositionId)
          .pipe(
            map(() => FETCH_FORM_REQUESTS()),
            catchError(() => {
              this.logger.error("EFFECT ERROR | onNewPromCompleted");
              return EMPTY;
            })
          )
    )
  ));

  onUserLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(USER_LOGGED_IN),
    mergeMap((props) => this.ehrApi.getOrCreateEhrId()
      .pipe(
        map(res => ({ type: EHR_ID_UPDATED.type, ehrId: res.ehrId })),
        catchError(() => {
          this.logger.error("EFFECT ERROR | onUserLoggedIn");
          return EMPTY;
        })
      )
    )
  ));

  onPushLogMessage$ = createEffect(() => this.actions$.pipe(
    ofType(PUSH_API_LOG),
    tap((log) => this.loggingApi.push(log)),
    catchError(() => EMPTY)
  ));
}
