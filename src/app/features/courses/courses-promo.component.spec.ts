import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPromoComponent } from './courses-promo.component';

describe('CoursesPromoComponent', () => {
  let component: CoursesPromoComponent;
  let fixture: ComponentFixture<CoursesPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPromoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
