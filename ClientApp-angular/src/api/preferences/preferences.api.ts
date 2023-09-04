import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/lib/services/auth/auth.service';

@Injectable()
export abstract class PreferencesApi {
  abstract getUserPreferences(): Observable<UserPreferences>;
  abstract updateUserPreferences(prefs: UserPreferences): Observable<any>;

  abstract getCommunicationPreferences(): Observable<CommunicationPreferences>;
  abstract updateCommunicationPreferences(prefs: CommunicationPreferences): Observable<any>;
}

@Injectable()
export class PreferencesApiImpl implements PreferencesApi {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getDefaultHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.jwt}`
    });
  }

  getUserPreferences(): Observable<UserPreferences> {
    const headers = this.getDefaultHeaders();
    return this.http.get<{ userId: string, preferences: UserPreferences }>('api/preferences/user', { headers })
      .pipe(map(x => x.preferences));
  }

  updateUserPreferences(prefs: UserPreferences): Observable<any> {
    const headers = this.getDefaultHeaders();
    return this.http.post('api/preferences/user', prefs, { headers });
  }

  getCommunicationPreferences(): Observable<CommunicationPreferences> {
    const headers = this.getDefaultHeaders();
    return this.http.get<CommunicationPreferences>('api/preferences/comms', { headers });
  }

  updateCommunicationPreferences(prefs: CommunicationPreferences): Observable<any> {
    const headers = this.getDefaultHeaders();
    return this.http.post('api/preferences/comms', prefs, { headers });
  }
}

export type UserPreferences = { [key: string]: string }

export type CommunicationPreferences = {
  contactViaSms: boolean;
  contactViaEmail: boolean;
  contactViaPost: boolean;
}
