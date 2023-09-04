import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, throwError } from "rxjs";
import { LocalStorageService } from "src/lib/services/local-storage/local-storage.service";
import { AuthApi, AuthUser, LoginChallenge, VerifiedLoginResponse } from "./auth.api";

@Injectable()
export class AuthApiFake implements AuthApi {
  constructor(private localStorage: LocalStorageService) { }

  login(surname: string, postcode: string, dateOfBirth: string): Observable<LoginChallenge> {

    if (surname === 'fail') {
      return throwError(() => 'Login failed');
    }

    if (surname === 'nhs') {
      return of<LoginChallenge>({
        requestId: '250882b2-3239-4f5a-99b3-3be827bae7d6',
        challengeType: "nhs"
      }).pipe(delay(1000));
    }

    if (surname === 'email') {
      return of<LoginChallenge>({
        requestId: '250882b2-3239-4f5a-99b3-3be827bae7d6',
        challengeType: "code",
        numbers: []
      }).pipe(delay(1000));
    }

    return of<LoginChallenge>({
      requestId: '250882b2-3239-4f5a-99b3-3be827bae7d6',
      challengeType: "code",
      numbers: [
        '07*** ***123',
        '07*** ***456',
        '07*** ***799',
        '07*** ***010',
      ]
    }).pipe(delay(1000));
  }

  sendVerificationCode(requestId: string, number: string): Observable<any> {
    return of({});
  }

  checkVerificationCode(requestId: string, code: string): Observable<VerifiedLoginResponse> {
    if (code === '000000') {
      return throwError(() => new HttpErrorResponse({
        status: 400,
        statusText: 'BadRequest',
      }));
    }

    return of<VerifiedLoginResponse>({
      jwt: tokens.valid,
      user: data['venkman'],
    });
  }

  checkNhsNumber(requestId: string, nhsNumber: string): Observable<VerifiedLoginResponse> {
    if (nhsNumber === '000') {
      return throwError(() => new HttpErrorResponse({
        status: 400,
        statusText: 'BadRequest',
      }));
    }

    return of<VerifiedLoginResponse>({
      jwt: tokens.valid,
      user: data['venkman'],
    });
  }

  getAuthUser(jwt: string): Observable<AuthUser> {
    const token = this.localStorage.getItem('jwt');
    if (token) {
      return of<AuthUser>(data['venkman']);
    }

    return throwError(() => new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
    }));
  }
}

const data: { [key: string]: AuthUser } = {
  'venkman': {
    forename: 'Peter',
    surname: 'Venkman',
    email: 'peter@ghostbusters.com',
    phone: '07770 111111',
    dateOfBirth: new Date('1971-03-04'),
    christieNumber: '12345678',
    postcode: 'AA11 1AA',
  },
  'stantz': {
    forename: 'Ray',
    surname: 'Stantz',
    email: 'ray@ghostbusters.com',
    phone: '07770 222222',
    dateOfBirth: new Date('1972-12-06'),
    christieNumber: '22222222',
    postcode: 'AA22 2AA',
  },
  'spengler': {
    forename: 'Egon',
    surname: 'Spengler',
    email: 'egon@ghostbusters.com',
    phone: '07770 333333',
    dateOfBirth: new Date('1973-12-06'),
    christieNumber: '33333333',
    postcode: 'AA33 3AA',
  },
};

const tokens = {
  valid: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTExMTExMSIsIm5hbWUiOiJQZXRlciBWZW5rbWFuIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3OTk2MjY1Njh9.rzwkgXgilQCVF9ZAAgwW9gC3jKocCtr3AGMHuCNzKSI",
  expired: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTExMTExMSIsIm5hbWUiOiJQZXRlciBWZW5rbWFuIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2NDA4NDE5NjB9.dr71bEswNkjPVzgx2BYlEcjx7qVdj-r3WrKRnNwQjpY",
}
