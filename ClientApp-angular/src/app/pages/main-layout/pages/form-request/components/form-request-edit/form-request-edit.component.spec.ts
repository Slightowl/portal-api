import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestEditComponent } from './form-request-edit.component';

describe('FormRequestEditComponent', () => {
  let component: FormRequestEditComponent;
  let fixture: ComponentFixture<FormRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
