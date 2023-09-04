import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestFeedbackComponent } from './form-request-feedback.component';

describe('FormRequestFeedbackComponent', () => {
  let component: FormRequestFeedbackComponent;
  let fixture: ComponentFixture<FormRequestFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequestFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
