import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestDeclineComponent } from './form-request-decline.component';

describe('FormRequestDeclineComponent', () => {
  let component: FormRequestDeclineComponent;
  let fixture: ComponentFixture<FormRequestDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequestDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
