import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePregnantCourseComponent } from './purchase-pregnant-course.component';

describe('PurchasePregnantCourseComponent', () => {
  let component: PurchasePregnantCourseComponent;
  let fixture: ComponentFixture<PurchasePregnantCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasePregnantCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePregnantCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
