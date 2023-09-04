import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Mock } from 'moq.ts';
import { PromsApi } from 'src/api/proms/proms.api';
import { AuthService } from 'src/lib/services/auth/auth.service';

import { FormHistoryComponent } from './form-history.component';

describe('FormHistoryComponent', () => {
  let component: FormHistoryComponent;
  let fixture: ComponentFixture<FormHistoryComponent>;

  let authService: Mock<AuthService>;
  let promsApi: Mock<PromsApi>;
  let store: Mock<Store>;

  beforeEach(async () => {
    authService = new Mock<AuthService>();
    promsApi = new Mock<PromsApi>();
    store = new Mock<Store>();

    await TestBed.configureTestingModule({
      declarations: [FormHistoryComponent],
      providers: [
        { provide: AuthService, useValue: authService.object() },
        { provide: PromsApi, useValue: promsApi.object() },
        { provide: Store, useValue: store.object() },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
