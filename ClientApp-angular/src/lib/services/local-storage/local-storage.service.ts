import { Injectable } from '@angular/core';

@Injectable()
export class BrowserLocalStorage implements LocalStorageService {

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

@Injectable({
  providedIn: 'root',
  useClass: BrowserLocalStorage
})
export abstract class LocalStorageService {
  abstract getItem(key: string): string | null;
  abstract setItem(key: string, value: string): void;
  abstract removeItem(key: string): void;
}
