import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AuthService } from 'src/lib/services/auth/auth.service';

export type ApiLog = { level: string, message: string };

@Injectable()
export abstract class LoggingApi {
  abstract push(log: ApiLog): Observable<any>;
}

@Injectable()
export class LoggingApiImpl implements LoggingApi {
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

  push(log: ApiLog): Observable<any> {
    const headers = this.getDefaultHeaders();
    return this.http.post(`api/client-logs`, [log], { headers });
  }
}
