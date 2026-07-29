import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniProgressBar } from './mini-progress-bar';

describe('MiniProgressBar', () => {
  let component: MiniProgressBar;
  let fixture: ComponentFixture<MiniProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
