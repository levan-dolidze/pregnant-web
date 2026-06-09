import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { MockModule } from 'ng-mocks';
import { TranslocoModule } from '@jsverse/transloco';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ButtonComponent,
        MatProgressSpinnerModule,
        MockModule(TranslocoModule),
      ],
    })

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
