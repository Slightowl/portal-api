import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredFormComponent } from './expired-form.component';

describe('ExpiredFormComponent', () => {
  let component: ExpiredFormComponent;
  let fixture: ComponentFixture<ExpiredFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
