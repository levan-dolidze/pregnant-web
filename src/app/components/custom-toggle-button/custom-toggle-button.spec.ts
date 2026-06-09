import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomToggleButton } from './custom-toggle-button';

describe('CustomToggleButton', () => {
  let component: CustomToggleButton;
  let fixture: ComponentFixture<CustomToggleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomToggleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomToggleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
