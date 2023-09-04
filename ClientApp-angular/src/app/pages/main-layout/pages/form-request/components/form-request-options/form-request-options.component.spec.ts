import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormRequestOptionsComponent } from './form-request-options.component';

describe('FormRequestOptionsComponent', () => {
  let component: FormRequestOptionsComponent;
  let fixture: ComponentFixture<FormRequestOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRequestOptionsComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequestOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
