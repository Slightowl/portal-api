import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mock } from 'moq.ts';
import { PreferencesApi } from 'src/api/preferences/preferences.api';
import { AuthService } from 'src/lib/services/auth/auth.service';

import { MyDetailsComponent } from './my-details.component';

describe('MyDetailsComponent', () => {
  let component: MyDetailsComponent;
  let fixture: ComponentFixture<MyDetailsComponent>;

  let authService: Mock<AuthService>;
  let prefsApi: Mock<PreferencesApi>;

  beforeEach(async () => {
    authService = new Mock<AuthService>();
    prefsApi = new Mock<PreferencesApi>();

    await TestBed.configureTestingModule({
      declarations: [MyDetailsComponent],
      providers: [
        { provide: AuthService, useValue: authService.object() },
        { provide: PreferencesApi, useValue: prefsApi.object() },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
