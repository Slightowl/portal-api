import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { It, Mock } from 'moq.ts';
import { of } from 'rxjs';
import { FormTokenDetails } from 'src/api/proms/proms.api';
import { Logger } from 'src/lib/services/logging/logger';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let store: Mock<Store>;

  const pendingForms: FormTokenDetails[] = [
    {
      token: 'token',
      christieNumber: '12345678',
      formName: 'alex-dev-test-1',
      expired: false,
      hasBeenCompleted: false,
      compositionId: null,
    },
  ];

  beforeEach(async () => {
    store = new Mock<Store>();
    store.setup(x =>x.select(It.IsAny())).returns(of(pendingForms));

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Logger, useValue: () => { } },
        { provide: Store, useValue: store.object() },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
