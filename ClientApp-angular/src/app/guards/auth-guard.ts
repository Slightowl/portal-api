import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Store } from '@ngrx/store';

import { map, Observable } from 'rxjs';
import { AuthService } from 'src/lib/services/auth/auth.service';
import { AppState } from 'src/lib/store/reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        if(loggedIn) {
          return true;
        }

        if (state.url === '/') {
          // this is the default public home page, no auth required
          this.router.navigateByUrl('/public');
          return false;
        }

        return this.router.createUrlTree(
          ['/login'],
          { queryParams: { returnUrl: state.url } }
        );
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
