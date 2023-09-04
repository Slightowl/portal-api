import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestErrorComponent } from './form-request-error.component';

describe('FormRequestErrorComponent', () => {
  let component: FormRequestErrorComponent;
  let fixture: ComponentFixture<FormRequestErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequestErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
