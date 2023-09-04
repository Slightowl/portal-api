import { TestBed } from '@angular/core/testing';
import { AuthApi, AuthUser } from 'src/api/auth/auth.api';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { It, Mock } from 'moq.ts';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  let service: AuthService;

  let authApi: Mock<AuthApi>;
  let localStorage: Mock<LocalStorageService>;
  let store: Mock<Store>;

  beforeEach(() => {
    authApi = new Mock<AuthApi>();
    localStorage = new Mock<LocalStorageService>();
    
    store = new Mock<Store>();
    store.setup(x => x.dispatch(It.IsAny())).returns();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthApi, useValue: authApi.object() },
        { provide: LocalStorageService, useValue: localStorage.object() },
        { provide: Store, useValue: store.object() },
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('currentUser should initially be set to null', () => {
    expect(service.currentUser).toBeNull();
  });

  it('jwt should return what is saved in local storage', () => {
    localStorage
      .setup(x => x.getItem('jwt'))
      .returns('the-token');

    expect(service.jwt).toBe('the-token');
    localStorage.verify(x => x.getItem('jwt'));
  });

  it('userLoggedIn sets current user and jwt in local storage', () => {
    localStorage.setup(x => x.setItem(It.IsAny(), It.IsAny())).returns();

    const user: AuthUser = {
      christieNumber: 'cn',
      dateOfBirth: new Date(),
      email: 'email',
      forename: 'forename',
      phone: 'phone',
      postcode: 'postcode',
      surname: 'surname'
    };

    service.userLoggedIn('token', user);

    expect(service.currentUser).toBe(user);
    localStorage.verify(x => x.setItem('jwt', 'token'));
  });

  it('logout clears current user and jwt', () => {
    localStorage.setup(x => x.setItem(It.IsAny(), It.IsAny())).returns();
    localStorage.setup(x => x.removeItem(It.IsAny())).returns();

    const user: AuthUser = {
      christieNumber: 'cn',
      dateOfBirth: new Date(),
      email: 'email',
      forename: 'forename',
      phone: 'phone',
      postcode: 'postcode',
      surname: 'surname'
    };

    service.userLoggedIn('token', user);
    expect(service.currentUser).toBe(user);

    service.logout();
    expect(service.currentUser).toBeNull();

    localStorage.verify(x => x.removeItem('jwt'));
  });

  it('isLoggedIn',  () => {
    // @todo: implement test
  })
});
