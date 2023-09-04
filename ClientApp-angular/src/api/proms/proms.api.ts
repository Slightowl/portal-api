import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AuthService } from 'src/lib/services/auth/auth.service';

@Injectable()
export abstract class PromsApi {
  abstract getFormRequest(token: string): Observable<FormRequest>;
  abstract decline(token: string, formName: string, reason: string): Observable<any>;
  abstract postNewPromCompleted(token: string, compositionId: string): Observable<any>;
  abstract getFormRequests(): Observable<FormRequest[]>;
}

@Injectable()
export class PromsApiImpl implements PromsApi {
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

  getFormRequest(token: string): Observable<FormRequest> {
    const headers = this.getDefaultHeaders();
    return this.http.get<FormRequest>(`api/proms/${token}`, { headers });
  }

  decline(token: string, formName: string, reason: string): Observable<any> {
    const headers = this.getDefaultHeaders();
    const body = {
      token,
      formName,
      reason: reason || 'None Provided'
    }

    return this.http.post(`api/proms/decline`, body, { headers });
  }

  postNewPromCompleted(token: string, compositionId: string): Observable<any> {
    const headers = this.getDefaultHeaders();

    const body = {
      token,
      compositionId,
    }

    return this.http.post(`api/proms/completed`, body, { headers });
  }

  getFormRequests(): Observable<FormRequest[]> {
    const headers = this.getDefaultHeaders();
    return this.http.get<FormRequest[]>(`api/proms`, { headers });
  }
}
export interface FormRequest {
  id: string;
  christieNumber: string;
  formName: string;
  formVersion: string;
  status: FormStatus;
  token: string;
  sentAt: Date;
  submissionDueAt: Date;
  reminderSentAt?: Date | null;
  completedAt?: Date | null;
  declinedAt?: Date | null;
  compositionId?: string | null;
};

export type FormStatus = 'Pending' | 'Completed' | 'Declined' | 'Expired';

