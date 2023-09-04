import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProblemsComponent } from './login-problems.component';

describe('LoginProblemsComponent', () => {
  let component: LoginProblemsComponent;
  let fixture: ComponentFixture<LoginProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
