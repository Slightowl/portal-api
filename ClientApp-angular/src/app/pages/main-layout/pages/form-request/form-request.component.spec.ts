import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { It, Mock } from 'moq.ts';
import { of } from 'rxjs';
import { FormTokenDetails, PromsApi } from 'src/api/proms/proms.api';
import { AuthService } from 'src/lib/services/auth/auth.service';

import { FormRequestComponent } from './form-request.component';

describe('FormRequestComponent', () => {
  let component: FormRequestComponent;
  let fixture: ComponentFixture<FormRequestComponent>;

  let authService: Mock<AuthService>;
  let promsApi: Mock<PromsApi>;

  const testDetails: FormTokenDetails = {
    expired: false,
    christieNumber: '12345678',
    formName: 'name',
    hasBeenCompleted: false,
    token: 'token',
    compositionId: null,
  }

  beforeEach(async () => {
    authService = new Mock<AuthService>();
    promsApi = new Mock<PromsApi>();
    promsApi.setup(x => x.getFormTokenDetails(It.IsAny())).returns(of(testDetails));

    await TestBed.configureTestingModule({
      declarations: [FormRequestComponent],
      providers: [
        { provide: AuthService, useValue: authService.object() },
        { provide: PromsApi, useValue: promsApi.object() },
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
