import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of, throwError } from "rxjs";
import { FormRequest, PromsApi } from "./proms.api";

@Injectable()
export class PromsApiFake implements PromsApi {
  getFormRequest(token: string): Observable<FormRequest> {
    if (token === 'error') {
      return throwError(() => new HttpErrorResponse({
        status: 400,
        statusText: "BadRequest"
      })).pipe(delay(1000));
    }

    if (token === 'expired') {
      return of<FormRequest>({
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Expired',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        christieNumber: '200804513',
        token: 'abc1213'
      }).pipe(delay(1000));
    }

    if (token === 'done') {
      return of<FormRequest>({
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Completed',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        completedAt: new Date("2022-05-26T17:00:00.000Z"),
        compositionId: '23',
        christieNumber: '200804513',
        token: 'abc1213'
      }).pipe(delay(1000));
    }

    return of<FormRequest>({
      id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
      status: 'Pending',
      formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
      formVersion: '1.0.2',
      sentAt: new Date("2022-05-23T17:00:00.000Z"),
      submissionDueAt: new Date("2022-05-29T17:00:00.000Z"),
      completedAt: null,
      compositionId: null,
      christieNumber: '200804513',
      token: 'abc1213'
    }).pipe(delay(1000));
  }

  decline(token: string, formName: string, reason: string): Observable<any> {
    return of({}).pipe(delay(1000));
  }

  getFormRequests(): Observable<FormRequest[]>{
    const formRequests: FormRequest[] = [
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Pending',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-23T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-29T17:00:00.000Z"),
        completedAt: null,
        compositionId: null,
        christieNumber: '200804513',
        token: 'abc1213'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Completed',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        completedAt: new Date("2022-05-26T17:00:00.000Z"),
        compositionId: '23',
        christieNumber: '200804513',
        token: 'abc1213'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Expired',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        christieNumber: '200804513',
        token: 'abc1213'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Declined',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-05-24T17:00:00.000Z"),
        submissionDueAt: new Date("2022-05-26T17:00:00.000Z"),
        declinedAt: new Date("2022-05-26T17:00:00.000Z"),
        christieNumber: '200804513',
        token: 'abc1213'
      },
      {
        id: 'baa66c68-edfa-4f9f-a58f-b82e1492ed9d',
        status: 'Pending',
        formName: '02333312-20f6-4114-8d22-1d62fb2c56fb',
        formVersion: '1.0.2',
        sentAt: new Date("2022-03-23T07:56:00.000Z"),
        submissionDueAt: new Date("2022-06-29T12:00:00.000Z"),
        completedAt: null,
        compositionId: null,
        christieNumber: '200804513',
        token: 'abc1213'
      }
    ];

    return of(formRequests).pipe(delay(1000));
  }

  postNewPromCompleted(token: string, compositionId: string): Observable<any> {
    return of({}).pipe(delay(1000));
  }
}
