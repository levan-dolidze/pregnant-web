import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineMessage } from './inline-message';

describe('InlineMessage', () => {
  let component: InlineMessage;
  let fixture: ComponentFixture<InlineMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
