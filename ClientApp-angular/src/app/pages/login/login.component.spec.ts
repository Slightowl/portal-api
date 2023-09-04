import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Mock } from 'moq.ts';
import { AuthApi } from 'src/api/auth/auth.api';
import { AuthService } from 'src/lib/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  let authApi: Mock<AuthApi>;
  let authService: Mock<AuthService>;

  beforeEach(async () => {
    authApi = new Mock<AuthApi>();
    authService = new Mock<AuthService>();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthApi, useValue: authApi.object() },
        { provide: AuthService, useValue: authService.object() },
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
