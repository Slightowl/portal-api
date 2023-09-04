import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

@Injectable()
export abstract class AuthApi {
  abstract login(surname: string, postcode: string, dateOfBirth: string): Observable<LoginChallenge>;
  abstract sendVerificationCode(requestId: string, number: string): Observable<any>;
  abstract checkVerificationCode(requestId: string, code: string): Observable<VerifiedLoginResponse>;
  abstract checkNhsNumber(requestId: string, nhsNumber: string): Observable<VerifiedLoginResponse>;

  abstract getAuthUser(jwt: string): Observable<AuthUser>;
}

@Injectable()
export class AuthApiImpl implements AuthApi {
  constructor(private http: HttpClient) { }

  private getDefaultHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  login(surname: string, postcode: string, dateOfBirth: string): Observable<LoginChallenge> {

    const headers = this.getDefaultHeaders();

    const body = {
      surname,
      postcode,
      dateOfBirth
    };

    return this.http.post<LoginChallenge>('api/auth/login', body, { headers });
  }

  sendVerificationCode(requestId: string, number: string): Observable<any> {

    const headers = this.getDefaultHeaders();

    const body = {
      requestId,
      number,
    };

    return this.http.post<any>('api/auth/send-code', body, { headers });
  }

  checkVerificationCode(requestId: string, code: string): Observable<VerifiedLoginResponse> {

    const headers = this.getDefaultHeaders();

    const body = {
      requestId,
      code,
    };

    return this.http.post<any>('api/auth/verify-code', body, { headers });
  }

  checkNhsNumber(requestId: string, nhsNumber: string): Observable<VerifiedLoginResponse> {
    const headers = this.getDefaultHeaders();

    const body = {
      requestId,
      nhsNumber,
    };

    return this.http.post<any>('api/auth/verify-nhs', body, { headers });
  }

  getAuthUser(jwt: string): Observable<AuthUser> {
    const headers = this.getDefaultHeaders().append('Authorization', `Bearer ${jwt}`);
    return this.http.get<AuthUser>('api/auth/user-details', { headers })
  }
}

export interface LoginChallenge {
  requestId: string;
  challengeType: 'nhs' | 'code'
  numbers?: string[];
}

export interface VerifiedLoginResponse {
  jwt: string;
  user: AuthUser;
}

export interface AuthUser {
  forename: string,
  surname: string;
  postcode: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  christieNumber: string;
}
