import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristieLogoComponent } from './christie-logo.component';

describe('ChristieLogoComponent', () => {
  let component: ChristieLogoComponent;
  let fixture: ComponentFixture<ChristieLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristieLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChristieLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
