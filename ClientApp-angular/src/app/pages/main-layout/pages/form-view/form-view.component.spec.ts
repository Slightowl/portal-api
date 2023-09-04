import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { It, Mock } from 'moq.ts';
import { of } from 'rxjs';
import { AuthService } from 'src/lib/services/auth/auth.service';
import { Logger } from 'src/lib/services/logging/logger';

import { FormViewComponent } from './form-view.component';

describe('FormViewComponent', () => {
  let component: FormViewComponent;
  let fixture: ComponentFixture<FormViewComponent>;

  let authService: Mock<AuthService>;
  let store: Mock<Store>;

  beforeEach(async () => {
    authService = new Mock<AuthService>();

    store = new Mock<Store>();
    store.setup(x => x.select(It.IsAny())).returns(of('123'));

    await TestBed.configureTestingModule({
      declarations: [FormViewComponent],
      providers: [
        { provide: Logger, useValue: () => { } },
        { provide: AuthService, useValue: authService.object() },
        { provide: Store, useValue: store.object() },
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
