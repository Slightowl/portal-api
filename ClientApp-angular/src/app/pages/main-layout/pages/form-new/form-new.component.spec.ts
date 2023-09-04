import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { It, Mock } from 'moq.ts';
import { of } from 'rxjs';
import { FormTokenDetails, PromsApi } from 'src/api/proms/proms.api';
import { AuthService } from 'src/lib/services/auth/auth.service';
import { Logger } from 'src/lib/services/logging/logger';

import { FormNewComponent } from './form-new.component';

describe('FormNewComponent', () => {
  let component: FormNewComponent;
  let fixture: ComponentFixture<FormNewComponent>;

  let authService: Mock<AuthService>;
  let promsApi: Mock<PromsApi>;
  let store: Mock<Store>;

  const token: FormTokenDetails = {
    token: 'token',
    christieNumber: '12345678',
    formName: 'form',
    expired: false,
    hasBeenCompleted: false,
    compositionId: null,
  }

  beforeEach(async () => {
    authService = new Mock<AuthService>();

    promsApi = new Mock<PromsApi>();
    promsApi.setup(x => x.getFormTokenDetails(It.IsAny())).returns(of(token));

    store = new Mock<Store>();
    store.setup(x => x.select(It.IsAny())).returns(of('123'));


    await TestBed.configureTestingModule({
      declarations: [FormNewComponent],
      providers: [
        { provide: Logger, useValue: () => { } },
        { provide: AuthService, useValue: authService.object() },
        { provide: PromsApi, useValue: promsApi.object() },
        { provide: Store, useValue: store.object() },
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
