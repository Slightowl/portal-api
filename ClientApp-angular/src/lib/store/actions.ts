import { createAction, props } from '@ngrx/store';
import { AuthUser } from 'src/api/auth/auth.api';
import { ApiLog } from 'src/api/logging/logging.api';
import { FormRequest } from 'src/api/proms/proms.api';

export const USER_LOGGED_IN = createAction('[AUTH] User Logged In', props<{ jwt: string, user: AuthUser }>());

export const FETCH_FORM_REQUESTS = createAction('[PROMS] Fetch Form Requests');
export const FORM_REQUESTS_UPDATED = createAction('[PROMS] Form Requests Updated', props<{ details: FormRequest[] }>());

export const NEW_PROM_COMPLETED = createAction('[PROMS] New Prom Completed', props<{ token: string, compositionId: string }>());

export const EHR_ID_UPDATED = createAction('[EHR] EHR ID Updated', props<{ ehrId: string }>());

export const PUSH_API_LOG = createAction('[SYSTEM] Push Log Message', props<ApiLog>());
