import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Logger } from 'src/lib/services/logging/logger';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private logger: Logger
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const handler = next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            this.logger.error(`Client side HTTP Error: ${error.error.message}`);
          }
          else {
            if (error.status === 401) {
              this.router.navigateByUrl('/login');
            }
          }

          return throwError(() => new Error(errorMsg));
        })
      );

    return handler;
  }
}
