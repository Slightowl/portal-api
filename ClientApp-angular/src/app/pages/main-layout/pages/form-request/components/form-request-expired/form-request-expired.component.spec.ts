import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestExpiredComponent } from './form-request-expired.component';

describe('FormRequestExpiredComponent', () => {
  let component: FormRequestExpiredComponent;
  let fixture: ComponentFixture<FormRequestExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequestExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
