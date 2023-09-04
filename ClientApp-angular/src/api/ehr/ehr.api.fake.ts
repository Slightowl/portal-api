import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { EhrApi } from './ehr.api';

@Injectable()
export class EhrApiFake implements EhrApi {

  getOrCreateEhrId(): Observable<{ ehrId: string }> {
    return of({ ehrId: ehrIds['11111111'] }).pipe(delay(1000));
  }
}

const ehrIds: { [key: string]: string } = {
  11111111: 'ehr-11111111',
  22222222: 'ehr-22222222',
  33333333: 'ehr-33333333',
};
