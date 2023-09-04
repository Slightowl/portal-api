import { Provider } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthApi, AuthApiImpl } from 'src/api/auth/auth.api';
import { AuthApiFake } from 'src/api/auth/auth.api.fake';

import { EhrApi, EhrApiImpl } from 'src/api/ehr/ehr.api';
import { EhrApiFake } from 'src/api/ehr/ehr.api.fake';

import { PreferencesApi, PreferencesApiImpl } from 'src/api/preferences/preferences.api';
import { PreferencesApiFake } from 'src/api/preferences/preferences.api fake';

import { PromsApi, PromsApiImpl } from 'src/api/proms/proms.api';
import { PromsApiFake } from 'src/api/proms/proms.api.fake';

import { LoggingApi, LoggingApiImpl } from 'src/api/logging/logging.api';
import { LoggingApiFake } from 'src/api/logging/logging.api.fake';

const prodProviders: Provider[] = [
  { provide: AuthApi, useClass: AuthApiImpl },
  { provide: EhrApi, useClass: EhrApiImpl },
  { provide: PreferencesApi, useClass: PreferencesApiImpl },
  { provide: PromsApi, useClass: PromsApiImpl },
  { provide: LoggingApi, useClass: LoggingApiImpl },
];

const fakeProviders: Provider[] = [
  { provide: AuthApi, useClass: AuthApiFake },
  { provide: EhrApi, useClass: EhrApiFake },
  { provide: PreferencesApi, useClass: PreferencesApiFake },
  { provide: PromsApi, useClass: PromsApiFake },
  { provide: LoggingApi, useClass: LoggingApiFake },
];

export const apiProviders = (): Provider[] =>
  environment.useFakeData && !environment.production
    ? fakeProviders
    : prodProviders;
