import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/lib/services/auth/auth.service';

@Injectable()
export abstract class EhrApi {
  abstract getOrCreateEhrId(): Observable<{ ehrId: string }>;
}

@Injectable()
export class EhrApiImpl implements EhrApi {
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

  getOrCreateEhrId(): Observable<{ ehrId: string }> {
    const headers = this.getDefaultHeaders();
    return this.http.get<{ ehrId: string }>(`api/ehr/get-or-create`, { headers });
  }
}
