import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhsNumberComponent } from './nhs-number.component';

describe('NhsNumberComponent', () => {
  let component: NhsNumberComponent;
  let fixture: ComponentFixture<NhsNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhsNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
