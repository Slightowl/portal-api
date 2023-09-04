import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { It, Mock } from 'moq.ts';
import { Logger } from 'src/lib/services/logging/logger';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  let logger: Mock<Logger>;

  beforeEach(async () => {
    logger = new Mock<Logger>();
    logger.setup(x => x.error(It.IsAny())).returns();

    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [
        { provide: Logger, useValue: logger.object() },
      ],
      imports: [
        RouterTestingModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
