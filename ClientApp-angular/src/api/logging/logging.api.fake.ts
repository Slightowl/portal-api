import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiLog, LoggingApi } from "./logging.api";

@Injectable()
export class LoggingApiFake implements LoggingApi {
  push(log: ApiLog): Observable<any> {
    return of({});
  }
}
