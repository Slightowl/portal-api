import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenRedirectComponent } from './token-redirect.component';

describe('TokenRedirectComponent', () => {
  let component: TokenRedirectComponent;
  let fixture: ComponentFixture<TokenRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenRedirectComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                token: 'ABC123',
              }),
              url: [
                { path: 'f' },
              ]
            }
          },
        },
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
