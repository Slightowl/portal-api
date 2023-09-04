import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs'
import jwtDecode, { JwtPayload } from "jwt-decode";;
import { AuthApi, AuthUser } from 'src/api/auth/auth.api';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/lib/store/reducers';
import { FETCH_FORM_REQUESTS, USER_LOGGED_IN } from 'src/lib/store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authApi: AuthApi,
    private localStorage: LocalStorageService,
    private store: Store<AppState>
  ) { }

  get currentUser(): AuthUser | null {
    return this.user;
  }

  get jwt(): string | null {
    return this.localStorage.getItem('jwt');
  }

  private user: AuthUser | null = null;

  userLoggedIn(jwt: string, user: AuthUser): void {
    this.user = user;
    this.localStorage.setItem('jwt', jwt);

    this.store.dispatch(USER_LOGGED_IN({ jwt, user }));
    this.store.dispatch(FETCH_FORM_REQUESTS());
  }

  isLoggedIn(): Observable<boolean> {
    const jwt = this.localStorage.getItem('jwt');
    if(!jwt) {
      this.logout();
      return of(false);
    }

    const decoded = jwtDecode<JwtPayload>(jwt || '');

    const currentTime = new Date().getTime() / 1000;
    if (!decoded?.exp || currentTime > decoded.exp) {
      this.logout();
      return of(false);
    }

    if(this.user !== null) {
      this.userLoggedIn(jwt, this.user);
      return of(true);
    }

    const check = this.authApi.getAuthUser(jwt).pipe(
      map(user => {
          this.userLoggedIn(jwt, user);
          return true;
      }),
      catchError((err, caught) => {
        this.logout();
        return of(false);
      })
    );

    return check;
  }

  logout(): void {
    this.localStorage.removeItem('jwt');
    this.user = null;
  }
}
