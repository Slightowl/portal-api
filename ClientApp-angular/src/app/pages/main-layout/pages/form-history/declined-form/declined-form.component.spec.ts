import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedFormComponent } from './declined-form.component';

describe('DeclinedFormComponent', () => {
  let component: DeclinedFormComponent;
  let fixture: ComponentFixture<DeclinedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
