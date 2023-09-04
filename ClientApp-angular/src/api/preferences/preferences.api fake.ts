import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  CommunicationPreferences,
  UserPreferences,
  PreferencesApi
} from './preferences.api';

@Injectable()
export class PreferencesApiFake implements PreferencesApi {

  getUserPreferences(): Observable<UserPreferences> {
    return of(<UserPreferences>{
      'some-key': 'some-value',
    }).pipe(delay(1000));
  }

  updateUserPreferences(prefs: UserPreferences): Observable<any> {
    return of({}).pipe(delay(1000));
  }

  getCommunicationPreferences(): Observable<CommunicationPreferences> {
    return of(<CommunicationPreferences>{
      contactViaEmail: true,
      contactViaSms: false,
      contactViaPost: true,
    }).pipe(delay(1000));
  }

  updateCommunicationPreferences(prefs: CommunicationPreferences): Observable<any> {
    return of({}).pipe(delay(1000));
  }
}
