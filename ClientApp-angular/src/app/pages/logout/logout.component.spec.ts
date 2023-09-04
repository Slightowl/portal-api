import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mock } from 'moq.ts';
import { AuthService } from 'src/lib/services/auth/auth.service';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  let authService: Mock<AuthService>;

  beforeEach(async () => {
    authService = new Mock<AuthService>();
    authService.setup(x => x.logout()).returns();

    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      providers: [
        { provide: AuthService, useValue: authService.object() },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
