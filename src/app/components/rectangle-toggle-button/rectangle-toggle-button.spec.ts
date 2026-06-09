import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RectangleToggleButton } from './rectangle-toggle-button';

describe('RectangleToggleButton', () => {
  let component: RectangleToggleButton;
  let fixture: ComponentFixture<RectangleToggleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RectangleToggleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RectangleToggleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
