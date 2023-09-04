import { Injectable } from '@angular/core';

@Injectable()
export class BrowserSessionStorage implements SessionStorageService {

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}

@Injectable({ providedIn: 'root', useClass: BrowserSessionStorage })
export abstract class SessionStorageService {
  abstract getItem(key: string): string | null;
  abstract setItem(key: string, value: string): void;
  abstract removeItem(key: string): void;
}
