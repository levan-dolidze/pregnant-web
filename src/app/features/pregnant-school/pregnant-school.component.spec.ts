import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnantSchoolComponent } from './pregnant-school.component';

describe('PregnantSchoolComponent', () => {
  let component: PregnantSchoolComponent;
  let fixture: ComponentFixture<PregnantSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregnantSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregnantSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
