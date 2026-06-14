import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';

@Component({
  selector: 'app-purchase-pregnant-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    InputComponent,
    ButtonComponent,
    ValidationErrorsDirective,
  ],
  templateUrl: './purchase-pregnant-course.component.html',
  styleUrl: './purchase-pregnant-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasePregnantCourseComponent {
  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    mob: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onPay(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);

    }
  }
}
